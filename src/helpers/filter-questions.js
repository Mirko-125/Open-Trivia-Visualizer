export const filterQuestions = (questions, filters) => {
  let filtered = [...questions];

  if (filters.category) {
    filtered = filtered.filter((q) => q.category === filters.category);
  }

  if (filters.difficulty) {
    filtered = filtered.filter((q) => q.difficulty === filters.difficulty);
  }

  // Type filtering for the future features ||
  if (filters.type) {
    filtered = filtered.filter((q) => q.type === filters.type);
  }

  // Search option for the future features ||
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (q) =>
        q.question.toLowerCase().includes(searchLower) ||
        q.category.toLowerCase().includes(searchLower) ||
        q.correct_answer.toLowerCase().includes(searchLower)
    );
  }
  return filtered;
};

export const createEmptyFilters = () => ({
  category: "",
  difficulty: "",
  type: "",
  searchTerm: "",
});
