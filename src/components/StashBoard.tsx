"use client";

import { Item } from "@/types/inventory";
import { DraggableItem } from "./DraggableItem";

export function StashBoard(props: {
  items: Item[];
  draggedItemId: string | null;
  onDragStart: (e: React.DragEvent, item: Item) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent) => void;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}) {
  const stashedItems = props.items.filter((item) => item.isPlaced === false);

  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-4 text-white">Stash Board</h2>

      <div
        className="bg-gray-800 p-6 rounded-md min-h-[500px] flex flex-wrap gap-4 items-start content-start"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => props.onDrop(e)}
      >
        {stashedItems.length === 0 ? (
          <p className="text-gray-400">Stash is empty. Drag items here to unequip.</p>
        ) : (
          stashedItems.map((item) => (
            <DraggableItem
              key={item.id}
              item={item}
              isPlaced={false}
              isDragged={props.draggedItemId === item.id}
              onDragStart={props.onDragStart}
              onDragEnd={props.onDragEnd}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
