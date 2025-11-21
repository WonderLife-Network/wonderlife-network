export default function TeamArea() {
    return (
        <section className="section text-center">
            <h2 className="text-4xl font-bold mb-8 text-glow">Team Bereich</h2>

            <p className="opacity-70 mb-6">
                Hier gelangen Teammitglieder zu allen internen Tools, wie Tickets, Logs & Creator Verwaltung.
            </p>

            <a href="/team" className="px-8 py-4 bg-purple-600 hover:bg-purple-800 rounded-xl text-white font-semibold shadow-xl">
                Zum Team Bereich →
            </a>
        </section>
    );
}
