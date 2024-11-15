export interface ChartData {
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

export interface IColumn {
  title: string;
  stage: {
    front: number;
    back: number;
    db: number;
  };
  barWidth: number;
  maxValue: number;
}
