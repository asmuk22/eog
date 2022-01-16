import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelectionDropdown from './MetricSelectionDropdown';
import { useMetrics } from '../hooks/useMetrics';
import { Options } from '../types';

interface IProps {
  onSelectionChange: (val: Options[]) => void;
  selectedMetrics: Options[];
}

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

export default (props: IProps) => {
  const classes = useStyles();
  const metrics = useMetrics();

  const { onSelectionChange, selectedMetrics } = props;

  const name = "AshwinKumar's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} EOG React Visualization Assessment
        </Typography>
        <MetricSelectionDropdown
          options={metrics}
          onSelectionChange={onSelectionChange}
          value={selectedMetrics}
        />
      </Toolbar>
    </AppBar>
  );
};
