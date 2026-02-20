
import BookingBar from '@/components/BookingBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen relative bg-[#F5F1EA]">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('/images/bg-pattern.jpeg')] bg-repeat bg-fixed" />

            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />


                {/* Fluid Canvas */}
                <div
                    className="absolute inset-0 z-0 h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/background.gif')" }}
                />

                {/* Content Container */}
                <div className="relative z-20 h-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-end pb-24 md:pb-32">

                    {/* Text Content (Bottom Left) */}
                    <div className="text-left text-white max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">
                            Find Your <span className="text-[#C8A45D]">Perfect</span> Stay
                        </h1>
                        <p className="text-lg md:text-xl font-light tracking-wide text-white/90 mb-10 max-w-lg drop-shadow-md">
                            Experience modern luxury and timeless comfort in the heart of the city.
                        </p>
                        <div className="flex gap-4">
                            <a href="/about" className="px-8 py-4 border border-white text-white font-medium rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
                                Discover More
                            </a>
                        </div>
                    </div>

                    {/* Booking Box (Right Side) */}
                    <div className="flex justify-end items-center h-full md:items-center">
                        <BookingBar />
                    </div>
                </div>
            </section>

            {/* Trust Stats Section */}
            <section className="relative z-10 py-24 bg-white/90 backdrop-blur-sm shadow-sm my-16 mx-6 rounded-3xl max-w-7xl md:mx-auto">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: 'Guest Satisfaction', value: '98%' },
                        { label: 'Years Experience', value: '15+' },
                        { label: 'Happy Guests', value: '25k+' },
                        { label: 'Star Rating', value: '5.0' },
                    ].map((stat, idx) => (
                        <div key={idx} className="space-y-2 group cursor-default">
                            <h3 className="text-4xl font-serif font-bold text-[#C8A45D] group-hover:scale-110 transition-transform">{stat.value}</h3>
                            <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Rooms & About teaser would go here */}

            <Footer />
        </div>
    );
}
