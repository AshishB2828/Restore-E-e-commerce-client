import { AppBar, List, Toolbar, Typography, ListItem, IconButton, Badge } from '@mui/material';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag } from '@mui/icons-material'
import { useSelector } from 'react-redux';
import SignedInMenu from './SignedInMenu';

const middleLinks = [
    {title: 'catalog', path :'/catalog'},
    {title: 'about', path :'/about'},
    {title: 'contact', path :'/contact'},
]

const rightLinks = [
    {title: 'login', path:'/login'},
    {title: 'register', path :'/register'},

]


const Header = () => {
    const {basket} = useSelector(state => state.basket);
    const { user } = useSelector(s => s.account);
    const itemCount = basket?.items.reduce((sum , item) => sum + item.quantity, 0)

    return(
        <AppBar position='static' sx={{mb:4}}>
            <Toolbar>
                <Typography variant='h6' component={NavLink} to='/'>
                    STORE
                </Typography>

                <List sx={{display: 'flex'}}>
                    {
                        middleLinks.map(i=>(
                            <ListItem 
                                component={NavLink}
                                to={i.path}
                                key={i.path}

                            >
                                {i.title.toUpperCase()}
                            </ListItem>
                        ))
                    }
                </List>

                    <IconButton component={Link} to='/basket'>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingBag />
                        </Badge>
                    </IconButton>
                {
                    user ? <SignedInMenu />:(

                        <List sx={{display: 'flex'}}>
                        {
                            rightLinks.map(i=>(
                                <ListItem 
                                    component={NavLink}
                                    to={i.path}
                                    key={i.path}
    
                                >
                                    {i.title.toUpperCase()}
                                </ListItem>
                            ))
                        }
                    </List>

                    )

                }

            </Toolbar>
        </AppBar>
    )
};

export default Header;
