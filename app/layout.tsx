import React from 'react';
import { Cinzel } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

export const metadata = {
    title: 'Beltola Lodge',
    description: 'Luxury stay in the heart of the city',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`antialiased text-gray-900 bg-[#F5F1EA] ${cinzel.variable}`}>
                {children}
            </body>
        </html>
    );
}
