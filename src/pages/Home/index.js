import { makeStyles } from "@material-ui/core";
import React from "react";
import { Contenedor } from "../../components";


const useStyles = makeStyles(theme=>({
  
  text:{
      textAlign : 'center',
      marginTop: theme.spacing(30),
      color: 'white'
  },
  
  
}))

export default function Home() {
  const classes = useStyles()
  return (
    <div>
      <Contenedor />
      <h1 className = { classes.text }>Bienvenido!</h1>
    </div>
  );
}
