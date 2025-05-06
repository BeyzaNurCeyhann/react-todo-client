import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import Dashboard from './pages/Dashboard';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/todos" element={<TodoListPage />} />
          <Route path="/todos/:id" element={<TodoDetailPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;