export default function Projects() {
    const projects = [
        {
            title: "WonderLife City",
            desc: "Unser Hauptprojekt · Roleplay Stadt mit realistischer Wirtschaft, Fraktionen & Events",
            icon: "/logos/city.png"
        },
        {
            title: "WonderLife FM",
            desc: "Eigenes Radio · Musikshows · Livestream Events",
            icon: "/logos/fm.png"
        },
        {
            title: "WonderLife Development",
            desc: "Skripting, Web, Bots, Dashboards · Alles was WonderLife antreibt",
            icon: "/logos/dev.png"
        }
    ];

    return (
        <section className="section">
            <h2 className="text-4xl font-bold text-center mb-12 text-glow">
                Unsere Projekte
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((item, i) => (
                    <div key={i} className="p-6 rounded-xl bg-[#0a0c14] border border-[#260045] shadow-xl hover:shadow-purple-500/40 transition-all duration-300">
                        <img src={item.icon} className="w-20 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="opacity-70 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
