import React, { useState } from 'react';
import { Button, Toolbar,AppBar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth } from '../../context/AuthContext';



const useStyles = makeStyles(theme =>({

    offset: theme.mixins.toolbar, //hace al sitio responsive
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('xxl')]:{ //cuando la pagina este en tamanio xl aparecera el boton que despliega el menu
            display: 'none'
        }
        
    },
    title: {
        flexGrow:1,
        
    },
    appBar:{
        [theme.breakpoints.up('xxl')]:{
            width:`calc(100% - ${240}px)`,
            marginLeft: 240
        }
    }
    

}))


export default function Barra(props) {
    const [error, setError] = useState ('');
    const { logout } = useAuth(); //esta funcion viene de /context/AuthContext

    const handleLogout = async () => {
        try{
            await logout();
        } catch (error){ 
            setError('Server Error')
        }
    }
    const classes = useStyles()

    return (
        
        <AppBar className = { classes.appBar}>
            <Toolbar>
                <IconButton
                    className = {classes.menuButton}
                    color = 'inherit'
                    aria-label = 'menu'
                    onClick = {() => props.accionAbrir()}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    variant='h6'
                    className = {classes.title}
                >
                    Sistema Generador de Oferta Academica
                </Typography>
                
                <div>
                    {error && <p className = 'error' > {error} </p>} 
                </div>
                <Button
                    variant = 'contained'
                    color = 'primary'
                    onClick = {handleLogout}
                >
                    Logout
                </Button>
                
            </Toolbar>
          
        </AppBar>
        
        
    )
}
