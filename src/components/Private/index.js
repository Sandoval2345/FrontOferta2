import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


export default function PrivateRoute({ component: Component, ...rest}) {
    const { currentUser } = useAuth(); //usuario actual, se obtiene desde useAuth
    return (
        <Route
            {...rest}
            render={props =>{
                //Existe un usuario? si es que existe retorno Componen, en caso contrario retorno una redireccion a login
                return currentUser ? <Component {...props}/> :<Redirect to='/login'/>
            }}
        >
            
        </Route>
    )
}
