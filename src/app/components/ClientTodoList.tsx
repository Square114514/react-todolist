"use client";

import dynamic from "next/dynamic";

const TodoList = dynamic(() => import("./TodoList"), {
  ssr: false, // 禁用ssr
});

export default function ClientTodoList() {
  return <TodoList />;
}
