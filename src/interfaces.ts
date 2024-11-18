export interface IChartData {
  title: string;
  dev: {
    front: number;
    back: number;
    db: number;
  };
  test: {
    front: number;
    back: number;
    db: number;
  };
  prod: {
    front: number;
    back: number;
    db: number;
  };
  norm: number;
}

export interface IColumnProps {
  title: string;
  stage: {
    front: number;
    back: number;
    db: number;
  };
  barWidth: number;
  maxValue: number;
  setColHeight: (value: React.SetStateAction<IColHeights>) => void;
}

export interface IColHeights {
  devHeight: number;
  testHeight: number;
  prodHeight: number;
}

export interface INormColumn {
  title: string;
  norm: number;
  maxValue: number;
  barWidth: number;
}

export interface IArrow {
  difference: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface ILine {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}
