"use client";

import { useState, useEffect } from "react";
import { Item } from "@/types/inventory";
import { GridBoard } from "./GridBoard";
import { StashBoard } from "./StashBoard";
import { ItemForm } from "./ItemForm";

export function SpatialInventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
  }

  async function handleSaveItem(data: any) {
    if (editingItem) {
      await fetch(`/api/items/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setIsFormOpen(false);
    fetchItems();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    fetchItems();
  }

  function handleDragStart(e: React.DragEvent, item: Item) {
    e.dataTransfer.setData("itemId", item.id);
    // Use setTimeout so the browser can take the drag snapshot before it gets hidden
    setTimeout(() => setDraggedItemId(item.id), 0);
  }

  function handleDragEnd() {
    setDraggedItemId(null);
  }

  function handleGridDragOver(e: React.DragEvent, x: number, y: number) {
    e.preventDefault();
  }

  async function handleGridDrop(e: React.DragEvent, x: number, y: number) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const offsetX = parseInt(e.dataTransfer.getData("offsetX") || "0");
    const offsetY = parseInt(e.dataTransfer.getData("offsetY") || "0");

    let finalX = x - offsetX;
    let finalY = y - offsetY;

    if (finalX < 0) finalX = 0;
    if (finalY < 0) finalY = 0;
    if (finalX + item.width > 10) finalX = 10 - item.width;
    if (finalY + item.height > 10) finalY = 10 - item.height;

    await fetch(`/api/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gridX: finalX, gridY: finalY, isPlaced: true }),
    });
    fetchItems();
  }

  async function handleStashDrop(e: React.DragEvent) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");

    await fetch(`/api/items/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gridX: null, gridY: null, isPlaced: false }),
    });
    fetchItems();
  }

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl text-white font-bold">Grid Inventory</h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsFormOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded font-bold"
        >
          Add Item
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded border border-gray-700 w-96">
            <h2 className="text-xl text-white mb-4">
              {editingItem ? "Edit Item" : "Create Item"}
            </h2>
            <ItemForm
              initialData={editingItem}
              onSave={handleSaveItem}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex gap-10">
        <GridBoard
          items={items}
          draggedItemId={draggedItemId}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleGridDragOver}
          onDrop={handleGridDrop}
          onEdit={(item) => {
            setEditingItem(item);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
        />

        <StashBoard
          items={items}
          draggedItemId={draggedItemId}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleStashDrop}
          onEdit={(item) => {
            setEditingItem(item);
            setIsFormOpen(true);
          }}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
