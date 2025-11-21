import "./globals.css";

export const metadata = {
    title: "WonderLife Network",
    description: "Offizielle Webseite des WonderLife City Netzwerks"
};

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <body className="bg-[#08090F] text-white antialiased">
                {children}
                <Footer />
            </body>
        </html>
    );
}
