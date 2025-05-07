import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, searchTodos } from '../services/todoService';
import { setTodos, setMeta, setLoading, setError } from '../store/slices/todoSlice';

export const useTodos = (filters = {}, query = '', pagination = {}) => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        dispatch(setLoading(true));

        const allParams = { ...filters, ...pagination };

        const response = query
          ? await searchTodos(query,pagination) 
          : await fetchTodos(allParams); 

        console.log('RESPONSE:', response); 

        if (response.status === 'success') {
          dispatch(setTodos(response.data));
          dispatch(setMeta(response.meta|| null));
          dispatch(setError(null));
        } else {
          dispatch(setError('API başarısız yanıt verdi.'));
        }
      } catch (err) {
        dispatch(setError(err.message || "Todo'lar yüklenemedi"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadTodos();
  }, [dispatch, JSON.stringify(filters), query, JSON.stringify(pagination)]);

  return { todos: items, loading, error };
};