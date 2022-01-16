import { gql } from '@apollo/client';
import { DateTime } from 'luxon';
import React from 'react';
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis,
} from 'recharts';
import { useMultupleMeasurements } from '../hooks/useMultipleMeasurements';
import { Measurement, Metric, Options } from '../types';

const GET_NEW_MEASUREMENTS = gql`
subscription {
  newMeasurement {
    unit
    at
    metric
    value
  }
}
`;

interface IProps {
  selectedMetrics: Options[];
}

function updateData(newFeedItem: Measurement) {
  return ({ metric, measurements }: Metric) => ({
    metric,
    measurements: measurements.concat(metric === newFeedItem.metric ? newFeedItem : []),
  });
}

function some({ metric: name, at }: Measurement) {
  return ({ metric, measurements }: Metric) => (
    name === metric && measurements[measurements.length - 1].at !== at
  );
}

function updateQuery(prev: any, { subscriptionData }: any) {
  if (!subscriptionData.data) return prev;
  const { getMultipleMeasurements } = prev;

  const { newMeasurement } = subscriptionData.data;
  if (getMultipleMeasurements?.some(some(newMeasurement))) {
    const newMeasurements = getMultipleMeasurements?.map(updateData(newMeasurement));
    return { getMultipleMeasurements: newMeasurements };
  }
  return prev;
}

function getLines({ metric, measurements }: Metric) {
  return (
    <Line dataKey="value" data={measurements} name={metric} key={metric} dot={false} />
  );
}

const MetricDataChart = (props: IProps) => {
  const { selectedMetrics } = props;

  const { data, subscribeToMore } = useMultupleMeasurements(selectedMetrics);

  React.useEffect(() => {
    subscribeToMore({
      document: GET_NEW_MEASUREMENTS,
      updateQuery,
    });
  }, []);

  const details = data.map(getLines);

  return (
    <ResponsiveContainer width="95%" height="80%">
      <LineChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="at"
          allowDuplicatedCategory={false}
          type="category"
          tickFormatter={
            (value: number) => DateTime.fromJSDate(new Date(value)).toFormat('HH:mm')
          }
        />
        <YAxis dataKey="value" />
        {details}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MetricDataChart;
