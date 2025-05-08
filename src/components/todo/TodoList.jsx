import TodoItem from './TodoItem';

function TodoList({ todos, onStatusChange, onDelete, onEdit }) {
  if (!todos || todos.length === 0) {
    return <div className="text-center text-gray-500">Kayıt bulunamadı.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;