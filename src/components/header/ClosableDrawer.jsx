import React, { useCallback, useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../reducks/users/operations';
import { TextInput } from '../UIkit';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { db } from '../../firebase';
// import { getUserRole } from '../../reducks/users/selectors';

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 256,
        flexShrink: 0,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 256,
    },
    searchField: {
      alignItems: 'center',
      display: 'flex',
      marginLeft: 32,
    },
  })
);

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const { container, open, onClose } = props;
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');
  const inputKeyword = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  const selectMenu = React.useCallback(
    (e, path) => {
      dispatch(push(path));
      onClose(e);
    },
    [onClose]
  );

  const menus = React.useMemo(
    () => [
      {
        func: selectMenu,
        label: '商品登録',
        icon: <AddCircleIcon />,
        id: 'register',
        value: '/product/edit',
      },
      {
        func: selectMenu,
        label: '注文履歴',
        icon: <HistoryIcon />,
        id: 'history',
        value: '/order/history',
      },
      {
        func: selectMenu,
        label: 'プロフィール',
        icon: <PersonIcon />,
        id: 'profile',
        value: '/user/mypage',
      },
    ],
    [selectMenu]
  );

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={open}
        onClose={(e) => onClose(e)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div onClose={(e) => onClose(e)}>
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={'キーワードを入力'}
              multiline={false}
              required={true}
              rows={1}
              value={keyword}
              type={'text'}
              onChange={inputKeyword}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout">
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                primary={'Logout'}
                onClick={() => dispatch(signOut())}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
