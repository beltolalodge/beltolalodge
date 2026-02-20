import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        await db.blockedDate.delete({
            where: { id: params.id },
        });

        await db.auditLog.create({
            data: {
                admin_id: session.id,
                action: 'UNBLOCK_DATE',
                entity_type: 'AVAILABILITY',
                entity_id: params.id,
            },
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
