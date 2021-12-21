import React, { useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Grid, Container, Paper, Avatar, Typography, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ListItemText } from '@mui/material'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';

const useStyles = makeStyles(theme=>({
  
    text:{
        textAlign : 'center',
        marginTop: theme.spacing(30),
        color: 'white'
    },
    root:{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
        
    },
    container:{
        opacity: '0.8',
        height: '70%', //largo del contenedor
        marginTop: theme.spacing(20), //altura del contenedor
        [theme.breakpoints.down(400 + theme.spacing(2)+2)]:{ //responsive
            marginTop: 0,
            width: '100%',
            height: '100%'
        }
    },
    div:{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',


    },
    avatar:{
        margin: theme.spacing(6),
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
       
    },
    form:{
        width: '100%',
        marginTop: theme.spacing(1)
    },
    button:{
        margin: theme.spacing(3, 0, 2) //mrgen general
        
    },
    input:{
        flex: 20, 
        padding: 8, 
        marginLeft: 85,
        marginTop: 5, 
        fontSize: 18, 
        borderWidth: 1,  
        justifyContent: 'flex-start'
    },
  
    
 
    
  }))

export default function ForgotPassword() {
    
    const classes = useStyles()
    const emailRef = useRef();
    const { resetPassword } = useAuth(); //esta funcion viene de /context/AuthContext
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            setMessage('');
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Revisa la bandeja de entrada en el email que proporcionaste')
            setTimeout(()=> setError(''), 2500)
        } catch{
            setError('Fallo al recuperar contraseña, intente nuevamente')
            setTimeout(()=> setError(''), 2500)
        }

        setLoading(false)
    }

    return (
        <div>
            <Grid container component ='main' className={classes.root}>
                
                <Container component={Paper} elevation={5} maxWidth = 'xs' className = {classes.container}>
                    <div className = {classes.div}>
                        {error && <p className= 'error'>{error}</p>}
                        <Avatar className = {classes.avatar}>
                            <ContactMailOutlinedIcon/>
                        </Avatar>
                        <Typography component = 'h1' variant = 'h4'>Restaurar contraseña</Typography>
                        <form className = {classes.form} onSubmit = {handleSubmit}>
                            <br/>
                            <input
                                className = {classes.input}
                                variant = 'outlined'
                                fullWidth
                                required
                                autoFocus
                                placeholder = 'Email'
                                type = 'email'
                                ref = {emailRef}
                            />
                            <br/><br/>
                            <Button
                                disabled = {loading}
                                type = 'submit'
                                
                                fullWidth
                                variant = 'contained'
                                color = 'primary'
                                className = {classes.button}                                
                            >
                                Restaurar contraseña
                            </Button>
                            <br/><br/>
                            <Link to ='/login'>
                                <ListItemText secondary = 'Regresar'  className = {classes.text}/>
                            </Link>
                            <br/><br/>

                        </form>
                    </div>

                </Container>

            </Grid>
        </div>
        
    )
}
