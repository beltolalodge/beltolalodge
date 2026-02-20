import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { z } from 'zod';

const updateSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    price: z.coerce.number().positive().optional(),
    max_guests: z.coerce.number().int().positive().optional(),
    amenities: z.array(z.string()).optional(),
    min_stay: z.coerce.number().int().min(1).optional(),
    same_day_cutoff: z.coerce.number().int().min(0).max(23).optional().nullable(),
    is_active: z.boolean().optional(),
    images: z.array(z.string().url()).optional(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getSession();
    if (!session || !['super_admin', 'staff'].includes(session.role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const result = updateSchema.safeParse(body);

        if (!result.success) {
            console.error('Validation Error:', result.error.errors);
            return NextResponse.json({ error: 'Invalid input', details: result.error.errors }, { status: 400 });
        }

        const { images, ...roomData } = result.data;

        // Transaction to update room and replace images if provided
        const room = await db.$transaction(async (tx) => {
            const updated = await tx.room.update({
                where: { id: params.id },
                data: roomData,
            });

            if (images) {
                // Delete existing images (simplest strategy for now)
                await tx.roomImage.deleteMany({ where: { room_id: params.id } });

                // Create new ones
                if (images.length > 0) {
                    await tx.roomImage.createMany({
                        data: images.map((url, index) => ({
                            room_id: params.id,
                            image_url: url,
                            display_order: index,
                        })),
                    });
                }
            }

            return updated;
        });

        await db.auditLog.create({
            data: {
                admin_id: session.id,
                action: 'UPDATE',
                entity_type: 'ROOM',
                entity_id: room.id,
                details: body,
            },
        });

        return NextResponse.json(room);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getSession();
    if (!session || !['super_admin', 'staff'].includes(session.role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const bookings = await db.booking.count({ where: { room_id: params.id } });
        if (bookings > 0) {
            await db.room.update({
                where: { id: params.id },
                data: { is_active: false },
            });
            return NextResponse.json({ message: 'Room deactivated (has bookings)' });
        } else {
            await db.room.delete({ where: { id: params.id } });
            return NextResponse.json({ message: 'Room deleted permanently' });
        }

    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
