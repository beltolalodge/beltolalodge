import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Terms & Conditions | Beltola Lodge',
    description: 'Terms and Conditions for Beltola Lodge, Guwahati.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen relative bg-[#F5F1EA]">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[url('/images/bg-pattern.jpeg')] bg-repeat bg-fixed" />

            <Navbar />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="bg-white p-8 md:p-16 rounded-3xl shadow-sm">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1B1B1B] mb-8 border-b pb-6">
                        Terms & Conditions: Beltola Lodge, Guwahati
                    </h1>

                    <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                        <p className="text-xl text-gray-600 font-serif italic mb-10">
                            Welcome to Beltola Lodge. By booking a stay with us, you agree to the following terms and conditions designed to ensure a safe and pleasant experience for all guests.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm">1. Check-in & Check-out</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Check-in:</strong> From 12:00 PM onwards. A valid government-issued photo ID (Aadhaar, Voter ID, or Passport) is mandatory for all guests.</li>
                                <li><strong>Check-out:</strong> By 11:00 AM. Late check-outs are subject to availability and may incur additional charges.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">2. Booking & Payments</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Payment:</strong> Full payment or a designated deposit is required to confirm your reservation.</li>
                                <li><strong>Cancellations:</strong> Cancellations made within 48 hours of the check-in date may be subject to a one-night stay charge.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">3. Occupancy & Guests</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Capacity:</strong> Rooms must not exceed the maximum occupancy specified during booking (e.g., 2 adults & 1 child for Deluxe Family Rooms).</li>
                                <li><strong>Visitors:</strong> Outside visitors are permitted in common areas only and must depart by 9:00 PM. Overnight stay for unregistered guests is strictly prohibited.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">4. House Rules</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Smoking:</strong> Beltola Lodge is a non-smoking facility. Smoking is permitted only in designated outdoor areas.</li>
                                <li><strong>Noise:</strong> Please respect &quot;Quiet Hours&quot; between 10:00 PM and 7:00 AM.</li>
                                <li><strong>Illegal Activities:</strong> Any illegal activity, including the possession of prohibited substances, will result in immediate eviction without a refund and reporting to Guwahati authorities.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">5. Liability & Damages</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Damage:</strong> Guests are responsible for any damage caused to the property or amenities during their stay and will be charged accordingly.</li>
                                <li><strong>Valuables:</strong> While we strive to provide a secure environment, the management is not responsible for the loss or theft of personal belongings.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">6. Right of Admission</h2>
                            <p>
                                The management reserves the right to refuse admission or request a guest to leave if their conduct is deemed disruptive or violates these terms.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
