import { db } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import nextDynamic from 'next/dynamic';

const MasonryGallery = nextDynamic(() => import('@/components/MasonryGallery'), {
    loading: () => <div className="text-center text-[#C8A45D] py-10">Loading gallery...</div>
});

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const images = await db.roomImage.findMany({
        include: { room: { select: { name: true } } },
        orderBy: { created_at: 'desc' },
    });

    return (
        <div className="min-h-screen bg-[#F5F1EA]">
            <Navbar />
            <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
                <h1 className="text-5xl font-serif font-bold text-[#1B1B1B] text-center mb-12">Capture the Moment</h1>

                {images.length > 0 ? (
                    <MasonryGallery images={images} />
                ) : (
                    <p className="text-center text-gray-500">More photos coming soon.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
