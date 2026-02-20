export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-serif text-[#1B1B1B]">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">Quick Actions</h3>
                    <div className="space-y-2">
                        <a href="/admin/rooms" className="block text-blue-600 hover:underline">Manage Rooms →</a>
                        <a href="/admin/calendar" className="block text-blue-600 hover:underline">View Calendar →</a>
                    </div>
                </div>

                {/* Placeholder stats - could fetch real counts later */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">System Status</h3>
                    <div className="flex items-center gap-2 text-green-600 font-bold">
                        <span className="w-2 h-2 rounded-full bg-green-600"></span>
                        Operational
                    </div>
                </div>
            </div>
        </div>
    );
}
