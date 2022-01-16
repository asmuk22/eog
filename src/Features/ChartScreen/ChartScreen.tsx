import React from 'react';
import Header from '../../components/Header';
import MetricDataChart from '../../components/MetricDataChart';
import { Options } from '../../types';

const ChartScreen = () => {
  const [selectedMetrics, setSelectedMetrics] = React.useState<Options[]>([]);

  return (
    <>
      <Header onSelectionChange={setSelectedMetrics} selectedMetrics={selectedMetrics} />
      <MetricDataChart selectedMetrics={selectedMetrics} />
    </>
  );
};

export default ChartScreen;
