import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ Component, roles, ...rest }){

    const {user} = useSelector(s => s.account)
    
    return(
        <Route
            {...rest}
            render={(props)=>{
                if(!user){
                    return (<Redirect
                                to={{
                                    pathname: "/login",
                                    state: {from: props.location}
                                }}
                            />)
                }
                if(roles && !roles?.some(r => user.roles?.includes(r)))
                {   

                    return (<Redirect
                        to={{
                            pathname: "/catalog",
                            state: {from: props.location}
                        }}
                    />)
                }

                return <Component {...props} />
            }
            
        }
        />
    )


}