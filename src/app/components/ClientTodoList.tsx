"use client";

import dynamic from "next/dynamic";

const TodoList = dynamic(() => import("./TodoList"), {
  ssr: false,

  // 加载时的占位图，防止页面抖动(next/dynamic API 特有)
  loading: () => (
    <div className="w-full max-w-2xl bg-amber-50 rounded-2xl shadow-xl p-8 h-96">
      <h1 className="text-5xl font-bold mb-4 text-emerald-900">TodoList</h1>
      <div className="flex items-center mb-2 gap-8">
        <input
          className="flex-1 px-4 py-3 border-b-2 min-w-80 h-9 border-emerald-700 focus:outline-none focus:border-emerald-600 focus:shadow-xl hover:border-b-emerald-500 transition"
          type="text"
          placeholder="input your todos"
        />
        <button className="bg-emerald-600 text-white text-lg px-5 py-2 rounded-xl hover:bg-emerald-700 hover:shadow-lg transition">
          Add Todo
        </button>
      </div>
    </div>
  ),
});

export default function ClientTodoList() {
  return <TodoList />;
}
