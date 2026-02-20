"use client";
import React, { useState, useEffect } from 'react';

interface BlockedDate {
    id: string;
    date: string; // ISO string
    room_id: string;
    reason?: string;
}

interface Room {
    id: string;
    name: string;
}

export default function AvailabilityCalendar() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        fetch('/api/admin/rooms')
            .then(res => res.json())
            .then(data => {
                setRooms(data);
                if (data.length > 0) setSelectedRoom(data[0].id);
            });
    }, []);

    useEffect(() => {
        if (!selectedRoom) return;
        fetch(`/api/admin/availability?roomId=${selectedRoom}`)
            .then(res => res.json())
            .then(data => setBlockedDates(data));
    }, [selectedRoom, currentDate]); // Refresh when month changes? No, just keep simple.

    const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const handleDateClick = async (day: number) => {
        const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
        const existingBlock = blockedDates.find(b => b.date.startsWith(dateStr));

        if (existingBlock) {
            if (!confirm(`Unblock ${dateStr}?`)) return;
            await fetch(`/api/admin/availability/${existingBlock.id}`, { method: 'DELETE' });
        } else {
            const reason = prompt(`Block ${dateStr}? Enter reason (optional):`);
            if (reason === null) return;
            await fetch('/api/admin/availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ room_id: selectedRoom, date: dateStr, reason }),
            });
        }

        // Refresh
        const res = await fetch(`/api/admin/availability?roomId=${selectedRoom}`);
        const data = await res.json();
        setBlockedDates(data);
    };

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);

        // Empty slots
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-4 bg-gray-50 border border-gray-100"></div>);
        }

        // Days
        for (let d = 1; d <= totalDays; d++) {
            const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), d).toISOString().split('T')[0];
            const isBlocked = blockedDates.some(b => b.date.startsWith(dateStr));
            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            days.push(
                <div
                    key={d}
                    onClick={() => handleDateClick(d)}
                    className={`
             p-4 border border-gray-100 cursor-pointer transition-colors relative h-24
             ${isBlocked ? 'bg-red-50 hover:bg-red-100' : 'bg-white hover:bg-gray-50'}
             ${isToday ? 'ring-2 ring-[#C8A45D] ring-inset' : ''}
           `}
                >
                    <span className={`font-bold ${isBlocked ? 'text-red-500' : 'text-gray-700'}`}>{d}</span>
                    {isBlocked && <span className="block text-xs text-red-400 mt-2">Blocked</span>}
                </div>
            );
        }

        return days;
    };

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-gray-50 font-medium"
                >
                    {rooms.map(room => <option key={room.id} value={room.id}>{room.name}</option>)}
                </select>

                <div className="flex items-center gap-4">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded">&lt;</button>
                    <h2 className="text-xl font-bold font-serif w-48 text-center">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded">&gt;</button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="bg-gray-50 p-3 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
                {renderCalendar()}
            </div>
        </div>
    );
}
