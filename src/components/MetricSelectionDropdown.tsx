import { makeStyles } from '@material-ui/core';
import React from 'react';
import Select from 'react-select';
import { Options } from '../types';

interface IProps {
  onSelectionChange: (val: any) => void;
  value: Options[];
  options: string[];
}

const useStyles = makeStyles({
  select: {
    minWidth: 500,
    color: 'black',
  },
});

const MetricSelectionDropdown = (props: IProps) => {
  const styles = useStyles();
  const { options, onSelectionChange, value } = props;

  return (
    <Select
      options={options.map((metric: string) => ({ label: metric, value: metric }))}
      closeMenuOnSelect={false}
      isMulti
      onChange={onSelectionChange}
      className={styles.select}
      value={value}
    />
  );
};

export default MetricSelectionDropdown;
