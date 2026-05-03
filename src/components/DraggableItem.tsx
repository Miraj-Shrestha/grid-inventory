"use client";

import { Item } from "@/types/inventory";

export function DraggableItem(props: {
  item: Item;
  isPlaced: boolean;
  isDragged?: boolean;
  onDragStart: (e: React.DragEvent, item: Item) => void;
  onDragEnd: () => void;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}) {
  const item = props.item;
  const cellSize = 50;

  // Simple style logic
  const width = props.isPlaced ? item.width * cellSize - 2 : item.width * 30;
  const height = props.isPlaced ? item.height * cellSize - 2 : item.height * 30;

  const handleDragStart = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const blockOffsetX = Math.floor(clickX / (rect.width / item.width));
    const blockOffsetY = Math.floor(clickY / (rect.height / item.height));

    e.dataTransfer.setData("offsetX", blockOffsetX.toString());
    e.dataTransfer.setData("offsetY", blockOffsetY.toString());
    
    props.onDragStart(e, item);
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={props.onDragEnd}
      className={`absolute border-2 flex items-center justify-center cursor-grab active:cursor-grabbing group ${item.color} ${props.isDragged ? 'opacity-50 pointer-events-none' : ''}`}
      style={{
        width: width + "px",
        height: height + "px",
        left: props.isPlaced ? (item.gridX || 0) * cellSize + "px" : "auto",
        top: props.isPlaced ? (item.gridY || 0) * cellSize + "px" : "auto",
        position: props.isPlaced ? "absolute" : "relative"
      }}
    >
      <span className="text-white font-bold text-xs pointer-events-none">
        {props.isPlaced ? item.name : `${item.width}x${item.height}`}
      </span>

      <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.onEdit(item);
          }}
          className="bg-blue-500 text-white px-2 py-1 text-xs rounded z-50"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.onDelete(item.id);
          }}
          className="bg-red-500 text-white px-2 py-1 text-xs rounded z-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
