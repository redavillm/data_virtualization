import React, { useEffect, useState } from "react";
import { IChartData, IColHeights } from "../../interfaces";
import "./BarChart.css";
import { fetchChartData } from "../../utilities/fetchData";
import {
  BAR_GAPS,
  COLORS,
  TOTAL_BAR_HEIGHT,
  TOTAL_BAR_WIDTH,
} from "../../constants";
import { Arrow } from "../Arrow/Arrow";
import { Column } from "../Column/Colum";
import { NormColum } from "../NormColumn/NormColumn";

const BarChart: React.FC<{ url: string }> = ({ url }) => {
  const [data, setData] = useState<IChartData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  const [colHeights, setColHeights] = useState<IColHeights>({
    devHeight: 0,
    testHeight: 0,
    prodHeight: 0,
  });

  useEffect(() => {
    setLoading(true);
    fetchChartData(url)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const { title, dev, test, prod, norm } = data;

  const maxValue = Math.max(
    dev.front + dev.back + dev.db,
    test.front + test.back + test.db,
    prod.front + prod.back + prod.db,
    norm
  );

  const calculateDifference = (num1: number, num2: number) => {
    return Math.abs(num1 - num2);
  };

  const devTestDif = calculateDifference(
    dev.front + dev.back + dev.db,
    test.front + test.back + test.db
  );

  const testProdDif = calculateDifference(
    test.front + test.back + test.db,
    prod.front + prod.back + prod.db
  );

  const chartWidth = 4 * TOTAL_BAR_WIDTH + BAR_GAPS * 3;
  const chartHeight = TOTAL_BAR_HEIGHT + 40;

  return (
    <div className="bar">
      <h3>Количество пройденных тестов "{title}"</h3>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width={TOTAL_BAR_WIDTH * 7}
        height={TOTAL_BAR_HEIGHT + 200}
      >
        <Arrow
          difference={devTestDif}
          startX={TOTAL_BAR_WIDTH / 2}
          startY={colHeights.devHeight - 10}
          endX={TOTAL_BAR_WIDTH * 1.5 + BAR_GAPS - 10}
          endY={colHeights.testHeight - 10}
        />
        <Arrow
          difference={testProdDif}
          startX={TOTAL_BAR_WIDTH * 1.5 + BAR_GAPS + 10}
          startY={colHeights.testHeight - 10}
          endX={TOTAL_BAR_WIDTH * 2.5 + BAR_GAPS * 2 - 10}
          endY={colHeights.prodHeight - 10}
        />
        <Column
          title={"dev"}
          stage={dev}
          barWidth={0}
          maxValue={maxValue}
          setColHeight={setColHeights}
        />
        <Column
          title={"test"}
          stage={test}
          barWidth={TOTAL_BAR_WIDTH + BAR_GAPS}
          maxValue={maxValue}
          setColHeight={setColHeights}
        />
        <Column
          title={"prod"}
          stage={prod}
          barWidth={2 * (TOTAL_BAR_WIDTH + BAR_GAPS)}
          maxValue={maxValue}
          setColHeight={setColHeights}
        />
        <NormColum
          title={title}
          norm={norm}
          maxValue={maxValue}
          barWidth={3 * (TOTAL_BAR_WIDTH + BAR_GAPS)}
        />
      </svg>
      <div className="bar_legend_container">
        <div className="bar_legend_item">
          <span
            className="bar_legend_icon"
            style={{ backgroundColor: COLORS.FRONT }}
          ></span>
          <p>Клиентская часть</p>
        </div>
        <div className="bar_legend_item">
          <span
            className="bar_legend_icon"
            style={{ backgroundColor: COLORS.BACK }}
          ></span>
          <p>Серверная часть</p>
        </div>
        <div className="bar_legend_item">
          <span
            className="bar_legend_icon"
            style={{ backgroundColor: COLORS.DB }}
          ></span>
          <p>База данных</p>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
