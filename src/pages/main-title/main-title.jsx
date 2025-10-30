import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTriviaContext } from "../../context";
import { Button, Loader } from "../../components/ui";
import "./main-title.css";

const MainTitle = () => {
  const { category } = useParams();
  const {
    allQuestions,
    filteredQuestions,
    categories,
    loading,
    error,
    canLoadQuestions,
    loadQuestions,
    updateFilters,
    resetFilters,
  } = useTriviaContext();

  const [countdown, setCountdown] = useState(0); // Timer state ||
  const intervalRef = useRef(null);

  useEffect(() => {
    if (category) {
      const decodedCategory = decodeURIComponent(category);
      updateFilters({ category: decodedCategory });
    } else {
      resetFilters();
    }
  }, [category, updateFilters, resetFilters]);

  // Countdown!! ||
  useEffect(() => {
    if (!canLoadQuestions && !loading) {
      setCountdown(5);

      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCountdown(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [canLoadQuestions, loading]);

  const currentCategory = category
    ? decodeURIComponent(category)
    : "All Categories";

  return (
    <div className="main-title-page">
      <h1>Trivia Questions</h1>
      <h2>{currentCategory}</h2>

      {loading && <Loader message="Loading trivia questions..." />}

      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && (
        <div className="summary-section">
          <p>Total questions loaded: {allQuestions.length}</p>
          <p>Filtered questions: {filteredQuestions.length}</p>
          <p>Available categories: {categories.length}</p>

          <Button
            onClick={() => loadQuestions({ amount: 50 })}
            disabled={!canLoadQuestions || loading}
          >
            {!canLoadQuestions && !loading && countdown > 0
              ? `Please wait ${countdown} second${countdown !== 1 ? "s" : ""}`
              : "New stream of questions"}
          </Button>

          {filteredQuestions.length > 0 && (
            <div className="table-container">
              <table className="trivia-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Type</th>
                    <th>Question</th>
                    <th>Correct answer</th>
                    <th>Incorrect answers</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((question, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td data-label="Category">{question.category}</td>
                      <td data-label="Difficulty">{question.difficulty}</td>
                      <td data-label="Type">{question.type}</td>
                      <td
                        data-label="Question"
                        dangerouslySetInnerHTML={{ __html: question.question }}
                      />
                      <td
                        data-label="Correct Answer"
                        dangerouslySetInnerHTML={{
                          __html: question.correct_answer,
                        }}
                      />
                      <td data-label="Incorrect Answers">
                        {question.incorrect_answers.map((answer, i) => (
                          <div
                            key={i}
                            className="incorrect-answer"
                            dangerouslySetInnerHTML={{ __html: answer }}
                          />
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainTitle;
