

import React from 'react'
import { makeStyles, Drawer, Divider } from '@material-ui/core'
import { Listas } from '../../components'




const useStyles = makeStyles(theme =>({
    drawer:{
        width: 240,
        flexShrink: 0,
        
    },
    drawePaper:{
        width: 240
    },
    toolbar: theme.mixins.toolbar,
}))

export default function Cajon(props) {
    const classes = useStyles()
    return (
        <Drawer 
            className = {classes.drawer}
            classes={{
                paper: classes.drawePaper 
            }}
            anchor = 'left'
            variant = {props.variant}
            open = {props.open}
            onClose = {props.onClose ? props.onClose : null}
        >
            <div className = {classes.toolbar}/>
            <Divider/>
            <Listas/>

        </Drawer>
    )
}
