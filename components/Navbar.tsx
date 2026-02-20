"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClass = scrolled
        ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20'
        : 'bg-transparent text-white';

    const linkClass = (path: string) => `
    hover:text-[#C8A45D] transition-colors duration-300
    ${pathname === path ? 'text-[#C8A45D]' : ''}
  `;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${navClass}`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex flex-col">
                    <span className="text-2xl font-cinzel font-bold tracking-widest text-[#C8A45D] leading-none">
                        BELTOLA LODGE
                    </span>
                    <span className="text-[0.65rem] font-serif tracking-[0.3em] text-white/80 uppercase mt-1 pl-1">
                        A Serene Homestay
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center font-medium">
                    <Link href="/" className={linkClass('/')}>Home</Link>
                    <Link href="/rooms" className={linkClass('/rooms')}>Rooms</Link>
                    <Link href="/gallery" className={linkClass('/gallery')}>Gallery</Link>
                    <Link href="/about" className={linkClass('/about')}>About</Link>
                    <Link href="/contact" className={linkClass('/contact')}>Contact</Link>
                    <Link href="/rooms" className="px-6 py-2 bg-[#C8A45D] text-white rounded-full hover:bg-[#B08D45] transition-transform hover:scale-105 shadow-lg">
                        Book Now
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-lg border-t border-gray-100 p-6 flex flex-col space-y-4 md:hidden text-gray-900">
                    <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/rooms" onClick={() => setIsOpen(false)}>Rooms</Link>
                    <Link href="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                </div>
            )}
        </nav>
    );
}
