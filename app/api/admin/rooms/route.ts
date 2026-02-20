import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { z } from 'zod';

const roomSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    price: z.coerce.number().positive(),
    max_guests: z.coerce.number().int().positive(),
    amenities: z.array(z.string()),
    min_stay: z.coerce.number().int().min(1),
    same_day_cutoff: z.coerce.number().int().min(0).max(23).optional().nullable(),
    is_active: z.boolean().optional(),
    images: z.array(z.string().url()).optional(), // Array of image URLs
});

export async function GET() {
    const session = await getSession();
    if (!session || !['super_admin', 'staff'].includes(session.role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const rooms = await db.room.findMany({
            orderBy: { created_at: 'desc' },
            include: { images: { orderBy: { display_order: 'asc' } } },
        });
        return NextResponse.json(rooms);
    } catch {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session || !['super_admin', 'staff'].includes(session.role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const result = roomSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error }, { status: 400 });
        }

        const { images, ...roomData } = result.data;

        const room = await db.room.create({
            data: {
                ...roomData,
                images: images ? {
                    create: images.map((url, index) => ({
                        image_url: url,
                        display_order: index,
                    })),
                } : undefined,
            },
            include: { images: true },
        });

        await db.auditLog.create({
            data: {
                admin_id: session.id,
                action: 'CREATE',
                entity_type: 'ROOM',
                entity_id: room.id,
                details: { name: room.name },
            },
        });

        return NextResponse.json(room);
    } catch (error) {
        console.error('Create room error:', error);
        return NextResponse.json({
            error: 'Internal Error',
            details: error instanceof Error ? error.message : 'Unknown database error',
            name: error instanceof Error ? error.name : 'Unknown'
        }, { status: 500 });
    }
}
