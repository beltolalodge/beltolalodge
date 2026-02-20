import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const logs = await db.auditLog.findMany({
        take: 50,
        orderBy: { timestamp: 'desc' },
        include: {
            admin: { select: { email: true } },
        },
    });

    return NextResponse.json(logs);
}
