import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/common/Navbar';
import Dashboard from './pages/Dashboard';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';
import AddTodoPage from './pages/AddTodoPage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="pt-20 px-4 max-w-6xl mx-auto">
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/todos" element={
              <ProtectedRoute>
                <TodoListPage />
              </ProtectedRoute>
            } />
            <Route path="/todos/:id" element={
              <ProtectedRoute>
                <TodoDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/todos/:id/edit" element={
              <ProtectedRoute>
                <TodoDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/todos/new" element={
              <ProtectedRoute>
                <AddTodoPage />
              </ProtectedRoute>
            } />
            <Route path="/categories" element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
