import { IChartData } from "../interfaces";

export const fetchChartData = async (url: string): Promise<IChartData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Fetch Error");
  }
  const data: IChartData = await response.json();
  return data;
};
