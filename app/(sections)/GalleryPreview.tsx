export default function GalleryPreview() {
    return (
        <section className="section">
            <h2 className="text-4xl font-bold text-center mb-12 text-glow">
                Galerie Vorschau
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <img src="/images/gallery1.jpg" className="rounded-lg shadow-xl" />
                <img src="/images/gallery2.jpg" className="rounded-lg shadow-xl" />
                <img src="/images/gallery3.jpg" className="rounded-lg shadow-xl" />
            </div>
        </section>
    );
}
