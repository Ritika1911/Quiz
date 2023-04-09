import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import { json, useNavigate } from 'react-router';
import db from "../config/firebase";
import Countdown from 'react-countdown';
import {useCollectionData} from "react-firebase-hooks/firestore"
import { doc, getDoc,onSnapshot, collection, query, where } from "firebase/firestore";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { purple } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { PieChart } from "react-minimal-pie-chart";
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
const Quiz = () => {
    const {state} = useLocation();
    const {name} = state;
    const query= collection(db,"quiz");
    const [docs,loading,error]=useCollectionData(query);
    const result = docs?.find(t=>t.name ===name);
    const query2= collection(db,`quiz/${name}/questions`);
    var [qs,loading2,error2]=useCollectionData(query2);
    const [tot,setTotal]=useState(0);
    const query3= collection(db,`quiz`);
    var [cqdetails,loading2,error2]=useCollectionData(query3);
    var cq=cqdetails?.find(t=>t.name ===name);
    var total;
    if(cq)
        total=cq?.total;
    console.log("total ",total);
    const [minutes, setMinutes] = useState(false);
    const [seconds, setSeconds] = useState(false);
    const [time, setTime] = useState(0);
    const [logic,setLogic]=useState(false);
    const [marks,setMarks]=useState(0);
    const qno =useRef(0);
    const score =useRef(0);
    const [quesno,setQues] =useState(0);
    const [options,setoptions]=useState();
    const [timeup,setTimeup]=useState(false);
    const [ans, setAns]=useState([]);
    const [order, setorder]=useState([]);
    const [chosen,setChosen]=useState('');
    const [nat,setnat]=useState(0);
    
    const [alert,setAlert]=useState(false);
    const [alertradio,setAlertr]=useState(false);
    const [open3,setOpen3]=useState(false);
    
    while(qs?.find(t=>t.id ===qno.current)?.del==true  && quesno<=total-1)
    {
      qno.current= qno.current+1;
      console.log("found ",qno);
      //console.log("questions ",qs[0]);
      setQues(qno.current);
    }
    var cur=qs?.find(t=>t.id ===qno.current);
    const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
      
    const[obj,setobj]=useState({});
    
    const getTime = () => {
      console.log("u ",cq?.units);
        
      };
    const updateQ= ()=>{
        cur=qs?.find(t=>t.id ===quesno);
        
    }
    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        updateQ();
        
        return () => clearInterval(interval);
        
      }, []);
    const navigate = useNavigate();
    const Completionist = () => {setTimeup(true)};
    const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Completionist />;
    } else {
        return <Box sx={{display:'inline-block',marginLeft:73}}> <Stack direction="row" spacing="2" sx={{backgroundColor:purple[100], m:3, p: 3,width:'fit-content', borderRadius:3, boxShadow:5}}> <Box sx={{backgroundColor:purple[50], p:2, borderRadius:2, fontSize:30}}>{hours}</Box><Box sx={{fontWeight:1.5, fontSize:30, p: 1}}>:</Box><Box sx={{backgroundColor:purple[50], p:2,m:3, borderRadius:2,fontSize:30}}>{minutes}</Box><Box sx={{fontWeight:1.5, fontSize:30, p:1}}>:</Box><Box sx={{backgroundColor:purple[50], p:2, m : 3,borderRadius:2, fontSize:30}}>{seconds}</Box></Stack></Box>;
    }
    };
    const handlenext = ()=>{
      if(chosen=='')
        setOpen3(true)
      else{
        const radioButtons = document.querySelectorAll('radio');
        let chosen=false;
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
              console.log("r ",radioButton.checked)
              chosen=true;
            }
        }
        qno.current= qno.current+1;
        setQues(qno.current);
        console.log("q ",qno.current);
        if(qno.current>=total)
        {
          console.log("exit");
          handleClickOpen2();
        }
        // console.log("qno ", qs?.find(t=>t.id ===qno.current)?.id, "del ",qs?.find(t=>t.id ===quesno)?.del);

        while(qs?.find(t=>t.id ===qno.current)?.del==true  && quesno<=total-1)
        {
          qno.current= qno.current+1;
          console.log("found ",qno);
          //console.log("questions ",qs[0]);
          setQues(qno.current);
        }
          if(qno.current==total)
          {
              console.log("exit");
              handleClickOpen2();
          }

          cur=qs?.find(t=>t.id ===qno.current);
          setChosen('');
        }
      }
        //console.log("qn ",qno);
    
  //   const btn = document.querySelector('#btn');        
  //   const radioButtons = document.querySelectorAll('radio');
  //   btn.addEventListener("click", () => {
  //     let chosen=true;
  //     for (const radioButton of radioButtons) {
  //         if (radioButton.checked) {
  //           chosen=false;
  //         }
  //     }
  //     if(chosen)
  //     {
  //       setAlert(true);
  //     }
  //     // show the output:
  // });
    const handleAlert=()=>{
      setAlert(false);
      console.log("a ",alert);
    }
    

    const handleChange = (event, id) => {
      setOpen3(false);
        setChosen(event.target.value);
        setorder([...order,id]);
        setAns([...ans,event.target.value]);
        console.log("ans after ",ans);
        if(event.target.value==cur.correct)
        {
            score.current=parseInt(score.current)+parseInt(cur?.points);
            setMarks(score.current);
        }
        console.log("order ",order);
        
      };
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
    </Box>
  );
  const card = (
    <React.Fragment>
      <CardContent>
        {open3 ? (<><h3>Please select an option!</h3></>):null}
        <Typography sx={{ fontSize: 24, fontWeight:1.85, m:1,p:1, backgroundColor:'#e1bee7' , borderRadius:2, boxShadow:3}} color="text.secondary" gutterBottom>
        {cur?.ques}
        </Typography>
      </CardContent>
      <CardActions>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        onChange={e => handleChange(e, cur?.id)}
        sx={{marginLeft:7}}
      >
        {cur?.options?.map(doc=>{return (
            <div key={Math.random()}>
                {doc!=''?(
                <FormControlLabel sx={{fontSize: 18, fontWeight:1.55, m:0.5,p:0.7, width:350, backgroundColor:'#e1bee7' , borderRadius:2, boxShadow:3}} name="radio" value={doc} control={<Radio />} label={doc} />
                ):null}
            </div>
        )})}
        </RadioGroup>
      </CardActions>
      <Button id="btn" sx={{backgroundColor:'white', boxShadow:2 ,marginLeft:25, marginTop:3, '&:hover': {
          backgroundColor: '#eeeeee',
      }}} onClick={e=>handlenext()}> Next <ArrowForwardIosSharpIcon/></Button>
    </React.Fragment>
  );
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  function ChildModal() {
    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = () => {
      setOpen3(true);
    };
    const handleClose3 = () => {
      setOpen3(false);
    };
    return (
      <React.Fragment>
        <Button onClick={handleOpen3}>View Report</Button>
        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Congratulations, Your responses have been submitted!</h2>
            <p id="child-modal-description">
             
            </p>
            <Button onClick={e => { navigate('/report',{ state: { name:name, ans: ans, nat:nat, marks:marks, total:total, order:order} })}}>View Results</Button>
            <Button onClick={handleClose3}>Close</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }


  const handleTime=()=>{
    
    setLogic(true);
    if(result?.units=='Seconds')
      setTime(Date.now() + result?.time * 1000);
    else
      setTime(Date.now() + (result?.time)*60 * 1000);
  }
  
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    console.log("2");
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <div>
      
       {alertradio? (<>
        <Alert severity="error">Please select an option</Alert></>):null}
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
            <MenuIcon onClick={()=> {navigate('/display')}} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=> {navigate('/display')}}>
            Return to the Menu
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
    <Stack direction="row" spacing="2" sx={{}}>
      <Box
        component="span"
        sx={{
          display: 'block',
          alignItems:'center',
          marginLeft:'70',
         
          borderRadius: 2,
          fontSize: '1.575rem',
          fontWeight: '700',
          backgroundColor:'#e1bee7' ,
          // '6a1b9a',
      p:1,
      m:1,
        }}
      >
       Welcome to the Quiz {result?.name}, Press Play to start
      </Box>
      
      <PlayCircleOutlineRoundedIcon onClick={e=>handleTime()} sx={{
        width: 50,
        height:50,
        backgroundColor:'#e8eaf6',
        marginLeft:30,
        m:2,
        borderRadius:2,
        '&:hover': {
          backgroundColor: '#eeeeee',
          width:55,
          height:55
      }}}/>
      </Stack>
    </div>
    <Box
        component="span"
        sx={{
          display: 'block',
          alignItems:'center',
          marginLeft:'70',
         p:0.5,
          borderRadius: 2,
          fontSize: '1.075rem',
          fontWeight: '700',
          backgroundColor: purple[50],
          
          marginLeft:2,
          marginRight:2
        }}
      >
