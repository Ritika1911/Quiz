import * as React from 'react';
import { useState, useEffect, useRef } from 'react'
import {useLocation} from 'react-router-dom';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import db from "../config/firebase";
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { doc, onSnapshot, collection, query, where,setDoc,getCountFromServer, getFirestore, updateDoc } from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore"
import FormControlLabel from '@mui/material/FormControlLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import useFetch from './useFetch';
import Accordion from '@mui/material/Accordion';
import Alert from '@mui/material/Alert';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import ListSharpIcon from '@mui/icons-material/ListSharp';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Stack from '@mui/material/Stack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
const Questions = ({route}) => {
  const navigate = useNavigate();
    const {state} = useLocation();
    const [logic,setLogic]=useState(true);
    const [q,setQ]=useState('');
    const [expanded, setExpanded] = React.useState(false);
    const [copt,setCopt]=useState('');
    const [options,setOpt]=useState([]);
    const [optlogic,setoptLogic]=useState(false);
    const {name} = state;
    const query= collection(db,`quiz/${name}/questions/`);
    const [docs,loading,error]=useCollectionData(query);
    console.log("ret ",docs);
    const [value, setValue] = React.useState('');
    const [points,setPoints] =useState(1);
    const color = purple[50];
    const [qid,setid]=useState(0);
    const qno =useRef(0);
    const [open, setOpen] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);


    const handleClickOpen3 = () => {
      setOpen3(true);
    };
  
    const handleClose3 = () => {
      setOpen3(false);
    };
    const Handleques = (q) => {
      if(value=='')
      {
        console.log("correct ans ",value);
        handleClickOpen3();
      }
      else{
        console.log("clicked handle");
        const docref= doc(db,`quiz/${name}/questions/`, q);
      
        setDoc(docref,{
        id: qid,
        ques : q,
        options:options,
        correct:value,
        points: points,
      del:false});
        setQ();
        setOpt(['']);
        qno.current=qno.current+1;
        setid(qno.current);
      }
    }
      const updateopt= (e)=> {
        if(e!='')
            setOpt((current => [...current, e]));
        console.log("opt ",options)
        setCopt('');
       
        }
        const handleChange = (event) => {
            console.log("correct answer ",event.target.value);
            setValue(event.target.value)
          };
          const handleaccChange = panel => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
          };
        
          const handleClickOpen = () => {
            setOpen(true);
          };
        
          const handleClose = () => {
            setOpen(false);
          };
        
          const handleSave = () => {
            const docRef = doc(db, 'quiz', name);

            const updateTimestamp =  updateDoc(docRef, {
                total:docs.length
            });
            console.log("Count: " + docs.length);
            console.log("total questions ",qid);
            navigate('/home', { state: { name:name } });
          };
          const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
          }));
          
  return (
    <div>   
      {open3? (<> <Alert severity="error" onClose={()=> {setOpen3(false)}}>You haven't selected a correct option</Alert></>):null}
       
     
    
      <Box sx={{ flexGrow: 1 ,
    }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={()=> {navigate('/')}} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Quiz App
          </Typography>
          <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
          <Button color="inherit" >Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <div style={{ width: '100%' }}>
      <Box
        component="span"
        sx={{
          display: 'block',
          p: 1,
          alignItems:'center',
          marginLeft:'70',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '1.575rem',
          fontWeight: '700',
        }}
      >
        Quiz {name} 
      </Box>
      </div>
      <Box
      component="form"
      sx={{
        border:2,
        alignItems:'center',
        width: '50%',
        height:'fit-content',
        backgroundColor: color,
        borderRadius: 3,
        position:'fixed',
        marginTop:3,
        marginLeft: 6,
        display:'inline-block',
        borderColor:purple[100],
        boxShadow: 3,
        '& > :not(style)': { m: 4, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <Box
        component="div"
        sx={{
          display: 'inline',
          p: 1,
         
          m: 1,
          bgcolor: purple[100],
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '1.575rem',
          fontWeight: '700',
        }}
      >
        Please enter questions
      </Box>
    <div> <h3></h3>
    <h4>Question: {qid+1}</h4>
    {logic ? (
      <>
    <div>
    
    <TextField id="outlined-basic" label="Enter a question " sx={{width: 600}} variant="outlined" onChange={e => setQ(e.target.value)}/> 
    <Button variant="contained" sx={{color:'black', background:purple[50],marginTop:2, '&:hover': {
      backgroundColor: '#ce93d8',
      color: 'white',
  },}} onClick={e => setoptLogic(!optlogic)}>Add Options</Button>
    <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {options?.map(doc=>{return (
            <div key={Math.random()}>
              {doc!='' ? ( <><FormControlLabel id="optionsradio" value={doc} control={<Radio />} label={doc} /> </>):null}
            </div>
        )})}
        </RadioGroup>
    {optlogic?(
    <>
    <Stack direction="row" spacing="2" sx={{}}>
      
    <TextField id="outlined-basic" label="Option.. " sx={{width: 300, marginTop:2}} variant="outlined" onChange={e=> setCopt(e.target.value)}/> 
    {/* <TextField id="filled-basic"  sx={{width: 300, background:'white', color:'purple'}}label="Option.." variant="filled" onChange={e=> setCopt(e.target.value)}/> */}
   <Item> 
   <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <TaskAltIcon onClick={e=> {updateopt(copt)}}  />
          {/* <Button variant="contained" {...bindToggle(popupState)}>
            Toggle Popper
          </Button> */}
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>Option Added</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState></Item> 

      </Stack>
    </>):null}
    </div>
    </>):null}
    <Box sx={{fontWeight:2,marginTop:2}}>Points :</Box>
    <Input defaultValue="1" inputProps={points} onChange={e => {setPoints(e.target.value)}}/>
    <Button variant="contained" onClick={e => Handleques(q)}>Add question</Button>
    <Button variant="contained" sx={{width:250 ,color:'black', background:'#ce93d8' ,marginTop:2, '&:hover': {
      backgroundColor: purple[100],
      color: 'black',
  },}} onClick={e =>  handleClickOpen()}>Save Quiz</Button>
   <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Save your Quiz"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h1>Are you sure you want to save the Quiz : {name} ?</h1>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, I want to make changes</Button>
          <Button onClick={()=>handleSave()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </Box>
      <Box
      component="form"
      sx={{
        border:2,
        float: 'right',
        width: '43%',
        scrollBehavior:'auto',
        height:'fit-content',
        backgroundColor: '#E0FFFF',
        borderRadius: 3,
        marginLeft: 4,
        display:'inline-block',
        borderColor:'#00a8e8',
        boxShadow: 2,
        '& > :not(style)': { m: 4, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
 <div>
 {docs?.map((doc,index)=>{return(
      <Accordion sx={{width:550}} id={index} expanded={expanded === 'panel1'} onChange={handleaccChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
           Question {index+1}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Points: {doc.points} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {doc.ques}
          </Typography>
          <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}>
        {doc.options?.map(opt=>{return (
            <div key={Math.random()}>              
                <FormControlLabel checked={(doc.correct==opt) ? true : false} value={opt} control={<Radio/>} label={opt} />
            </div>
        )})}
        </RadioGroup>
        </AccordionDetails>
      </Accordion>)})}
    </div> 
    </Box>
    </div>
  )
 
}


export default Questions