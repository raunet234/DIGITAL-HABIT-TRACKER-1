// src/hooks/useHabits.js

import { useCallback } from 'react';
import { get, set } from 'idb-keyval';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { saveData, loadData } from '../services/localCacheService';

const STORAGE_KEY = 'habits';

/**
 * Manages habits: load from cache, add, delete, and log completions.
 */
export function useHabits() {
  const queryClient = useQueryClient();

  // 1) Fetch habits from IndexedDB (via idb-keyval), fallback to localStorage
  const {
    data: habits = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      const stored = await get(STORAGE_KEY);
      if (stored) return stored;
      const backup = loadData(STORAGE_KEY);
      return backup ?? [];
    },
    suspense: false,
    retry: false,
  });

  // 2) Mutation to persist any change back to storage
  const mutation = useMutation({
    mutationFn: async (newHabits) => {
      await set(STORAGE_KEY, newHabits);
      saveData(STORAGE_KEY, newHabits);
      return newHabits;
    },
    onSuccess: (newHabits) => {
      // update the cache so UI is instant
      queryClient.setQueryData({ queryKey: ['habits'] }, newHabits);
    },
  });

  // 3) Action: add a new habit
  const addHabit = useCallback(
    (title) => {
      const next = [...habits, { id: Date.now(), title, logs: [] }];
      mutation.mutate(next);
    },
    [habits, mutation]
  );

  // 4) Action: remove a habit by its id
  const removeHabit = useCallback(
    (id) => {
      const next = habits.filter((h) => h.id !== id);
      mutation.mutate(next);
    },
    [habits, mutation]
  );

  // 5) Action: log a completion (append timestamp to logs array)
  const logHabit = useCallback(
    (id) => {
      const next = habits.map((h) =>
        h.id === id ? { ...h, logs: [...h.logs, Date.now()] } : h
      );
      mutation.mutate(next);
    },
    [habits, mutation]
  );

  return {
    habits,
    isLoading,
    isError,
    error,
    addHabit,
    removeHabit,
    logHabit,
  };
}
