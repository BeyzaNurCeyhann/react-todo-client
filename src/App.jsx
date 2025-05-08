import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/common/Navbar';
import Dashboard from './pages/Dashboard';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';
import AddTodoPage from './pages/AddTodoPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="pt-20 px-4 max-w-6xl mx-auto"> 
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/todos" element={<TodoListPage />} />
            <Route path="/todos/:id" element={<TodoDetailPage />} />
            <Route path="/todos/:id/edit" element={<TodoDetailPage />} />
             <Route path="/todos/new" element={<AddTodoPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
