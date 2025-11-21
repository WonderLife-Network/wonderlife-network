export default function DiscordServers() {
    const servers = [
        { name: "WonderLife Network", id: "1438177248678121615", icon: "/logos/network.png" },
        { name: "WonderLife City", id: "1329371549035135037", icon: "/logos/city.png" },
        { name: "WonderLife Studios", id: "1438324009929543694", icon: "/logos/studios.png" },
        { name: "WonderLife FM", id: "1438326396677263463", icon: "/logos/fm.png" },
        { name: "WonderLife Development", id: "1438326142846111917", icon: "/logos/dev.png" }
    ];

    return (
        <section className="section">
            <h2 className="text-4xl font-bold text-center mb-12 text-glow">
                Unsere Discord Server
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {servers.map((srv, i) => (
                    <div key={i} className="p-6 rounded-xl bg-[#0a0c14] border border-purple-700/30">
                        <img src={srv.icon} className="w-16 mb-4" />
                        <h3 className="text-xl font-semibold">{srv.name}</h3>
                        <p className="opacity-70 text-sm">Server ID: {srv.id}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
