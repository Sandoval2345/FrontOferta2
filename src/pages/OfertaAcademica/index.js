import React,  {useEffect,useState }from 'react'
import { Grid, Button, TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Contenedor } from '../../components'
import TimelineIcon from '@mui/icons-material/Timeline'
import { useForm } from '../../shared/hooks/useForm'
import axios from 'axios';
import swal from 'sweetalert'
import XLSX from 'xlsx';




const useStyles = makeStyles(theme=>({
    root:{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '10vh',
        justifyContent: 'center',
        
    },
    text:{
        textAlign: 'center',
        marginTop: theme.spacing(5),
        color: 'white'
    },
    button:{
        width: '40%',
        //margin: theme.spacing(10,65,10),
        marginTop: theme.spacing(15) ,
        
        [theme.breakpoints.down(400 + theme.spacing(2)+2)]:{
            margin: theme.spacing(0),
            width: '100%',
            height: '100%'
        }
    },
    select:{
        marginRight: theme.spacing(8)
        
    },
    div1:{
        margin: theme.spacing(3, 70, 2),
        flexDirection: 'column',
        alignItems: 'center',
        

    },
    div2:{
        margin: theme.spacing(3, 70, 2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
       
}))




export default function OfertaAcademica() {
    const classes = useStyles() 
    const [datas, setDatas] = useState([]);
    const [form, handleFormChange] = useForm({semestre:""})
    const [fecha, setFecha] = useState('')
    const [fechaError, setFechaError] = useState(false)


  
    
   /* useEffect (()=>{
        
        if(form.semestre.length === 7){
            axios.get('/api/oferta/getOfertas/' + form.semestre)
            .then(response => {
                
                setDatas(response.data)
            
            })
        }
        //sweet alert
    },[form])*/


    useEffect(() => {

        if(form.semestre.length === 7){
            const getData = async () => {
            const data = await axios.get(
                "/api/oferta/getOfertas/" + form.semestre
            );
            setDatas(data.datas);
            };
            getData();
        }
    }, [form]);
    
    console.log(datas)
    let DataSet = datas?.map((oferta)=>(

        {
            Semestre: oferta.semestre,
            Nombre: oferta.nombre,
            ECIN: oferta.ecin,
            Dpto: oferta.departamento,
            Paralelos: oferta.cantparalelos,
            Demanda: oferta.demandaestimada
        }
    ))
    //console.log(DataSet)
    const handleSubmit = (e) => {
        e.preventDefault()
        //setFechaError(true)
        if (e.target.value < 7){
            
            setFechaError(true)
        }
    }
    const mostrarAlerta=()=>{
        if(fecha === "" || fecha.length < 7){
            swal({
                title:'Error',
                text:'Debe ingresar los datos de la siguiente forma: año-semestre Ej. 2021-02',
                icon:'warning',
                
            })
        }
    }
    const downloadExcel = () =>{
        
        if(fecha !== "" && fecha.length === 7){
            const workSheet = XLSX.utils.json_to_sheet(DataSet)
            const workBook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workBook,workSheet,"ofertaAcademica")
            let buf = XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
            XLSX.write(workBook,{bookType:'xlsx',type:"binary"})
            XLSX.writeFile(workBook,"OfertaAcademica"+form.semestre+".xlsx")
        }
    
    }

    //console.log(form.semestre)
    return (
        <div>
            <section >
                <Contenedor/>
                <h2 className = { classes.text }>Haz clic en el boton para generar la sugerencia de Oferta Academica</h2>
                {/*<div className = {classes.div1} style = {{width:'150px',margin:'auto'}}><SelectCarr /></div>*/}
                <br/><br/>
                <form noValidate autoComplete='off' onSubmit={handleSubmit} >
                    <div className = {classes.div2} style = {{width:'200px',margin:'auto'}}>
                            <TextField
                                
                                required
                                fullWidth
                                color = 'primary'
                                margin = 'normal'
                                variant = 'outlined'
                                label = 'Ingerese año-semestre. Ej:2021-02'
                                name = 'semestre'
                                value = {form.semestre}
                                onChange = {({target}) => handleFormChange({semestre: target.value},setFecha(target.value))}
                                onInput={(e)=>{e.target.value = e.target.value.slice(0,7)}}
                                //placeholder = 'Ingerese año-semestre. Ej:2021-02'
                                
                            />   
                        
                    </div>

                    <Grid align = 'center' className={classes.root}>
                        <Button
                            type = "button" 
                            variant = 'contained' 
                            color = 'primary' 
                            size = 'large' 
                            endIcon = {<TimelineIcon fontSize = 'large'/>} 
                            className = {classes.button}
                            onClick = {() => {downloadExcel(); mostrarAlerta()}}
                            
                        >
                            GENERAR OFERTA ACADEMICA
                        </Button>
                    </Grid>
                </form>

                    
            </section>
     

        </div>
       
    )
}

 