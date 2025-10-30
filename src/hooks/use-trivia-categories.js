import { useState, useRef, useCallback } from "react";
import { fetchTriviaCategories } from "../services";
import { decodeHTMLEntities } from "../helpers";

export const useTriviaCategories = () => {
  const [categories, setCategories] = useState([]);
  const lastRequestTime = useRef(0);

  const loadCategories = useCallback(async () => {
    try {
      const cats = await fetchTriviaCategories();
      const decodedCats = cats.map((cat) => ({
        ...cat,
        name: decodeHTMLEntities(cat.name),
      }));

      setCategories(decodedCats);
      lastRequestTime.current = Date.now();

      return decodedCats;
    } catch (err) {
      console.error("Failed to load categories:", err);
      return [];
    }
  }, []);

  return {
    categories,
    loadCategories,
  };
};
