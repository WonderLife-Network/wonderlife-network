import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-20 bg-[#05060d] border-t border-purple-700/30 pt-12 pb-6 relative">
            
            {/* Glow Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 shadow-[0_0_20px_#8a2be2]"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Logo */}
                <div>
                    <img src="/logos/network.png" className="w-14 mb-4" />
                    <h3 className="text-xl font-bold text-glow">WonderLife Network</h3>
                    <p className="text-sm opacity-60 mt-2">
                        One Vision. One Community. Infinite Stories.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h4 className="font-semibold mb-4 text-purple-400">Navigation</h4>
                    <ul className="space-y-2 opacity-80 text-sm">
                        <li><Link href="/" className="hover:text-purple-400">Startseite</Link></li>
                        <li><Link href="/projects" className="hover:text-purple-400">Projekte</Link></li>
                        <li><Link href="/forum" className="hover:text-purple-400">Forum</Link></li>
                        <li><Link href="/gallery" className="hover:text-purple-400">Galerie</Link></li>
                        <li><Link href="/team" className="hover:text-purple-400">Team Bereich</Link></li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h4 className="font-semibold mb-4 text-purple-400">Social Media</h4>
                    <ul className="space-y-2 opacity-80 text-sm">
                        <li><a href="#" className="hover:text-purple-400">Instagram</a></li>
                        <li><a href="#" className="hover:text-purple-400">TikTok</a></li>
                        <li><a href="#" className="hover:text-purple-400">YouTube</a></li>
                        <li><a href="#" className="hover:text-purple-400">Discord</a></li>
                        <li><a href="#" className="hover:text-purple-400">Twitter / X</a></li>
                    </ul>
                </div>

                {/* Rechtliches */}
                <div>
                    <h4 className="font-semibold mb-4 text-purple-400">Rechtliches</h4>
                    <ul className="space-y-2 opacity-80 text-sm">
                        <li><Link href="/impressum" className="hover:text-purple-400">Impressum</Link></li>
                        <li><Link href="/datenschutz" className="hover:text-purple-400">Datenschutz</Link></li>
                        <li><Link href="/agb" className="hover:text-purple-400">AGB</Link></li>
                    </ul>
                </div>

            </div>

            {/* Copyright */}
            <div className="mt-10 text-center opacity-40 text-sm">
                © {new Date().getFullYear()} WonderLife Network. Alle Rechte vorbehalten.
            </div>
        </footer>
    );
}
