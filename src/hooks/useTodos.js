import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../services/todoService';
import { setTodos, setLoading, setError } from '../store/slices/todoSlice';

export const useTodos = (params = {}) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetchTodos(params);

       
        if (response.status === 'success') {
          dispatch(setTodos(response.data)); 
        } else {
          dispatch(setError('API başarısız yanıt verdi.'));
        }

      } catch (err) {
        console.error('Todo çekme hatası:', err);
        dispatch(setError(err.message || "Todo'lar yüklenemedi"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadTodos();
  }, [dispatch, JSON.stringify(params)]); 

  return { todos: items, loading, error };
};