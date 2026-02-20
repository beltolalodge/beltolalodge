"use client";
import React, { useState } from 'react';

export default function BookingBar() {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const handleSearch = () => {
        const params = new URLSearchParams({
            checkIn,
            checkOut,
            guests: guests.toString(),
        });
        window.location.href = `/rooms?${params.toString()}`;
    };

    return (
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col gap-6 relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A45D]/20 rounded-full blur-3xl -z-10 group-hover:bg-[#C8A45D]/30 transition-all"></div>

            <h3 className="text-2xl font-serif font-bold text-white mb-2">Book Your Stay</h3>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-white/80 font-medium">Check In</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/50 transition-all hover:bg-black/30"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-white/80 font-medium">Check Out</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/50 transition-all hover:bg-black/30"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-white/80 font-medium">Guests</label>
                    <div className="relative">
                        <select
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#C8A45D]/50 cursor-pointer hover:bg-black/30 transition-all"
                        >
                            {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n} className="text-black">{n} Guests</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
                            ▼
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleSearch}
                className="w-full bg-[#C8A45D] hover:bg-[#B08D45] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#C8A45D]/20 transform transition-all hover:-translate-y-0.5 mt-4"
            >
                Check Availability
            </button>
        </div>
    );
}
