import React, { useCallback, useMemo, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

import { TextInput } from '../UIkit';

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    height: 48,
    width: 48,
  },
});

const SetSizeArea = (props) => {
  const classes = useStyles();

  const [index, setIndex] = useState(0);
  const [size, setSize] = useState(props.sizes.length);
  const [quantity, setQuantity] = useState(0);

  const inputSize = useCallback((e) => {
    setSize(e.target.value);
  }, []);

  const inputQuantity = useCallback((e) => {
    setQuantity(e.target.value);
  }, []);

  const addSize = (index, size, quantity) => {
    if (size === '' && quantity === '') {
      return;
    }

    if (index === props.sizes.length) {
      props.setSizes((prevState) => [...prevState, { size, quantity }]);
      setSize('');
      setQuantity(0);
      return;
    }

    const newSizes = props.sizes;
    newSizes[index] = { size, quantity };
    props.setSizes(newSizes);
    setIndex(newSizes.length);
    setSize('');
    setQuantity(0);
  };

  const editSize = (index, size, quantity) => {
    setIndex(index);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
    props.setSizes(newSizes);
  };

  React.useEffect(() => {
    setIndex(props.sizes.length);
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell}></TableCell>
              <TableCell className={classes.iconCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => editSize(i, item.size, item.quantity)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteSize(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label={'サイズ'}
            multiline={false}
            required={true}
            rows={1}
            value={size}
            type={'text'}
            onChange={inputSize}
          />
          <TextInput
            fullWidth={false}
            label={'数量'}
            multiline={false}
            required={true}
            rows={1}
            value={quantity}
            type={'number'}
            onChange={inputQuantity}
          />
          <IconButton
            className={classes.checkIcon}
            onClick={() => addSize(index, size, quantity)}
          >
            <CheckCircleIcon />
          </IconButton>
        </div>
      </TableContainer>
    </div>
  );
};

export default SetSizeArea;
