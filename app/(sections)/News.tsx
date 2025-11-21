export default function News() {
    const news = [
        {
            title: "Update 1.4.0 – Wirtschaft überarbeitet",
            desc: "Neue Farmrouten, Balancing, neue Jobs, Bugfixes & mehr.",
            date: "21.11.2025"
        },
        {
            title: "WonderLife FM Livestream gestartet!",
            desc: "Unsere DJs senden ab sofort täglich Live Musik!",
            date: "20.11.2025"
        }
    ];

    return (
        <section className="section">
            <h2 className="text-4xl font-bold text-center mb-12 text-glow">
                News & Updates
            </h2>

            <div className="space-y-6">
                {news.map((item, i) => (
                    <div key={i} className="p-6 bg-[#0d0f18] rounded-xl border border-purple-700/30">
                        <h3 className="text-2xl font-semibold">{item.title}</h3>
                        <p className="opacity-70">{item.desc}</p>
                        <p className="text-sm opacity-50 mt-2">{item.date}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
