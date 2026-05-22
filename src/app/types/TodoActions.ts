export type TodoAction =
  | { type: "ADD"; payload: { text: string } }
  | { type: "DELETE"; payload: { id: string } }
  | { type: "EDIT"; payload: { id: string; text: string } }
  | { type: "TOGGLE"; payload: { id: string } }
  | { type: "CLEAR_COMPLETED" };
