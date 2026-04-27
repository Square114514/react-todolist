"use client";

import dynamic from "next/dynamic";

const TodoList = dynamic(() => import("./TodoList"), {
  ssr: false,

  // 加载时的占位图，防止页面抖动(next/dynamic API 特有)
  // loading: () => (
  //   <div className="w-full max-w-2xl bg-amber-50 rounded-2xl shadow-xl p-8 h-96"></div>
  // ),
});

export default function ClientTodoList() {
  return <TodoList />;
}
