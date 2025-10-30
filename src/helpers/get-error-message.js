export const getErrorMessage = (code) => {
  const errorMessages = {
    1: "No results found. Try different parameters.",
    2: "Invalid parameter. Please check your request.",
    3: "Token not found.",
    4: "Token empty. Please request a new token.",
  };

  return errorMessages[code] || "An unknown error occurred.";
};

// Again, response codes from Open Trivia DB:
// 0: Success
// 1: No Results
// 2: Invalid Parameter
// 3: Token Not Found
// 4: Token Empty