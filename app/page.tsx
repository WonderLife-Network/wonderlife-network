import Header from "../components/Header";
import Projects from "./(sections)/Projects";
import DiscordServers from "./(sections)/DiscordServers";
import News from "./(sections)/News";
import ForumPreview from "./(sections)/ForumPreview";
import GalleryPreview from "./(sections)/GalleryPreview";
import TeamArea from "./(sections)/TeamArea";

export default function Home() {
    return (
        <>
            <Header />

            <main className="w-full max-w-7xl mx-auto px-6">

                {/* HERO */}
                <section className="text-center py-20">
                    <h1 className="text-6xl font-bold text-glow">
                        WonderLife City Network
                    </h1>
                    <p className="text-xl opacity-70 mt-4">
                        One Vision. One Community. Infinite Stories.
                    </p>
                </section>

                <Projects />
                <DiscordServers />
                <News />
                <ForumPreview />
                <GalleryPreview />
                <TeamArea />

            </main>
        </>
    );
}
