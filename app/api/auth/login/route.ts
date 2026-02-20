import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, signToken, setSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        const admin = await db.adminUser.findUnique({ where: { email } });

        if (!admin) {
            // Dummy verify to prevent timing attacks
            await verifyPassword('dummy', '$2a$12$dummyhashdummyhashdummyhashdummyhashdummyhashdummyhash');
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        if (admin.lock_until && admin.lock_until > new Date()) {
            return NextResponse.json({ error: 'Account locked. Try again later.' }, { status: 403 });
        }

        const isValid = await verifyPassword(password, admin.password_hash);

        if (!isValid) {
            await db.adminUser.update({
                where: { id: admin.id },
                data: { failed_attempts: { increment: 1 } },
            });

            // Lock account after 5 failed attempts
            if (admin.failed_attempts >= 4) {
                await db.adminUser.update({
                    where: { id: admin.id },
                    data: { lock_until: new Date(Date.now() + 15 * 60 * 1000), failed_attempts: 0 } // 15 mins
                });
            }

            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Success - Reset failures
        await db.adminUser.update({
            where: { id: admin.id },
            data: { failed_attempts: 0, lock_until: null },
        });

        const token = signToken({ id: admin.id, email: admin.email, role: admin.role });
        await setSession(token);

        // Audit Log
        await db.auditLog.create({
            data: {
                admin_id: admin.id,
                action: 'LOGIN',
                entity_type: 'AUTH',
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
