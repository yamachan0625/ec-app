import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.grey['300'],
    color: '#000',
    fontSize: 16,
    hight: 48,
    marginBottom: 16,
    wodth: 256,
  },
}));

const GreyButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default GreyButton;
