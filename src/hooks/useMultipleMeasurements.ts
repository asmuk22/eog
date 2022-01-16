import { gql, useQuery } from '@apollo/client';
import { DateTime } from 'luxon';
import React from 'react';
import { Options } from '../types';

const GET_MEASUREMENTS = gql`
  query ($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        at
        value
        unit
      }
    }
  }
`;

const after = DateTime.now().valueOf() - 1800000;

export function useMultupleMeasurements(metrics: Options[]) {
  const {
    data, loading, subscribeToMore,
  } = useQuery(GET_MEASUREMENTS, {
    variables: {
      input: metrics.map((metric: Options) => ({ metricName: metric.value, after })),
    },
  });

  return React.useMemo(
    () => ({
      data: data?.getMultipleMeasurements || [],
      loading,
      subscribeToMore,
    }),
    [data, loading],
  );
}
