import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_METRICS = gql`
  query {
    getMetrics
  }
`;

export function useMetrics() {
  const { data } = useQuery(GET_METRICS);

  return React.useMemo(
    () => data?.getMetrics || [],
    [data],
  );
}
