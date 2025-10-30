import { getErrorMessage } from "../helpers";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_AMOUNT = import.meta.env.VITE_API_DEFAULT_AMOUNT;

export const fetchTriviaQuestions = async (params = {}) => { 
  // Single source of truth || 
  const { 
    amount = DEFAULT_AMOUNT, 
    category = "", 
    difficulty = "", 
    type = "" 
  } = params;

  const queryParams = new URLSearchParams({
    amount: amount.toString(),
  });

  if (category) queryParams.append("category", category);
  if (difficulty) queryParams.append("difficulty", difficulty);
  if (type) queryParams.append("type", type);

  const url = `${API_BASE_URL}/api.php?${queryParams}`;

  try {
    const response = await fetch(url);

    if (response.status === 429) {
      throw new Error("429: Too many requests. Please wait 5 seconds and try again.");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Response codes from Open Trivia DB:
    // 0: Success
    // 1: No Results
    // 2: Invalid Parameter
    // 3: Token Not Found
    // 4: Token Empty
    if (data.response_code !== 0) {
      throw new Error(getErrorMessage(data.response_code));
    }

    return data.results;
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    throw error;
  }
};

export const fetchTriviaCategories = async () => {
  const url = `${API_BASE_URL}/api_category.php`;

  try {
    const response = await fetch(url);

    if (response.status === 429) {
      throw new Error("429: Too many requests. Please wait 5 seconds and try again.");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
