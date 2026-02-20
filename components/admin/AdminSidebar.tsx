"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    const menu = [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Rooms', path: '/admin/rooms' },
        { name: 'Calendar', path: '/admin/calendar' },
        { name: 'Audit Logs', path: '/admin/audit-logs' },
    ];

    return (
        <div className="w-64 bg-[#1B1B1B] min-h-screen text-white flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-serif font-bold tracking-wider text-[#C8A45D]">BELTOLA ADMIN</h2>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menu.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`block px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#C8A45D] text-white font-medium shadow-lg'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-red-900/10 rounded-lg transition-colors flex items-center gap-2"
                >
                    <span>←</span> Sign Out
                </button>
            </div>
        </div>
    );
}
