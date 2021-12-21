import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
//import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useForm } from '../../shared/hooks/useForm'




const useStyles = makeStyles((theme)=>({
    modal:{
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left:'50%',
        transform: 'translate(-50%, -50%)'
    },
    icons: {
        cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%'
    },
  
}));

export default function TablaSalas() {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [SalaSeleccionada, setSalaSeleccionada] = useState({
        aforoMax:'',
        tipo:'',
        codsala: ''
    })
    const [form, handleFormChange] = useForm({
        aforoMax: '',
        tipo: '',
        codsala:''
    })

    const handleChange=e=>{ //alamcenamos lo que se escribe en el textfield
        const{name, value}=e.target; //name es una propiedad que le di a cada textfield mas abajo
        if(name!==""){
            setSalaSeleccionada(prevState=>({
                ...prevState,
                [name]:value
            }))
        }

    }
    

    
    //peticion get
    const getSalas = async() =>{
        await axios.get('/api/salas/getSalas')
        .then(response =>{
           setData(response.data) //lo que obtuvimos en la peticion getSalas se lo asignamos al estado
        });
    }
    

    useEffect (() =>{
        getSalas();

    },[])


    //peticion post
    const createSala = async()=>{
        await axios.post('/api/salas/registSalas',SalaSeleccionada) //SalaSeleccionada
        .then(response =>{
            setData(data.concat(response.data))
            abrirCerrarModalInsert()
        })
        
    }

    //peticion put
    const editarSala = async()=>{
        await axios.put('/api/salas/updateSalas/'+ SalaSeleccionada.codsala, SalaSeleccionada)
        .then(response =>{
            var dataNueva = data; //guarda los nuevos datos de la sala
            dataNueva.forEach(sala=>{ //recorre el arrego con los nuevos datos de la sala 
                if(SalaSeleccionada.codsala === sala.codsala){
                    sala.aforoMax = SalaSeleccionada.aforoMax;
                    sala.tipo = SalaSeleccionada.tipo;
                    sala.codsala = SalaSeleccionada.codsala;
                }
            })
            setData(dataNueva);
            abrirCerrarModalEdit();
        })
    }




   
    
    //peticion delete
    const deleteSala = async() =>{
        await axios.delete('/api/salas/deleteSalas/' + SalaSeleccionada.codsala)
        .then(response=>{
            setData(data.filter(sala=>sala.codsala!==SalaSeleccionada.codsala)); //filtar los datos por cdsala
            abrirCerrarModalELiminar();
        })
    }

    //apertura y cerrado de ventanas emergentes o modals
    const abrirCerrarModalInsert =() =>{
        setModalInsert(!modalInsert); //abre o cierra el modal
    }

    const abrirCerrarModalEdit =() =>{
        setModalEdit(!modalEdit); //abre o cierra el modal
    }
    const abrirCerrarModalELiminar=() =>{
        setModalEliminar(!modalEliminar);
    }


    const seleccionarSala=(sala, caso)=>{
        setSalaSeleccionada(sala);
        (caso === 'Editar')?abrirCerrarModalEdit():abrirCerrarModalELiminar()

    }


    const bodyInsertar = ( //esto es lo que se abrira al apretar el boton de insertar (modal)
        <div className = {classes.modal}>
            <h3>Agregar Nueva Sala</h3>
            <TextField name = 'aforoMax' className = {classes.inputMaterial} label = 'Aforo maximo' onChange = {handleChange}/>
            <br/> 
            <TextField name = 'tipo' className = {classes.inputMaterial} label = 'Tipo' onChange = {handleChange}/>
            <br/>
            <TextField name = 'codsala' className = {classes.inputMaterial} label = 'Codigo Sala' onChange = {handleChange}/>
            <br/><br/>
            <div align = 'right'>
                <Button onClick={()=>createSala()}>Insertar</Button>
                <Button onClick={()=>abrirCerrarModalInsert()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEdit = ( //esto es lo que se abrira al apretar el boton de insertar (modal)
        <div className = {classes.modal}>
            <h3>Editar Sala</h3>
            <TextField name = 'aforoMax' className = {classes.inputMaterial} label = 'Aforo maximo' onChange = {handleChange} value = {SalaSeleccionada && SalaSeleccionada.aforoMax}/>
            <br/>
            <TextField name = 'tipo' className = {classes.inputMaterial} label = 'Tipo' onChange = {handleChange} value = {SalaSeleccionada && SalaSeleccionada.tipo}/>
            <br/>
            <TextField name = 'codsala' className = {classes.inputMaterial} label = 'Codigo Sala' onChange = {handleChange} value = {SalaSeleccionada && SalaSeleccionada.codsala}/>
            <br/><br/>
            <div align = 'right'>
                <Button onClick={()=>editarSala()}>Editar Sala</Button>
                <Button onClick={()=>abrirCerrarModalEdit()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar = (
        <div className={classes.modal}>
          <p>Estás seguro que deseas eliminar la sala? <b>{SalaSeleccionada && SalaSeleccionada.codsala}</b> ? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>deleteSala()}>Sí</Button>
            <Button onClick={()=>abrirCerrarModalELiminar()}>No</Button>
          </div>
        </div>
    )

 

  
    return (
        <div className = 'App'>
            <br/>
            <div align = 'center'>
                <Button  onClick = {()=>abrirCerrarModalInsert()}>Insertar</Button>
            </div>
            <br /><br />
            <TableContainer>
                <Table id = 'tableS'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Aforo Maximo</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Codigo Sala</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead> 

                    <TableBody>
                        {data.map(sala =>(
                            <TableRow>
                                <TableCell>{sala.aforomax}</TableCell>
                                <TableCell>{sala.tipo}</TableCell>
                                <TableCell>{sala.codsala}</TableCell>
                                <TableCell>
                                    <Edit className = {classes.icons} onClick = {()=>seleccionarSala(sala, 'Editar')}/>
                                    &nbsp;&nbsp;&nbsp; 
                                    <Delete className = {classes.icons} onClick ={()=>seleccionarSala(sala, 'Eliminar')}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
 
            </TableContainer>

            <Modal
                open = {modalInsert}
                onClose = {abrirCerrarModalInsert}
            >
                {bodyInsertar}
            </Modal>

            <Modal
                open = {modalEdit}
                onClose = {abrirCerrarModalEdit}
            >
                {bodyEdit}
            </Modal>

            <Modal
                open = {modalEliminar}
                onClose = {abrirCerrarModalELiminar}
            >
                {bodyEliminar}
            </Modal>
        
        </div>
        
    )
}
