"use client";
import { useState, useEffect } from 'react';
import RoomForm from '@/components/admin/RoomForm';

export default function BookingPage() {
    const [rooms, setRooms] = useState<any[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<any>(null);

    const fetchRooms = async () => {
        const res = await fetch('/api/admin/rooms');
        if (res.ok) {
            setRooms(await res.json());
        }
    };

    useEffect(() => { fetchRooms(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this room?')) return;
        await fetch(`/api/admin/rooms/${id}`, { method: 'DELETE' });
        fetchRooms();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-serif text-[#1B1B1B]">Manage Rooms</h1>
                <button
                    onClick={() => { setEditingRoom(null); setIsFormOpen(true); }}
                    className="bg-[#C8A45D] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#B08D45] transition-colors"
                >
                    + Add New Room
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-bold text-gray-600">Name</th>
                            <th className="p-4 font-bold text-gray-600">Price</th>
                            <th className="p-4 font-bold text-gray-600">Guests</th>
                            <th className="p-4 font-bold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rooms.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium">{room.name}</td>
                                <td className="p-4">₹{room.price}</td>
                                <td className="p-4">{room.max_guests}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button
                                        onClick={() => { setEditingRoom(room); setIsFormOpen(true); }}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(room.id)}
                                        className="text-red-600 hover:underline text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {rooms.length === 0 && <p className="p-8 text-center text-gray-500">No rooms found. Create one to get started.</p>}
            </div>

            {isFormOpen && (
                <RoomForm
                    initialData={editingRoom}
                    onSuccess={() => { setIsFormOpen(false); fetchRooms(); }}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
}
