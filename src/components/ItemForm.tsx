"use client";

import { useState } from "react";

export function ItemForm(props: {
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(props.initialData?.name || "");
  const [width, setWidth] = useState(props.initialData?.width || 1);
  const [height, setHeight] = useState(props.initialData?.height || 1);
  const [color, setColor] = useState(props.initialData?.color || "bg-blue-500");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSave({
      name: name,
      width: parseInt(width.toString()),
      height: parseInt(height.toString()),
      type: "Weapon", // Default type
      color: color,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-white">Name</label>
        <input 
          className="w-full p-2 bg-gray-800 text-white rounded" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>

      <div>
        <label className="text-white">Width</label>
        <input 
          type="number" 
          className="w-full p-2 bg-gray-800 text-white rounded" 
          value={width} 
          onChange={(e) => setWidth(parseInt(e.target.value))} 
          required 
        />
      </div>

      <div>
        <label className="text-white">Height</label>
        <input 
          type="number" 
          className="w-full p-2 bg-gray-800 text-white rounded" 
          value={height} 
          onChange={(e) => setHeight(parseInt(e.target.value))} 
          required 
        />
      </div>

      <div>
        <label className="text-white">Color</label>
        <select 
          className="w-full p-2 bg-gray-800 text-white rounded" 
          value={color} 
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="bg-blue-500">Blue</option>
          <option value="bg-red-500">Red</option>
          <option value="bg-green-500">Green</option>
          <option value="bg-orange-500">Orange</option>
          <option value="bg-gray-500">Gray</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={props.onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
}
