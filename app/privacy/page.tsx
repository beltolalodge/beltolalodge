import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Privacy Policy | Beltola Lodge',
    description: 'Privacy Policy for Beltola Lodge, Guwahati.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen relative bg-[#F5F1EA]">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[url('/images/bg-pattern.jpeg')] bg-repeat bg-fixed" />

            <Navbar />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="bg-white p-8 md:p-16 rounded-3xl shadow-sm">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1B1B1B] mb-8 border-b pb-6">
                        Privacy Policy: Beltola Lodge, Guwahati
                    </h1>

                    <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                        <p className="text-xl text-gray-600 font-serif italic mb-10">
                            At Beltola Lodge, we value your privacy. This policy outlines how we handle your personal information during your stay or booking process.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm">1. Information Collection</h2>
                            <p className="mb-4">We collect only the necessary details required for booking and legal compliance:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Personal Identification:</strong> Name, address, phone number, and email.</li>
                                <li><strong>Government ID:</strong> As per local regulations, a copy of a valid government-issued ID (Aadhaar, Voter ID, or Passport) is required at check-in.</li>
                                <li><strong>Payment Details:</strong> Necessary information to process your stay, handled via secure channels.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">2. Use of Information</h2>
                            <p className="mb-4">Your data is used strictly for:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Confirming and managing your room reservations.</li>
                                <li>Fulfilling legal reporting requirements to local Guwahati authorities (e.g., Form C for international guests).</li>
                                <li>Improving your guest experience and providing localized assistance during your stay.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">3. Data Protection & Sharing</h2>
                            <ul className="list-disc pl-6 space-y-4">
                                <li><strong>No Third-Party Selling:</strong> We never sell or rent your personal information to marketers.</li>
                                <li><strong>Security:</strong> We implement standard physical and digital security measures to protect your documents and contact details.</li>
                                <li><strong>Limited Disclosure:</strong> Your information is only shared with law enforcement or government bodies when legally mandated.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#C8A45D] mb-4 uppercase tracking-widest text-sm mt-8">4. Your Rights</h2>
                            <p>
                                You may request to review, update, or delete your contact information from our records after your stay, provided all legal residency reporting requirements have been met.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
