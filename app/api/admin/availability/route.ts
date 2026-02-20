import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { z } from 'zod';

const blockSchema = z.object({
    room_id: z.string().uuid(),
    date: z.string().refine((d) => !isNaN(Date.parse(d))), // YYYY-MM-DD
    reason: z.string().optional(),
});

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const result = blockSchema.safeParse(body);
        if (!result.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

        const blocked = await db.blockedDate.create({
            data: {
                room_id: result.data.room_id,
                date: new Date(result.data.date),
                reason: result.data.reason,
            },
        });

        await db.auditLog.create({
            data: {
                admin_id: session.id,
                action: 'BLOCK_DATE',
                entity_type: 'AVAILABILITY',
                entity_id: blocked.id,
                details: result.data,
            },
        });

        return NextResponse.json(blocked);
    } catch (error) {
        return NextResponse.json({ error: 'Date likely already blocked' }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get('roomId');

    const where = roomId ? { room_id: roomId } : {};

    const blocked = await db.blockedDate.findMany({
        where,
        include: { room: { select: { name: true } } },
        orderBy: { date: 'asc' },
    });

    return NextResponse.json(blocked);
}
