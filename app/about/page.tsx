import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'About | Beltola Lodge',
    description: 'Learn more about Beltola Lodge, a serene homestay in Guwahati.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen relative bg-[#F5F1EA] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('/images/bg-pattern.jpeg')] bg-repeat bg-fixed" />

            <Navbar />

            {/* Hero */}
            <div className="relative h-[50vh] flex items-center justify-center bg-black/40">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070')] bg-cover bg-center -z-10" />
                <h1 className="text-5xl md:text-6xl font-cinzel font-bold text-white tracking-wide text-center px-4">A Serene Homestay</h1>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-24 text-center md:text-left">

                {/* Section 1 */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-[#1B1B1B] mb-3">Property Overview</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Beltola Lodge – A Serene Homestay is a cosy, lodge-style retreat offering comfortable rooms with a warm, homely atmosphere. The design incorporates subtle touches of traditional Northeastern décor, blending comfort with local charm.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-[#1B1B1B] mb-3">Amenities & Facilities</h2>
                            <p className="text-gray-600 leading-relaxed mb-2 text-lg">Guests have access to:</p>
                            <ul className="list-disc pl-5 text-gray-600 space-y-2 text-lg">
                                <li>A shared kitchen and dining space, with the option of simple home-cooked meals on order.</li>
                                <li>App-based food delivery services for added convenience.</li>
                                <li>A small garden and lawn area that offers green views and fresh air.</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mt-4 text-lg">
                                These thoughtful touches make the stay ideal for families, solo travellers, and working professionals seeking peaceful accommodation in Guwahati.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl rotate-1 hover:rotate-0 transition duration-500">
                        <Image src="/images/IMG_1631.JPG" alt="Beltola Lodge Property" fill className="object-cover" />
                    </div>
                </section>

                {/* Section 2 */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl -rotate-1 hover:rotate-0 transition duration-500">
                        <Image src="/images/IMG_1635.JPG" alt="Beltola Lodge Ambience" fill className="object-cover" />
                    </div>
                    <div className="order-1 md:order-2 space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-[#1B1B1B] mb-3">Ambience & Experience</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                The atmosphere at Beltola Lodge is calm, homely, and welcoming. Whether you&apos;re working remotely, exploring the city, or simply relaxing, the environment encourages rest and reflection rather than the bustle often found in hotel zones.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-[#1B1B1B] mb-3">Location Advantage</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Beltola is a prime residential locality in the southern part of Guwahati, adjoining the Dispur Capital Complex. It is one of the city&apos;s most sought‑after neighbourhoods, known for its mix of urban convenience and peaceful surroundings.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-[#1B1B1B] mb-3">Connectivity & Accessibility</h2>
                            <p className="text-gray-600 leading-relaxed mb-2 text-lg">
                                The area lies close to National Highway 27, providing smooth road connectivity to all major parts of Guwahati.
                            </p>
                            <ul className="list-disc pl-5 text-gray-600 space-y-2 text-lg">
                                <li><strong>Railway Station:</strong> Around 30–40 minutes&apos; drive.</li>
                                <li><strong>Airport:</strong> Approximately 1 hour away under normal traffic conditions.</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mt-4 text-lg">
                                This makes Beltola a convenient base for both leisure and business visitors.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-[#1B1B1B] mb-3">Neighbourhood Highlights</h2>
                            <p className="text-gray-600 leading-relaxed mb-2 text-lg">
                                Beltola is known for its developed social infrastructure, including:
                            </p>
                            <ul className="list-disc pl-5 text-gray-600 space-y-2 text-lg">
                                <li>Nearby markets, hospitals, schools, and banks.</li>
                                <li>Parks and temples within easy reach.</li>
                                <li>A safe, family-friendly environment.</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mt-4 text-lg">
                                Cultural attractions such as Srimanta Sankardev Kalakshetra, Basistha Temple, and the popular Beltola Bazaar add a rich local flavour, showcasing Assamese craft, culture, and everyday life.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl rotate-1 hover:rotate-0 transition duration-500">
                        <Image src="/images/IMG_1637.JPG" alt="Beltola Lodge Surroundings" fill className="object-cover" />
                    </div>
                </section>

                {/* Suggested Listing Line */}
                <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#C8A45D]/20 text-center max-w-4xl mx-auto">
                    <span className="text-[#C8A45D] text-4xl leading-none">&quot;</span>
                    <p className="text-xl md:text-2xl font-serif text-gray-700 italic px-4 py-2">
                        Located in Beltola, a prime residential neighbourhood adjoining Dispur, with easy access to NH‑27, hospitals, markets, malls and key city landmarks, Beltola Lodge – A Serene Homestay offers a calm base within Guwahati at an attractive mid-range price point.
                    </p>
                    <span className="text-[#C8A45D] text-4xl leading-none">&quot;</span>
                </section>

            </div>

            <Footer />
        </div>
    );
}
