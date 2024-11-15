import { ChartData } from "../interfaces";

export const fetchChartData = async (url: string): Promise<ChartData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Fetch Error");
  }
  const data: ChartData = await response.json();
  return data;
};
