import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Measurement, Metric } from '../types';

interface IProps {
  data: Metric[];
  strokeColor: string[];
}

const useStyles = makeStyles({
  box: {
    height: 50,
    display: 'flex',
    margin: '10px 20px',
  },
  card: {
    padding: 10,
    opacity: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});

function getValue(measurements: Measurement[]) {
  return measurements[measurements.length - 1].value;
}

const MetricData = (props: IProps) => {
  const { data, strokeColor } = props;

  const classes = useStyles();

  const getMeasurementCard = ({ metric, measurements }: Metric, index: number) => (
    <div
      className={classes.card}
      style={{ background: strokeColor[index] }}
      key={metric}
    >
      {metric}: {getValue(measurements)}
    </div>
  );

  return (
    <div className={classes.box}>
      {data.map(getMeasurementCard)}
    </div>
  );
};

export default React.memo(MetricData);
