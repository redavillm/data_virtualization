import React, { useEffect, useState } from "react";
import { ChartData } from "../interfaces";
import "./BarChart.css";
import { fetchChartData } from "../utilities/fetchData";
import { BAR_GAPS, TOTAL_BAR_HEIGHT, TOTAL_BAR_WIDTH } from "../constants";
import { NormColum } from "./NormColumn";
import { Column } from "./Colum";

interface Props {
  url: string;
}

const BarChart: React.FC<Props> = ({ url }) => {
  const [data, setData] = useState<ChartData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);

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

  // 1. {norm: 150, maxValue: 197, barHeight: 228.4263959390863, position: 71.57360406091371}
  // 2. {norm: 10, maxValue: 37, barHeight: 81.08108108108108, position: 218.9189189189189}
  // 3. {norm: 60, maxValue: 60, barHeight: 300, position: 0}
  // 4. {norm: 500000, maxValue: 1900001, barHeight: 78.94732686982796, position: 221.05267313017202}

  // const devTotal = dev.front + dev.back + dev.db;
  // const testTotal = test.front + test.back + test.db;
  // const prodTotal = prod.front + prod.back + prod.db;

  // const devToTestDiff = testTotal - devTotal;
  // const testToProdDiff = prodTotal - testTotal;

  const maxValue = Math.max(
    dev.front + dev.back + dev.db,
    test.front + test.back + test.db,
    prod.front + prod.back + prod.db,
    norm
  );

  const chartWidth = 4 * (TOTAL_BAR_WIDTH + BAR_GAPS);
  const chartHeight = TOTAL_BAR_HEIGHT + 40;

  return (
    <div className="bar">
      <h3>Количество пройденных тестов "{title}"</h3>
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width={TOTAL_BAR_WIDTH * 7}
        height={TOTAL_BAR_HEIGHT + 40}
      >
        <Column title={"dev"} stage={dev} barWidth={0} maxValue={maxValue} />
        <Column
          title={"test"}
          stage={test}
          barWidth={TOTAL_BAR_WIDTH + BAR_GAPS}
          maxValue={maxValue}
        />
        <Column
          title={"prod"}
          stage={prod}
          barWidth={2 * (TOTAL_BAR_WIDTH + BAR_GAPS)}
          maxValue={maxValue}
        />
        <NormColum
          title={title}
          norm={norm}
          maxValue={maxValue}
          barWidth={3 * (TOTAL_BAR_WIDTH + BAR_GAPS)}
        />
      </svg>
      <svg
        width="135"
        height="105"
        viewBox="0 0 135 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="47" width="48" height="24" rx="12" fill="#FC440F" />
        <path
          d="M69.8477 13.5342H65.999V11.9414H69.8477V13.5342ZM78.1738 17H71.3516V15.6465L74.5713 12.2148C75.0133 11.7318 75.3392 11.3102 75.5488 10.9502C75.763 10.5902 75.8701 10.2484 75.8701 9.9248C75.8701 9.48275 75.7585 9.13639 75.5352 8.88574C75.3118 8.63053 74.9928 8.50293 74.5781 8.50293C74.1315 8.50293 73.7783 8.65788 73.5186 8.96777C73.2633 9.27311 73.1357 9.67643 73.1357 10.1777H71.1533C71.1533 9.57161 71.2969 9.0179 71.584 8.5166C71.8757 8.0153 72.2858 7.62337 72.8145 7.34082C73.3431 7.05371 73.9424 6.91016 74.6123 6.91016C75.6377 6.91016 76.4329 7.15625 76.998 7.64844C77.5677 8.14062 77.8525 8.83561 77.8525 9.7334C77.8525 10.2256 77.7249 10.7269 77.4697 11.2373C77.2145 11.7477 76.777 12.3424 76.1572 13.0215L73.8945 15.4072H78.1738V17ZM84.75 6.94434V8.57129H84.5586C83.6654 8.58496 82.9453 8.81738 82.3984 9.26855C81.8561 9.71973 81.5303 10.3464 81.4209 11.1484C81.9495 10.6107 82.6172 10.3418 83.4238 10.3418C84.2897 10.3418 84.9779 10.6517 85.4883 11.2715C85.9987 11.8913 86.2539 12.707 86.2539 13.7188C86.2539 14.3659 86.1126 14.9515 85.8301 15.4756C85.5521 15.9997 85.1556 16.4076 84.6406 16.6992C84.1302 16.9909 83.5514 17.1367 82.9043 17.1367C81.8561 17.1367 81.0085 16.7721 80.3613 16.043C79.7188 15.3138 79.3975 14.3408 79.3975 13.124V12.4131C79.3975 11.333 79.6003 10.3805 80.0059 9.55566C80.416 8.72624 81.0016 8.08594 81.7627 7.63477C82.5283 7.17904 83.4147 6.94889 84.4219 6.94434H84.75ZM82.8223 11.9277C82.5033 11.9277 82.2139 12.012 81.9541 12.1807C81.6943 12.3447 81.5029 12.5635 81.3799 12.8369V13.4385C81.3799 14.0993 81.5098 14.6165 81.7695 14.9902C82.0293 15.3594 82.3939 15.5439 82.8633 15.5439C83.2871 15.5439 83.6289 15.3776 83.8887 15.0449C84.153 14.7077 84.2852 14.2725 84.2852 13.7393C84.2852 13.1969 84.153 12.7594 83.8887 12.4268C83.6243 12.0941 83.2689 11.9277 82.8223 11.9277Z"
          fill="white"
        />
        <path
          d="M59.0025 17L59.0924 17C59.1883 16.9954 59.2828 16.9752 59.3722 16.94C59.4407 16.9133 59.5047 16.8762 59.562 16.83C59.6076 16.8035 59.651 16.7734 59.6919 16.74L62.6894 13.88C62.7845 13.7894 62.8609 13.6809 62.9141 13.5608C62.9674 13.4406 62.9964 13.3111 62.9997 13.1797C63.0063 12.9144 62.9072 12.6573 62.7244 12.465C62.5415 12.2727 62.2898 12.161 62.0247 12.1544C61.7596 12.1479 61.5027 12.247 61.3105 12.43L60.0016 13.66L60.0016 8C60.0016 7.73478 59.8964 7.48043 59.709 7.29289C59.5216 7.10536 59.2675 7 59.0025 7C58.7375 7 58.4833 7.10536 58.2959 7.29289C58.1086 7.48043 58.0033 7.73478 58.0033 8L58.0033 13.59L56.7144 12.29C56.6215 12.1963 56.511 12.1219 56.3892 12.0711C56.2675 12.0203 56.1369 11.9942 56.005 11.9942C55.8731 11.9942 55.7425 12.0203 55.6207 12.0711C55.4989 12.1219 55.3884 12.1963 55.2956 12.29C55.2019 12.383 55.1276 12.4936 55.0768 12.6154C55.0261 12.7373 55 12.868 55 13C55 13.132 55.0261 13.2627 55.0768 13.3846C55.1276 13.5064 55.2019 13.617 55.2956 13.71L58.2931 16.71C58.3851 16.7999 58.4937 16.8713 58.6128 16.92C58.736 16.9725 58.8685 16.9997 59.0025 17Z"
          fill="white"
        />
        <line
          x1="0.5"
          y1="73.5"
          x2="0.500003"
          y2="12.5"
          stroke="#898290"
          stroke-linecap="round"
        />
        <line
          x1="0.5"
          y1="12.5"
          x2="45.5"
          y2="12.5"
          stroke="#898290"
          stroke-linecap="round"
        />
        <line
          x1="96.5"
          y1="12.5"
          x2="131.5"
          y2="12.5"
          stroke="#898290"
          stroke-linecap="round"
        />
        <line
          x1="131.5"
          y1="12.5"
          x2="131.5"
          y2="103.5"
          stroke="#898290"
          stroke-linecap="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M131.025 103.367H131.975L134.189 101.14C134.374 100.953 134.675 100.953 134.861 101.14C135.046 101.327 135.046 101.63 134.861 101.816L131.836 104.86C131.65 105.047 131.35 105.047 131.164 104.86L128.139 101.816C127.954 101.63 127.954 101.327 128.139 101.14C128.325 100.953 128.626 100.953 128.811 101.14L131.025 103.367Z"
          fill="#898290"
        />
      </svg>
    </div>
  );
};

export default BarChart;
