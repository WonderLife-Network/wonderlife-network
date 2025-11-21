export default function ForumPreview() {
    return (
        <section className="section">
            <h2 className="text-4xl font-bold text-center mb-12 text-glow">
                Forum Vorschau
            </h2>

            <div className="p-6 bg-[#0b0d15] rounded-xl border border-[#260045]">
                <p className="opacity-70 mb-4">Die neuesten Themen aus dem Forum:</p>

                <ul className="space-y-3">
                    <li className="bg-[#141722] p-4 rounded-lg">🚨 Support – Spieler kommt nicht auf den Server</li>
                    <li className="bg-[#141722] p-4 rounded-lg">💡 Vorschlag – Neues Event-System</li>
                    <li className="bg-[#141722] p-4 rounded-lg">🛠️ Bugmeldung – Fahrzeug verschwindet</li>
                </ul>
            </div>
        </section>
    );
}
