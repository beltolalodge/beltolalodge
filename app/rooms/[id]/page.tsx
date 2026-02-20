/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingWidget from '@/components/BookingWidget'; // Need to create this

interface PageProps {
    params: { id: string };
}

export default async function RoomDetailPage({ params }: PageProps) {
    const room = await db.room.findUnique({
        where: { id: params.id },
        include: { images: true },
    });

    if (!room) notFound();

    return (
        <div className="min-h-screen relative bg-[#F5F1EA]">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[url('/images/bg-pattern.jpeg')] bg-repeat bg-fixed" />

            <Navbar />

            {/* Dynamic Hero for Room */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/30" />
                <img
                    src={room.images[0]?.image_url || '/images/placeholder-room.jpg'}
                    alt={room.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{room.name}</h1>
                    <p className="text-xl md:text-2xl font-light opacity-90">
                        starting from <span className="text-[#C8A45D] font-bold">₹{room.price.toString()}</span> / night
                    </p>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-3xl font-serif font-bold mb-6 text-[#1B1B1B]">Description</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                            {room.description}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-serif font-bold mb-6 text-[#1B1B1B]">Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {(room.amenities as string[]).map((amenity, idx) => (
                                <div key={idx} className="flex items-center space-x-3 text-gray-600 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <span className="text-[#C8A45D] text-xl">✓</span>
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Gallery Grid */}
                    <section>
                        <h2 className="text-3xl font-serif font-bold mb-6 text-[#1B1B1B]">Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {room.images.slice(1).map((img) => (
                                <img
                                    key={img.id}
                                    src={img.image_url}
                                    alt={room.name}
                                    loading="lazy"
                                    className="rounded-xl w-full h-64 object-cover hover:opacity-90 transition cursor-pointer"
                                />
                            ))}
                            {room.images.length <= 1 && (
                                <p className="text-gray-400 italic">No additional images available.</p>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Sticky Sidebar - Booking Widget */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32">
                        <BookingWidget room={room} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
