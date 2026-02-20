import React from 'react';
import { db } from '@/lib/db';
import RoomCard from '@/components/RoomCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function RoomsPage() {
    const rooms = await db.room.findMany({
        where: { is_active: true },
        include: { images: { orderBy: { display_order: 'asc' } } },
        orderBy: { price: 'asc' },
    });

    return (
        <div className="min-h-screen relative bg-[#F5F1EA]">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[url('/images/bg-pattern.jpeg')] bg-repeat bg-fixed" />

            <Navbar />
            <div className="relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl font-serif font-bold text-[#1B1B1B]">Our Rooms & Suites</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Thoughtfully designed spaces that blend modern luxury with local charm.
                        Find the perfect retreat for your stay.
                    </p>
                </div>

                {rooms.length === 0 ? (
                    <div className="text-center text-gray-500 py-20">
                        No rooms available at the moment. Please check back later.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.map((room) => (
                            <RoomCard
                                key={room.id}
                                id={room.id}
                                name={room.name}
                                price={room.price.toString()}
                                max_guests={room.max_guests}
                                image={room.images[0]?.image_url}
                                amenities={room.amenities as string[]}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
