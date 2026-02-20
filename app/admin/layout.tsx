"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (isLoginPage) {
            setAuthorized(true);
            return;
        }

        // Check auth status
        fetch('/api/auth/me')
            .then((res) => {
                if (res.ok) setAuthorized(true);
                else router.push('/admin/login');
            })
            .catch(() => router.push('/admin/login'));
    }, [isLoginPage, router]);

    if (!authorized) return null; // Or a loading spinner

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8">
                {children}
            </div>
        </div>
    );
}
