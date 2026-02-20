"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/whatsapp-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // Redirect to WhatsApp
            window.open(data.url, '_blank');

            // Optionally clear the form
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            alert(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative bg-[#F5F1EA]">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[url('/images/bg-pattern.jpeg')] bg-repeat bg-fixed" />

            <Navbar />

            <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <h1 className="text-5xl font-serif font-bold text-[#1B1B1B] text-center mb-16">Get in Touch</h1>

                <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-16 rounded-3xl shadow-sm">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg uppercase tracking-widest text-[#C8A45D] font-bold mb-2">Address</h3>
                            <p className="text-gray-600 text-xl">7, Rupkonwar Path, Jhanakpur,<br />Beltola Tiniali, Guwahati, Assam 781028</p>
                        </div>
                        <div>
                            <h3 className="text-lg uppercase tracking-widest text-[#C8A45D] font-bold mb-2">Phone</h3>
                            <p className="text-gray-600 text-xl">+91 91013 11322</p>
                            <p className="text-gray-400 text-sm mt-1">Available 24/7</p>
                        </div>
                        <div>
                            <h3 className="text-lg uppercase tracking-widest text-[#C8A45D] font-bold mb-2">Email</h3>
                            <p className="text-gray-600 text-xl">beltolalodge@gmail.com</p>
                        </div>
                    </div>

                    {/* WhatsApp Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:ring-[#C8A45D]"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:ring-[#C8A45D]"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                            <textarea
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 focus:ring-[#C8A45D]"
                                placeholder="How can we help?"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1B1B1B] text-white font-bold py-4 rounded-lg hover:bg-[#333] transition disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Send Message via WhatsApp'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
