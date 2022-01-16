export type Options = {
  label: string;
  value: string;
};

export type Measurement = {
  metric: string;
  value: number;
  at: number;
};

export type Metric = {
  metric: string;
  measurements: Measurement[];
};
