"use client";

import { Item } from "@/types/inventory";
import { DraggableItem } from "./DraggableItem";

export function GridBoard(props: {
  items: Item[];
  draggedItemId: string | null;
  onDragStart: (e: React.DragEvent, item: Item) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent, x: number, y: number) => void;
  onDrop: (e: React.DragEvent, x: number, y: number) => void;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}) {
  const cellSize = 50;
  const cols = 10;
  const rows = 10;

  const cells = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells.push({ x: x, y: y });
    }
  }

  const placedItems = props.items.filter((item) => item.isPlaced === true);

  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-4 text-white">Grid Board</h2>
      
      <div
        className="bg-gray-800 border-4 border-gray-600 relative"
        style={{ width: cols * cellSize + "px", height: rows * cellSize + "px" }}
      >
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gridTemplateRows: `repeat(${rows}, ${cellSize}px)` }}
        >
          {cells.map((cell) => (
            <div
              key={`${cell.x}-${cell.y}`}
              className="border border-white border-opacity-10"
            />
          ))}
        </div>

        <div 
          className="absolute top-0 left-0 w-full h-full z-10"
          style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`, gridTemplateRows: `repeat(${rows}, ${cellSize}px)` }}
        >
          {cells.map((cell) => (
            <div
              key={`drop-${cell.x}-${cell.y}`}
              onDragOver={(e) => props.onDragOver(e, cell.x, cell.y)}
              onDrop={(e) => props.onDrop(e, cell.x, cell.y)}
            />
          ))}
        </div>

        <div className="absolute top-0 left-0 z-20">
          {placedItems.map((item) => (
            <DraggableItem
              key={item.id}
              item={item}
              isPlaced={true}
              isDragged={props.draggedItemId === item.id}
              onDragStart={props.onDragStart}
              onDragEnd={props.onDragEnd}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
