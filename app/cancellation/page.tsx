import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Cancellation Policy | Beltola Lodge',
    description: 'Cancellation and Refund Policy for Beltola Lodge, Guwahati.',
};

export default function CancellationPolicyPage() {
    return (
        <div className="min-h-screen relative bg-[#F5F1EA]">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[url('/images/bg-pattern.jpeg')] bg-repeat bg-fixed" />

            <Navbar />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="bg-white p-8 md:p-16 rounded-3xl shadow-sm">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1B1B1B] mb-8 border-b pb-6">
                        Cancellation & Refund Policy: Beltola Lodge, Guwahati
                    </h1>

                    <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                        <p className="text-xl text-gray-600 font-serif italic mb-10">
                            At Beltola Lodge, we understand that travel plans can change. To balance flexibility with our commitment to providing a high-quality experience, the following policy applies to all bookings:
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm">1. Free Cancellation</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Full Refund:</strong> Guests may cancel their reservation up to 48 hours prior to the standard check-in time (12:00 PM) for a full refund of any deposit paid.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">2. Late Cancellation</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>One-Night Charge:</strong> Cancellations made within less than 48 hours of the scheduled check-in will incur a charge equivalent to the first night&apos;s stay.</li>
                                <li><strong>Last-Minute Changes:</strong> Any cancellations or modifications made on the day of arrival are non-refundable.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">3. No-Show Policy</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Total Booking Value:</strong> In the event of a &quot;No-Show&quot; (failure to arrive without prior notice), the full amount of the booking will be charged, and the room will be released for other guests after 6:00 PM unless otherwise coordinated.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">4. Early Departure</h2>
                            <p>
                                If a guest chooses to shorten their stay after checking in, the remaining nights are non-refundable unless notice is provided at least 24 hours in advance (subject to management discretion).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">5. Refund Processing</h2>
                            <p>
                                Approved refunds will be processed via the original payment method within 5&ndash;7 business days, depending on your bank&apos;s processing time.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
