import { DistributionChart } from "../../components/ui";
import { useTriviaContext } from "../../context";
import "./distribution-difficulty.css";

const DistributionDifficulty = () => {
  const { allQuestions } = useTriviaContext();

  return (
    <div className="distribution-difficulty">
      <DistributionChart
        questions={allQuestions}
        type="difficulty"
        title="Distribution by difficulty"
      />
    </div>
  );
};

export default DistributionDifficulty;
