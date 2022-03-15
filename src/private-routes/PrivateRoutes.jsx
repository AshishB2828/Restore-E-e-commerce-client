import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component, ...rest }){

    const {user} = useSelector(s => s.account)
    
    return(
        <Route
            {...rest}
            render={(props)=>
            user ? (
                <component {...props}/>
            ) :(
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            )
        }
        />
    )


}