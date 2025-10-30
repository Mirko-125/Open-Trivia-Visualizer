import { createContext, useState, useEffect, useRef, useCallback } from "react";
import { filterQuestions, createEmptyFilters } from "../helpers";
import { useTriviaQuestions, useTriviaCategories } from "../hooks";

export const TriviaContext = createContext();

export const TriviaProvider = ({ children }) => {
  // Trivia data state manager ||
  const {
    questions: allQuestions,
    loading,
    error,
    canLoadQuestions,
    loadQuestions,
  } = useTriviaQuestions();

  const { categories, loadCategories } = useTriviaCategories();
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filters, setFilters] = useState(createEmptyFilters());
  const hasInitialized = useRef(false);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const applyFilters = useCallback(() => {
    const filtered = filterQuestions(allQuestions, filters);
    setFilteredQuestions(filtered);
  }, [allQuestions, filters]);

  const resetFilters = useCallback(() => {
    setFilters(createEmptyFilters());
  }, []);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeData = async () => {
      await loadCategories();
      loadQuestions();
    };

    initializeData();
  }, [loadCategories, loadQuestions]); // or []? ||

  useEffect(() => {
    applyFilters();
  }, [filters, allQuestions, applyFilters]);

  const value = {
    allQuestions,
    filteredQuestions,
    categories,

    loading,
    error,
    filters,
    canLoadQuestions,

    loadQuestions,
    updateFilters,
    applyFilters,
    resetFilters,
  };

  return (
    <TriviaContext.Provider value={value}>{children}</TriviaContext.Provider>
  );
};
