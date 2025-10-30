import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./distribution-chart.css";

const DistributionChart = ({
  questions = [],
  type = "category",
  title = "",
  totalCategories = 0,
}) => {
  const chartData = useMemo(() => {
    if (!questions || questions.length === 0) {
      return [];
    }

    const countMap = {};

    questions.forEach((question) => {
      const key = type === "category" ? question.category : question.difficulty;

      if (key) {
        countMap[key] = (countMap[key] || 0) + 1;
      }
    });

    const data = Object.entries(countMap).map(([name, count]) => ({
      name,
      count,
    }));

    data.sort((a, b) => a.name.localeCompare(b.name));

    const dataWithIndex = data.map((item, index) => ({
      ...item,
      index: index + 1,
      fullName: item.name,
    }));

    return dataWithIndex;
  }, [questions, type]);

  const chartTitle = useMemo(
    () =>
      title ||
      `Distribution by ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    [title, type]
  );

  const yAxisConfig = useMemo(() => {
    const totalQuestions = questions.length;
    const yAxisMax = Math.ceil(totalQuestions / 5) * 5;
    const ticks = Array.from(
      { length: Math.floor(yAxisMax / 5) + 1 },
      (_, i) => i * 5
    );

    return { yAxisMax, ticks };
  }, [questions.length]);

  const chartWidth = useMemo(() => {
    const dataPointsCount = chartData.length;

    if (dataPointsCount <= 5) {
      return "40%";
    }

    if (dataPointsCount <= 10) {
      return "50%";
    }

    return "75%";
  }, [chartData.length]);

  const chartMargins = useMemo(() => {
    if (window.innerWidth <= 768) {
      return {
        top: 80,
        right: 10,
        left: 40,
        bottom: 60,
      };
    }
    return {
      top: 60,
      right: 30,
      left: 20,
      bottom: 60,
    };
  }, []);

  return (
    <div className="distribution-chart" style={{ width: chartWidth }}>
      <h2 className="chart-title">{chartTitle}</h2>

      {chartData.length === 0 ? (
        <p className="no-data-message">
          No data available to display. Please load questions first.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={chartData} margin={chartMargins} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" strokeWidth={0.5} />

            <XAxis
              dataKey="index"
              label={{
                value: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
                position: "bottom",
                fill: "#777",
                style: { fontSize: 12 },
                offset: 0,
              }}
              tick={{ fill: "#777", fontSize: 11 }}
              interval={0}
            />

            <YAxis
              label={{
                value: "No. of questions",
                angle: -90,
                position: "insideLeft",
                fill: "#777",
                style: { fontSize: 12, textAnchor: "middle" },
              }}
              domain={[0, yAxisConfig.yAxisMax]}
              ticks={yAxisConfig.ticks}
              tick={{ fill: "#777", fontSize: 11 }}
              width={50}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "12px",
                fontFamily: "JetBrains Mono, monospace",
              }}
              labelStyle={{ fontWeight: "bold", marginBottom: "8px" }}
              formatter={(value) => {
                return [value, "Question count"];
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload.length > 0) {
                  const item = payload[0].payload;
                  return `#${item.index}: ${item.fullName}`;
                }
                return label;
              }}
            />

            <Legend
              wrapperStyle={{
                paddingBottom: "25px",
                fontSize: "12px",
              }}
              iconType="square"
              verticalAlign="top"
            />

            <Bar
              dataKey="count"
              fill="#6243a1"
              name="Question count"
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {chartData.length > 0 && (
        <div className="chart-summary">
          <p>
            <strong>Total questions:</strong> {questions.length}
          </p>
          <p>
            <strong>
              {type === "category" ? "Non-zero categories:" : "Difficulties:"}
            </strong>{" "}
            {type === "category" && totalCategories > 0
              ? `${chartData.length} / ${totalCategories}`
              : chartData.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default DistributionChart;