<h2>{result?.desc}</h2>
<h3> You have {result?.time} {cq?.units=='Seconds' ? 'Seconds' : 'Minutes'} to complete the Quiz!</h3>

</Box>


{logic?(
    <>
    <Countdown
    sx={{display:'inline-block',marginLeft:65}}
    date={time}
    renderer={renderer}
  />
   <Box sx={{ minWidth: 275 , height:'fit-content'}}>
    {!cur?.del ? (<>      <Card sx={{backgroundColor:'#ce93d8', width:500, height:'fit-content',boxShadow:4,border : '#4a14ac', m:2, marginLeft:65, marginTop:1, display:'inline-block'}} variant="outlined">{card}</Card>
</>):null}
    </Box>
   
    </>
):null}
      {timeup? (<><Modal
        keepMounted
        open={timeup}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
           Your time is up!
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          <Button onClick={e => { navigate('/report',{ state: { name:name, ans: ans, nat:nat, marks:marks, total:total} })}}> Click here to view your report!</Button> 
          </Typography>
        </Box>
      </Modal></>) :null}
      {open2?(<><Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Finished the quiz?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have finished Quiz before time!
            Are you sure you want to submit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Disagree</Button>
          <Button autoFocus>
           <ChildModal/>
          </Button>
        </DialogActions>
      </Dialog></>):null}
      
    </div>
  )
  
}


export default Quiz