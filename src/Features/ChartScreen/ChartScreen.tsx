import React from 'react';
import Header from '../../components/Header';
import { Options } from '../../types';

const ChartScreen = () => {
  const [selectedMetrics, setSelectedMetrics] = React.useState<Options[]>([]);

  return (
    <Header onSelectionChange={setSelectedMetrics} selectedMetrics={selectedMetrics} />
  );
};

export default ChartScreen;
