import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const SECRET = process.env.JWT_SECRET || 'secret';

export interface AdminSession extends JwtPayload {
    id: string;
    email: string;
    role: 'super_admin' | 'staff';
}

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}

export function signToken(payload: Partial<AdminSession>) {
    return jwt.sign(payload, SECRET, { expiresIn: '8h' });
}

export function verifyToken(token: string): AdminSession | null {
    try {
        const decoded = jwt.verify(token, SECRET);
        if (typeof decoded === 'string') return null;
        return decoded as AdminSession;
    } catch (e) {
        return null;
    }
}

export async function getSession(): Promise<AdminSession | null> {
    const token = cookies().get('admin_token')?.value;
    if (!token) return null;
    return verifyToken(token);
}

export async function setSession(token: string) {
    cookies().set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
    });
}

export async function clearSession() {
    cookies().delete('admin_token');
}
