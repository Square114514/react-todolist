"use client";

import { useState } from "react";

interface AddProps {
  onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddProps) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit() {
    const text = inputValue.trim();

    if (!text) return;

    onAdd(text);
    setInputValue("");
  }

  // function handleChange(e: ChangeEvent<HTMLInputElement>) {
  //   setInputValue(e.target.value);
  // }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="input your todos"
      />
      <button onClick={handleSubmit}>Add Todo</button>
    </div>
  );
}

// 加入按enter实现add
