import { useState, useRef, useCallback } from "react";
import { fetchTriviaQuestions } from "../services";
import { decodeHTMLEntities } from "../helpers";

const MIN_REQUEST_INTERVAL = 5000;

export const useTriviaQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [canLoadQuestions, setCanLoadQuestions] = useState(true);
  const lastRequestTime = useRef(0);

  const loadQuestions = useCallback(async (params = {}) => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime.current;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL && lastRequestTime.current !== 0) {
      const waitTime = Math.ceil((MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000);
      console.log(`Please wait ${waitTime} more seconds before requesting new questions`);
      return;
    }

    setLoading(true);
    setError(null);
    setCanLoadQuestions(false); // Disable button immediately ||

    try {
      const fetchedQuestions = await fetchTriviaQuestions(params);

      const decodedQuestions = fetchedQuestions.map((q) => ({
        ...q,
        category: decodeHTMLEntities(q.category),
        question: decodeHTMLEntities(q.question),
        correct_answer: decodeHTMLEntities(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decodeHTMLEntities),
      }));

      setQuestions(decodedQuestions);
      lastRequestTime.current = Date.now();

      setTimeout(() => {
        setCanLoadQuestions(true); // Re-enable button after 5 seconds ||
      }, MIN_REQUEST_INTERVAL);

      return decodedQuestions;
    } catch (err) {
      if (err.message.includes("429")) {
        setError("Rate limit exceeded by API. Please wait a moment and try again.");
      } else {
        setError(err.message);
      }
      setQuestions([]);
      
      // Re-enable button after 5 seconds even on error ||
      setTimeout(() => {
        setCanLoadQuestions(true);
      }, MIN_REQUEST_INTERVAL);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    questions,
    loading,
    error,
    canLoadQuestions,
    loadQuestions,
  };
};
