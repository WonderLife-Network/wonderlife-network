"use client";

import { useEffect, useState } from "react";

export default function AdminForumCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  function load() {
    fetch("/api/forum")
      .then(res => res.json())
      .then(data => setCategories(data));
  }

  useEffect(() => {
    load();
  }, []);

  async function createCategory(e: any) {
    e.preventDefault();

    const res = await fetch("/api/forum/categories/create", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ name, description })
    });

    const data = await res.json();
    if (data.error) return alert(data.error);

    setName("");
    setDescription("");
    load();
  }

  async function updateCategory(e: any) {
    e.preventDefault();

    const res = await fetch("/api/forum/categories/edit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ id: editId, name: editName, description: editDesc })
    });

    const data = await res.json();
    if (data.error) return alert(data.error);

    setEditId(null);
    load();
  }

  async function deleteCategory(id: number) {
    if (!confirm("Kategorie wirklich löschen?")) return;

    const res = await fetch("/api/forum/categories/delete", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ id })
    });

    load();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-white">

      <h1 className="text-4xl font-bold mb-10">Kategorien verwalten</h1>

      {/* Neue Kategorie */}
      <form onSubmit={createCategory} className="p-6 bg-[#0d0f18] border border-purple-700/40 rounded-xl mb-10">

        <h2 className="text-2xl font-bold mb-4">Neue Kategorie</h2>

        <input
          className="w-full mb-4 p-3 bg-[#151822] border border-purple-700/40 rounded-lg"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          className="w-full mb-4 p-3 bg-[#151822] border border-purple-700/40 rounded-lg"
          placeholder="Beschreibung (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-800 shadow-lg shadow-purple-500/40">
          Erstellen
        </button>
      </form>

      {/* Kategorienliste */}
      <div className="space-y-6">
        {categories.map((cat: any) => (
          <div
            key={cat.id}
            className="p-6 bg-[#0d0f18] border border-purple-700/40 rounded-xl flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-bold">{cat.name}</h3>
              <p className="opacity-70">{cat.description || "Keine Beschreibung"}</p>
            </div>

            <div className="flex gap-3">

              <button
                onClick={() => {
                  setEditId(cat.id);
                  setEditName(cat.name);
                  setEditDesc(cat.description || "");
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-lg shadow-lg shadow-blue-500/40"
              >
                Bearbeiten
              </button>

              <button
                onClick={() => deleteCategory(cat.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded-lg shadow-lg shadow-red-500/40"
              >
                Löschen
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* Bearbeiten Popup */}
      {editId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50">
          <form
            onSubmit={updateCategory}
            className="bg-[#0d0f18] p-6 rounded-xl border border-purple-700/40 w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Kategorie bearbeiten</h2>

            <input
              className="w-full p-3 mb-4 bg-[#151822] border border-purple-700/40 rounded-lg"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />

            <textarea
              className="w-full p-3 mb-4 bg-[#151822] border border-purple-700/40 rounded-lg"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditId(null)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
              >
                Abbrechen
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-800 rounded-lg shadow-purple-500/40"
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
