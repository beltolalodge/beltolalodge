import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#1B1B1B] text-white py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-bold">Beltola Lodge</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Experience luxury and comfort in the heart of the city. Your perfect getaway awaits.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[#C8A45D] font-bold uppercase tracking-wider text-sm">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link href="/rooms" className="hover:text-white transition">Runs & Suites</Link></li>
                        <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
                        <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[#C8A45D] font-bold uppercase tracking-wider text-sm">Legal</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
                        <li><Link href="/cancellation" className="hover:text-white transition">Cancellation Policy</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[#C8A45D] font-bold uppercase tracking-wider text-sm">Contact</h4>
                    <p className="text-gray-400">7, Rupkonwar Path, Jhanakpur,<br />Beltola Tiniali, Guwahati 781028</p>
                    <p className="text-gray-400">+91 76359 45117</p>
                    <p className="text-gray-400">beltolalodge@gmail.com</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
                <div>
                    © {new Date().getFullYear()} Beltola Lodge. All rights reserved.
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-right">
                    <div>
                        <span className="text-gray-400 font-medium">Website Designed by:</span> Arunabha Roy<br />
                        <a href="mailto:royarunabha949@gmail.com" className="hover:text-white transition">royarunabha949@gmail.com</a>
                    </div>
                    <div>
                        <span className="text-gray-400 font-medium">Website Developed by:</span> Sudipta R. Baruah<br />
                        <a href="mailto:sudiptaranjanbaruah@gmail.com" className="hover:text-white transition">sudiptaranjanbaruah@gmail.com</a>
                    </div>
                    <div>
                        <span className="text-gray-400 font-medium">Website Idea:</span> Darrene Hazarika<br />
                        <a href="tel:+919707751944" className="hover:text-white transition">+91 97077 51944</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
