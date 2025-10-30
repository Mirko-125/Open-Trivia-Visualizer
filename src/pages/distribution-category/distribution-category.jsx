import { DistributionChart } from "../../components/ui";
import { useTriviaContext } from "../../context";
import "./distribution-category.css";

const DistributionCategory = () => {
  const { allQuestions, categories } = useTriviaContext();

  return (
    <div className="distribution-category">
      <DistributionChart
        questions={allQuestions}
        type="category"
        title="Distribution by category"
        totalCategories={categories.length}
      />
    </div>
  );
};

export default DistributionCategory;
