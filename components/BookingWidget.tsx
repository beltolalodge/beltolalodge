"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface BookingWidgetProps {
    room: any; // Using any for simplicity in component props
}

export default function BookingWidget({ room }: BookingWidgetProps) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        if (!checkIn || !checkOut || !name || !phone) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/whatsapp-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId: room.id,
                    checkIn,
                    checkOut,
                    guests,
                    name,
                    phone,
                }),
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // Redirect to WhatsApp
            window.open(data.url, '_blank');
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-6 pb-6 border-b border-gray-100">
                <p className="text-gray-500 text-sm uppercase tracking-wide">Starting from</p>
                <p className="text-4xl font-serif font-bold text-[#1B1B1B]">
                    ₹{room.price.toString()} <span className="text-lg text-gray-400 font-normal">/ night</span>
                </p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1">Check In</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:ring-[#C8A45D] focus:border-[#C8A45D]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-gray-500 mb-1">Check Out</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:ring-[#C8A45D] focus:border-[#C8A45D]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Guests</label>
                    <select
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm"
                    >
                        {Array.from({ length: room.max_guests }, (_, i) => i + 1).map(n => (
                            <option key={n} value={n}>{n} Guests</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm"
                        placeholder="+91 76359 45117"
                    />
                </div>

                <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-4"
                >
                    {loading ? 'Generating Link...' : 'Book via WhatsApp'}
                </button>

                <p className="text-xs text-center text-gray-400 mt-2">
                    You will be redirected to WhatsApp to complete your booking securely.
                </p>
            </div>
        </div>
    );
}
