import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const rooms = await db.room.findMany({
            where: { is_active: true },
            include: {
                images: {
                    orderBy: { display_order: 'asc' },
                },
            },
            orderBy: { price: 'asc' },
        });

        return NextResponse.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return NextResponse.json(
            { error: 'Failed to fetch rooms' },
            { status: 500 }
        );
    }
}
