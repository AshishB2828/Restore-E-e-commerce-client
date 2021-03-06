import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../store/slices/accountSlice';
import { clearBasket } from '../store/slices/basketSlice';
import { Link } from 'react-router-dom';

export default function SignedInMenu() {

    const dispatch = useDispatch();
    const {user} = useSelector(s => s.account);
    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        color='inherit'
      >
        {user?.email}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to="/orders">My Orders</MenuItem>
        <MenuItem onClick={()=> {
          dispatch(clearBasket())
          dispatch(signOut())}}>Logout</MenuItem>
      </Menu>
    </div>
  );
}