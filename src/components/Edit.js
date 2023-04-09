import React from 'react'
import { doc, getDoc,onSnapshot, collection, query, where,setDoc, deleteDoc , updateDoc } from "firebase/firestore";
import db from "../config/firebase";
import { useState, useEffect, useRef } from 'react';
import {useCollectionData} from "react-firebase-hooks/firestore";
import Dialog from '@mui/material/Dialog';
import {useLocation} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import { Item } from 'firebase/analytics';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';
const Edit = () => {
    const {state} = useLocation();
    const {quizId}=state;
    const {name}=state;
    const {ans}=state;
    const query1= collection(db,`quiz/`);
    const [quizzesCollection,loading,error]=useCollectionData(query1);
    const navigate = useNavigate();
    const query2= collection(db,`quiz/${name}/questions`);
    const [questionsCollection,loading2,error2]=useCollectionData(query2);
    const quiz=quizzesCollection?.find(q=>q.id==quizId);
    const [addq,setaddq]=useState(true);
    const [q,setQ]=useState('');
    const [optlogic,setoptLogic]=useState(false);
    const [optlogic2,setoptLogic2]=useState(false);
    const [value, setValue] = React.useState('');
    const [copt,setCopt]=useState('');
    const [options,setOpt]=useState(['']);
    const [questions, setQuestions] = useState([]);
    const [points,setPoints] =useState(1);
    const [addopt,setaddopt]=useState('');
    const [curoptions, setcuroptions]=useState('');
    const [curques,setcurques]=useState('');
    console.log("q ",quizzesCollection);
    const [open3, setOpen3] = React.useState(false);


    const handleClickOpen3 = () => {
      setOpen3(true);
    };
  
    const handleClose3 = () => {
      setOpen3(false);
    };

    useEffect(() => {
      // Listen for updates to the questions subcollection
    //   const unsubscribe = quizzesCollection?.doc(quizId)
    //     .collection('questions')
    //     .onSnapshot(snapshot => {
    //       const questions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //       setQuestions(questions);
    //     });
  
      
    }, []);
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      height:30,
      margin:4,
      color: theme.palette.text.secondary,
    }));

    const handleChange = (event) => {
        console.log("correct answer ",event.target.value);
        setValue(event.target.value)
      };

      const updateopt= (e)=> {
        if(e!='')
            setOpt((current => [...current, e]));
        console.log("opt ",options)
        setCopt('');
       
        }

        
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
            id: questionsCollection?.length,
            ques : q,
            options:options,
            correct:value,
            points: points,
          del:false});
            setQ();
           
            setOpt(['']);
            const docRef = doc(db, 'quiz', name);

            const updateTimestamp =  updateDoc(docRef, {
                total:questionsCollection?.length+1,
            });
          }
          }
         
          const handleDel=  (ques)=>{
          console.log(ques);
            const docref= doc(db,`quiz/${name}/questions/`, ques.ques);
            console.log('doc ',docref);
            const updateTimestamp =  updateDoc(docref, {
              del:true
          });
         
          }

          const handleDelopt=(ques, opt)=>{
            const newArray = ques.options.filter(item => item !== opt);
            const docref= doc(db,`quiz/${name}/questions/`, ques.ques);
            const updateTimestamp =  updateDoc(docref, {
              options : newArray
          });
          }
          const updateopt2= (ques)=> {
            const docref= doc(db,`quiz/${name}/questions/`, ques.ques);
            console.log('doc ',docref);
           
            const exopts=[...ques.options,addopt];
            console.log('e ',exopts);
            const updateTimestamp =  updateDoc(docref, {
              options : exopts
          });
          setaddopt('');
            }
      
    
  return (
    <>

        <div sx={{display : 'inline-block', width:'100%'}}>

              <Box sx={{ flexGrow: 1 ,
    }}>
      <AppBar sx={{position:'fixed'}}>
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
          <Button color="inherit" >Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
          <Box  sx={{display : 'inline-block', height:'100%',marginLeft:5, marginTop:10}}>
           <Box sx={{width:'40%',m:2,height:'fit-content', boxShadow:3,p:2, display:'inline-block', border:purple[200],float : 'left' , position : 'fixed'}}>
           <Button>Add Question</Button>
           {open3? (<> <h4 severity="error" sx={{zIndex:'50'}} onClose={()=> {setOpen3(false)}}>You haven't selected a correct option</h4></>):null}

           {addq?(<>
            <div>
    
    <TextField id="outlined-basic" label="Enter a question " sx={{width: 470}} variant="outlined" onChange={e => setQ(e.target.value)}/> 
    <Button variant="contained" sx={{color:'black', background:purple[50],marginTop:2, '&:hover': {
      backgroundColor: '#ce93d8',
      color: 'white',
  },}} onClick={e => setoptLogic(!optlogic)}>Add Options</Button>
    <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{height:'fit-content'}}
      >
        {options?.map(doc=>{return (
            <div key={Math.random()}>
              {doc!='' ? ( <><FormControlLabel value={doc} control={<Radio />} label={doc} /> </>):null}
            </div>
        )})}
        </RadioGroup>
    {optlogic?(
    <>
    <Stack direction="row" spacing="2" sx={{}}>
      
    <TextField id="outlined-basic" label="Option.. " sx={{width: 200, display:"inline-block"}} variant="outlined" onChange={e=> setCopt(e.target.value)}/> 
    {/* <TextField id="filled-basic"  sx={{width: 300, background:'white', color:'purple'}}label="Option.." variant="filled" onChange={e=> setCopt(e.target.value)}/> */}

          <TaskAltIcon sx={{display:"inline-block", p:2}} onClick={e=> {updateopt(copt)}}  />
      

      </Stack>
    </>):null}
    <Box sx={{fontWeight:2,marginTop:2}}>Points :</Box>
    <Input defaultValue="1" inputProps={points} onChange={e => {setPoints(e.target.value)}}/>
    </div>
    <Button variant="contained" onClick={e => Handleques(q)}>Save question</Button></>):null}
   
   
    </Box>
    <Box    sx={{border:2,
        float: 'right',
        width: 'fit-content',
        backgroundColor: '#E0FFFF',
        borderRadius: 3,
        display:'inline-block',
        borderColor:'#00a8e8',
        boxShadow: 2,
        maxHeight: '100%',
        overflow:'auto',
        marginLeft:100
        }} >
          {/* sx={{ width: '43%',float :'right', backgroundColor:'#fafafa', border : 'black', boxShadow:4, alignItems:'center', display:'inline-block', marginLeft:80}} */}
      {questionsCollection?.map(ques =>(<Box sx={{ minWidth: 275 }}>
        {!ques?.del ? (<><Card sx={{backgroundColor:'#ce93d8', width:450, height:'fit-content',boxShadow:4,border : '#4a14ac', m:2, marginTop:3}} variant="outlined"><React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 20, fontWeight:1.55, m:1,p:1, backgroundColor:'#e1bee7' , borderRadius:2, boxShadow:3}} color="text.secondary" gutterBottom>
          {ques?.ques}
          </Typography>
          <Button sx={{backgroundColor:'white', boxShadow:2 , marginTop:2, m:2,'&:hover': {
            backgroundColor: '#eeeeee',
        }}} onClick={e => setoptLogic2(!optlogic2)}>Add Option</Button>
          <Button id="btn" sx={{backgroundColor:'white', boxShadow:2 ,marginLeft:15, marginTop:1, '&:hover': {
            backgroundColor: '#eeeeee',
        }}} onClick={e=>handleDel(ques)}> Delete<DeleteIcon/></Button>
          {optlogic2?(
    <>
    <Stack direction="row" spacing="2" sx={{margin: 2}}>
      
    <TextField id="outlined-basic" label="Option.. " sx={{width: 300, color:'white'}} variant="outlined" onChange={e=> setaddopt(e.target.value)}/> 
    {/* <TextField id="filled-basic"  sx={{width: 300, background:'white', color:'purple'}}label="Option.." variant="filled" onChange={e=> setCopt(e.target.value)}/> */}
  <Button sx={{backgroundColor: 'white', height: 40,marginTop:25
   }} onClick={e=> updateopt2(ques)}>Add</Button>
     
       

      </Stack>
    </>):null}
        </CardContent>
        <CardActions>
        
   
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          onChange={e => handleChange(e)}
          sx={{marginLeft:5}}
        >
          {ques?.options?.map(doc=>{return (
              <div key={Math.random()}>
                  {doc!='' ? (<>  <FormControlLabel sx={{fontSize: 18, fontWeight:1.55, m:0.5,p:0.7, width:300, display:'inline-block', backgroundColor:'#e1bee7' , borderRadius:2, boxShadow:3}} name="radio" value={doc} control={<Radio />} label={doc} />
                  <RemoveCircleOutlineIcon sx={{display:'inline-block'}} onClick={e=> handleDelopt(ques, doc)}/></>): null}
                
              </div>
          )})}
          </RadioGroup>
        </CardActions>
       
      </React.Fragment></Card></>): null}
      
    </Box>))}
    </Box>
    </Box>
   
      </div>
      </>
  )
}

export default Edit