import { useSelector } from 'react-redux';

function TodoListPage() {
  const todos = useSelector((state) => state.todos.items);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Todo Listesi</h1>
      <ul className="list-disc pl-5">
        {todos.map((todo, i) => (
          <li key={i}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoListPage;