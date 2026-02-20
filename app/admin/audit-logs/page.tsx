"use client";
import { useEffect, useState } from 'react';

interface AuditLog {
    id: string;
    action: string;
    entity_type: string;
    details?: Record<string, unknown>;
    timestamp: string;
    admin: { email: string };
}

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<AuditLog[]>([]);

    useEffect(() => {
        fetch('/api/admin/audit-logs')
            .then(res => res.json())
            .then(data => setLogs(data));
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-serif text-[#1B1B1B]">Audit Logs</h1>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left font-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 text-gray-600">Time</th>
                            <th className="p-4 text-gray-600">Admin</th>
                            <th className="p-4 text-gray-600">Action</th>
                            <th className="p-4 text-gray-600">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50">
                                <td className="p-4 text-gray-500 text-sm">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td className="p-4 text-sm font-medium">{log.admin.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${log.action.includes('DELETE') || log.action.includes('BLOCK') ? 'bg-red-100 text-red-600' :
                                        log.action.includes('CREATE') ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {log.action}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500 font-mono truncate max-w-xs">
                                    {log.details ? JSON.stringify(log.details) : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {logs.length === 0 && <p className="p-8 text-center text-gray-500">No logs found.</p>}
            </div>
        </div>
    );
}
