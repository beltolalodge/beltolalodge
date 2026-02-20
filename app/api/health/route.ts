import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        // Check DB connection
        await db.$queryRaw`SELECT 1`;
        return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
    } catch (error) {
        return NextResponse.json(
            { status: 'error', message: 'Database unreachable' },
            { status: 503 }
        );
    }
}
