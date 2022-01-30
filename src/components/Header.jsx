import { AppBar, List, Toolbar, Typography, ListItem, IconButton, Badge } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBag } from '@mui/icons-material'

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

                    <IconButton>
                        <Badge badgeContent={4} color='secondary'>
                            <ShoppingBag />
                        </Badge>
                    </IconButton>

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

            </Toolbar>
        </AppBar>
    )
};

export default Header;
