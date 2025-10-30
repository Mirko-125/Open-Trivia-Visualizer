import { useContext } from "react";
import { TriviaContext } from "../context/trivia-context";

export const useTriviaContext = () => {
  const context = useContext(TriviaContext);
  if (!context) {
    throw new Error("useTriviaContext must be used within TriviaProvider");
  }
  return context;
};
