"use client";

import { useEffect, useState } from "react";

export default function GalleryCategoriesAdmin() {
    const [categories, setCategories] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [editName, setEditName] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    async function loadCategories() {
        const res = await fetch("/api/gallery/categories");
        const data = await res.json();
        setCategories(data);
    }

    useEffect(() => {
        loadCategories();
    }, []);

    async function createHandler(e: any) {
        e.preventDefault();

        const res = await fetch("/api/gallery/categories/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });

        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        setName("");
        loadCategories();
    }

    async function editHandler(e: any) {
        e.preventDefault();

        const res = await fetch("/api/gallery/categories/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editId, name: editName })
        });

        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        setEditId(null);
        setEditName("");
        loadCategories();
    }

    async function deleteHandler(id: number) {
        if (!confirm("Kategorie wirklich löschen?")) return;

        const res = await fetch("/api/gallery/categories/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });

        const data = await res.json();
        if (data.error) return alert(data.error);

        loadCategories();
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-glow text-center mb-12">
                Kategorien – Admin Panel
            </h1>

            {/* Neue Kategorie */}
            <form 
                onSubmit={createHandler}
                className="p-6 bg-[#0c0e16] border border-purple-800/40 rounded-xl mb-10"
            >
                <h2 className="text-xl font-semibold mb-4">Neue Kategorie erstellen</h2>

                <input
                    placeholder="Kategoriename"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#141722] border border-purple-700/40 mb-4"
                    required
                />

                <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-800 shadow-lg shadow-purple-500/30"
                >
                    Erstellen
                </button>
            </form>

            {/* Kategorienliste */}
            <div className="space-y-4">
                {categories.length === 0 && (
                    <p className="opacity-70 text-center">Keine Kategorien vorhanden.</p>
                )}

                {categories.map(cat => (
                    <div
                        key={cat.id}
                        className="p-4 bg-[#0d0f18] border border-purple-800/40 rounded-xl flex items-center justify-between"
                    >
                        <span className="text-lg">{cat.name}</span>

                        <div className="flex gap-3">
                            {/* Bearbeiten */}
                            <button
                                onClick={() => {
                                    setEditId(cat.id);
                                    setEditName(cat.name);
                                }}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-800 shadow-lg shadow-blue-500/30"
                            >
                                Bearbeiten
                            </button>

                            {/* Löschen */}
                            <button
                                onClick={() => deleteHandler(cat.id)}
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-800 shadow-lg shadow-red-500/30"
                            >
                                Löschen
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bearbeiten Popup */}
            {editId !== null && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
                    <form
                        onSubmit={editHandler}
                        className="bg-[#10121b] p-6 rounded-xl border border-purple-800/50 w-full max-w-md"
                    >
                        <h2 className="text-xl font-bold mb-4 text-center">Kategorie bearbeiten</h2>

                        <input
                            value={editName}
                            onChange={(e)=>setEditName(e.target.value)}
                            className="w-full p-3 mb-4 bg-[#151822] border border-purple-700/40 rounded-lg"
                            required
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditId(null);
                                    setEditName("");
                                }}
                                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
                            >
                                Abbrechen
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-800 shadow-lg shadow-purple-500/40"
                            >
                                Speichern
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
