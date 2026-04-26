"use client";

import { useState } from "react";

interface AddProps {
  onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const text = inputValue.trim();

    if (!text) return;

    onAdd(text);
    setInputValue("");
  };

  return (
    <div className="flex items-center mb-8 gap-8">
      <input
        className="flex-1 px-4 py-3 border-b-2 min-w-80 h-9 border-emerald-700 focus:outline-none focus:border-emerald-500 focus:shadow-xl transition"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          } // 增加按下 Enter 也可 add
        }}
        placeholder="input your todos"
      />
      <button
        className="bg-emerald-600 text-white px-5 py-3 rounded-xl hover:bg-emerald-700 transition"
        onClick={handleSubmit}
      >
        Add Todo
      </button>
    </div>
  );
}

// 加入按enter实现add
