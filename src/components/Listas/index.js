import React from 'react'
import { 
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core'
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import { Link, NavLink,  } from 'react-router-dom';





export default function Lista() {
    
    
    return (
        <div>
            <List component = 'nav'>
                <div>
                    <li className = 'nav-item'>
                        <Link to = '/' className = 'btn' >
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary='HOME'/>
                            </ListItem>
                        </Link>
                    </li>
                    <NavLink to= {{ pathname: "https://tongoy.ucn.cl"}} target="_blank" activeStyle className = 'btn'>
                        <ListItem button>
                            <ListItemIcon>
                                <HelpIcon/>
                            </ListItemIcon>
                            <ListItemText primary='TONGOY'/>
                        </ListItem>
                    </NavLink>

                    <NavLink to= {{ pathname: "https://eic.ucn.cl"}} target="_blank" activeStyle className = 'btn'>
                        <ListItem button>
                            <ListItemIcon>
                                <EngineeringIcon/>
                            </ListItemIcon>
                            <ListItemText primary='EIC'/>
                        </ListItem>
                    </NavLink>
                   
                    <li className = 'nav-item'>
                        <Link to ={'/OfertaAcademica'} className = 'btn'>
                            <ListItem button>
                                <ListItemIcon>
                                    <CalendarTodayIcon/>
                                </ListItemIcon>
                                <ListItemText primary='OFERTA ACADEMICA'/>
                            </ListItem>
                        </Link>
                    </li>
                    {/*
                    <li className = 'nav-item'>
                        <Link  to = {'/Salas'} className = 'btn'>
                            <ListItem button>
                                <ListItemIcon>
                                    <AddIcon/>
                                </ListItemIcon>
                                <ListItemText primary = 'SALAS'/>
                            </ListItem>
                        </Link>
                    </li>
                    */}
                </div>
                <Divider/>
            </List>
        </div>
    )
}
