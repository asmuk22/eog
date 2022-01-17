import { gql } from '@apollo/client';
import { CircularProgress, Typography, makeStyles } from '@material-ui/core';
import { DateTime } from 'luxon';
import React from 'react';
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { useMultupleMeasurements } from '../hooks/useMultipleMeasurements';
import { Measurement, Metric, Options } from '../types';
import MetricData from './MetricData';

const useStyles = makeStyles({
  box: {
    width: '100vw',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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

const strokeColor = ['red', 'green', 'blue', 'azure', 'orange', 'yellow'];

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

function updateQuery({ getMultipleMeasurements }: any, { subscriptionData }: any) {
  if (!subscriptionData.data) return { getMultipleMeasurements };

  const { newMeasurement } = subscriptionData.data;
  if (getMultipleMeasurements?.some(some(newMeasurement))) {
    const newMeasurements = getMultipleMeasurements?.map(updateData(newMeasurement));
    return { getMultipleMeasurements: newMeasurements };
  }
  return { getMultipleMeasurements };
}

function getLines({ metric, measurements }: Metric, index: number) {
  return (
    <Line dataKey="value" data={measurements} name={metric} key={metric} dot={false} stroke={strokeColor[index]} />
  );
}

const MetricDataChart = (props: IProps) => {
  const styles = useStyles();
  const { selectedMetrics } = props;

  const { data, loading, subscribeToMore } = useMultupleMeasurements(selectedMetrics);

  React.useEffect(() => {
    subscribeToMore({
      document: GET_NEW_MEASUREMENTS,
      updateQuery,
    });
  }, []);

  const details = data.map(getLines);

  if (loading) {
    return (
      <div className={styles.box}>
        <CircularProgress />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={styles.box}>
        <Typography>
          Select a metric to proceed
        </Typography>
      </div>
    );
  }

  return (
    <>
      <MetricData data={data} strokeColor={strokeColor} />
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
          <Tooltip />
          {details}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default React.memo(MetricDataChart);
