
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import db from "../config/firebase";
import {getDocs, collection} from "firebase/firestore"
import React, { useState, useEffect } from 'react'
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardContent from '@mui/material/CardContent';
import {useCollectionData} from "react-firebase-hooks/firestore"
import CardMedia from '@mui/material/CardMedia';
import {useLocation} from 'react-router-dom';
import {getAuth, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { CardActionArea } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
const Create = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyA92AdCJD5EvM-2eEen2ohD8vziYW1U6MY",
    authDomain: "quiz-a1660.firebaseapp.com",
    projectId: "quiz-a1660",
    storageBucket: "quiz-a1660.appspot.com",
    messagingSenderId: "872450901403",
    appId: "1:872450901403:web:6042e2a56b58acb726cd3e",
    measurementId: "G-1DC7MVMTNG",
    
  };
  const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const {state} = useLocation();
    const [name,setName] = useState('');
    const [desc,setDesc] = useState('');
    const [points,setPoints] = useState(0);
    const [time,setTime] = useState(0);
    const [units,setUnits]=useState('Seconds');
    const [alert,setAlert]=useState(false);
    const [disabled,setDisabled]=useState(true);
    const navigate = useNavigate();
    const query= collection(db,`quiz/`);
    const [docs,loading,error]=useCollectionData(query);
    const submithandler = () => {
        console.log("val ",name);
        // db.collection("quiz").add({
        //     name: name,
        //     desc:desc,
        //     points:points,
        //     time:time
        //   });
        if(name=='' || desc=='' || points ==0 || time==0)
        {
          setAlert(true);
        }
        else
        {
          setDoc(doc(db, "quiz",name), {
            id:docs?.length +1,
            name: name,
            desc:desc,
            points:points,
            time:time,
            units : units,
          });
        console.log("added");
        setDisabled(false);
        }
    }
    useEffect(() => {
      document.getElementById("add").disabled=true;
      
    }, []);
    const createfun = () => {
        console.log("clicked");
        navigate('/question', { state: { name:name } });
      }
      const signOutfun= ()=> {
        signOut(auth);
        console.log("signed out");
        navigate('/');
      }
      const handleChange = (event) => {
        setUnits(event.target.value);
      };
      const handleAlert=()=>{
        setAlert(false);
        console.log("a ",alert);
      }
  return (
    <div> 
      
      {alert? (<>
      <Alert
        action={
          <Button color="inherit" size="small" onClick={() => handleAlert()}>
            Close
          </Button>
        }
        
        severity="error"
      > <AlertTitle>Error</AlertTitle>
      Please fill all the fields — <strong>Missing Data</strong>
      </Alert></>):null}
    <Box sx={{
    width:'100%',
    height : '100%',
      backgroundColor: '#F0F8FF',

    }}>
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
            <MenuIcon onClick={()=> {navigate('/home', { state: { name:name } })}} />
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
          <Button color="inherit" onClick={signOutfun}>Logout</Button>
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
        What would your quiz look like?
      </Box>
    </div>
    <Box
      component="form"
      sx={{
        border:2,
        alignItems:'center',
        width: 600,
        height:530,
        backgroundColor: '#E0FFFF',
        borderRadius: 3,
        marginTop:3,
        marginLeft: 6,
        borderColor:'#00a8e8',
        boxShadow: 2,
        '& > :not(style)': { m: 4, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField sx={{
        display:'block',
      }} id="outlined-basic" label="Name" variant="outlined" onChange={e=> setName(e.target.value)}/>
      <TextField sx={{
        display:'block',
      }} id="outlined-basic" label="Description" variant="outlined" onChange={e=> setDesc(e.target.value)}/>
      <TextField sx={{
        display:'block',
      }} id="outlined-basic" label="Points" variant="outlined" onChange={e=> setPoints(e.target.value)}/>
      <TextField sx={{
        display:'inline-block',
      }} id="outlined-basic" label="Time limit" variant="outlined" onChange={e=> setTime(e.target.value)}/>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={units}
        label="Units"
        onChange={handleChange}
        sx={{
          display:'inline-block',
        }}
      >
        <MenuItem sx={{
          width: 1
        }}value={'Seconds'}>Seconds</MenuItem>
        <MenuItem value={'Minutes'}>Minutes</MenuItem>
      </Select>
      
      <Button variant="contained" onClick={e => submithandler()}>
      Save Details
    </Button>
      
      <Button disabled={disabled} variant="contained" id="add" onClick={e => createfun()}>Add Questions</Button>
       {/* <ButtonGroup
  disableElevation
  variant="contained"
  aria-label="Disabled elevation buttons"
>
      <Button variant="contained" onClick={e => submithandler()}>Submit</Button>
      <Button variant="contained" onClick={e => createfun()}>Add Questions</Button></ButtonGroup> */}
    </Box>
    </Box>
    </div>
  )
}

export default Create