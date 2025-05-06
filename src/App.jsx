import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/todos" element={<TodoListPage />} />
        <Route path="/todos/:id" element={<TodoDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;