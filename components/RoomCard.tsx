"use client";
import Link from 'next/link';
import Image from 'next/image';

interface RoomProps {
    id: string;
    name: string;
    price: string;
    max_guests: number;
    image?: string;
    amenities: string[];
}

export default function RoomCard({ id, name, price, max_guests, image, amenities }: RoomProps) {
    return (
        <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={image || "/images/placeholder-room.jpg"}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-[#1B1B1B] shadow-sm">
                    ₹{price} <span className="text-xs font-normal text-gray-500">/ night</span>
                </div>
            </div>

            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-serif font-bold text-[#1B1B1B]">{name}</h3>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{max_guests} Guests</span>
                    <span>•</span>
                    <span>{Array.isArray(amenities) ? amenities.slice(0, 2).join(', ') : ''}...</span>
                </div>

                <Link
                    href={`/rooms/${id}`}
                    className="block w-full text-center py-3 border border-[#C8A45D] text-[#C8A45D] font-medium rounded-lg hover:bg-[#C8A45D] hover:text-white transition-all"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
