import { TOTAL_BAR_HEIGHT } from "../constants";

export const calculateHeight = (value: number, maxValue: number): number =>
  (value / maxValue) * TOTAL_BAR_HEIGHT;
