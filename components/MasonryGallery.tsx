"use client";
import React, { useState } from 'react';

interface Image {
    id: string;
    image_url: string;
    room?: { name: string };
}

export default function MasonryGallery({ images }: { images: Image[] }) {
    const [selected, setSelected] = useState<Image | null>(null);

    return (
        <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {images.map((img) => (
                    <div
                        key={img.id}
                        className="break-inside-avoid relative group cursor-zoom-in overflow-hidden rounded-xl"
                        onClick={() => setSelected(img)}
                    >
                        <img
                            src={img.image_url}
                            alt={img.room?.name || 'Inat Hotel Gallery'}
                            loading="lazy"
                            className="w-full h-auto transform transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-serif">
                            <span>{img.room?.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selected && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setSelected(null)}
                >
                    <button
                        onClick={() => setSelected(null)}
                        className="absolute top-4 right-4 text-white text-4xl"
                    >
                        &times;
                    </button>

                    <img
                        src={selected.image_url}
                        alt={selected.room?.name}
                        loading="lazy"
                        className="max-h-[90vh] max-w-full rounded-lg shadow-2xl"
                    />

                    <div className="absolute bottom-4 left-0 w-full text-center text-white/80 font-serif">
                        {selected.room?.name}
                    </div>
                </div>
            )}
        </>
    );
}
