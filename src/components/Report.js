import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';
import { doc, getDoc,onSnapshot, collection, query, where } from "firebase/firestore";
import db from "../config/firebase";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useCollectionData} from "react-firebase-hooks/firestore";
import Box from '@mui/material/Box';
import { PieChart } from "react-minimal-pie-chart";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { purple } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
const Report = () => {
  const navigate = useNavigate();
    const {state} = useLocation();
    const {name}=state;
    const {ans}=state;
    const {nat}=state;
    const {marks}=state;
    const {total}=state;
    const {order}=state;
    const {corr}=state;
    const query2= collection(db,`quiz/${name}/questions`);
    var [qs,loading2,error2]=useCollectionData(query2);
    console.log("ans ",ans);
    console.log("q ",name);
    const [arrno,setarrno]=useState(0);
    const [tot,settot]=useState(0);
    const [t,setT]=useState(0);   
    const [w,setw]=useState(qs?.length)

    console.log("correct ", (marks/total)*100,  "ma ", nat)
    //     var m={ ans[arrno] === cor ? points: 0};
    //     settot(tot+m);
    // }
    const incarr=()=>{
      var val;
      // if(doc.correct==ans[qs?.length-index-1])
      // {
      //   val=doc.points;
      //   settot(tot+doc.points);
      // }
      // else
      // {
      //   val=0;
      // }
      // return <span>val</span>
    }
    
    let data=[{ title: "Correct", value: (corr/order.length)*100, color: "#FFC074" },
    { title: "Wrong", value: ((order.length-corr)/order.length)*100, color: "#A2D2FF" },];
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={()=>{navigate('/home', { state: { name:'' } })}} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>{navigate('/home', { state: { name:'' } })}}>
            Return to the menu
          </Typography>
          <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
              
              </IconButton>
          <Button color="inherit" onClick={()=> {navigate('/display')}}>Take another Quiz</Button>
        </Toolbar>
      </AppBar>
    </Box>
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
      Here's your report for the Quiz {name}
      </Box>
      <Box sx={{display:'flex',justifyContent:'center'}}>
        {loading2 &&  <CircularProgress sx={{width:'fit-content',height:50,marginLeft:100,marginTop: 30}}/>}
      <Stack direction="row" sx={{scroll:true}}>
      {order?.map((doc,index)=>(<Card sx={{ width: 200,height: 'fit-content',m: 2, backgroundColor:purple[50], border:purple[200], boxShadow:4 }}  key={doc.id + 1}>
        {!qs?.find(t=>t.id ===doc)?.del ? (<>
          <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>

         { qs?.find(t=>t.id ===doc)?.ques}
       
        </Typography>
        <Typography variant="h5" component="div">
        <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group">
        { qs?.find(t=>t.id ===doc)?.options?.map(opt=>{return (
            <div >
               {opt!=''?(
                <FormControlLabel checked={qs?.find(t=>t.id ===doc)?.correct==opt ? true : false} value={doc} control={<Radio />} label={opt}><Typography>{opt}</Typography></FormControlLabel>
               ):null}
            </div>
        )})}
        </RadioGroup>
        </Typography>
        
        <Typography variant="body2">
          Correct Answer : {qs?.find(t=>t.id ===doc)?.correct}
          <br />
          Option given : {ans[index]}
          <br/>
          Points Secured : {qs?.find(t=>t.id ===doc)?.correct==ans[index]?qs?.find(t=>t.id ===doc)?.points : 0 }
          {/* {doc.correct==ans[qs?.length-index-1]?doc.points: 0} */}
          
        </Typography>
       
      </CardContent>
        
        </>):null}
   
      <CardActions>
      
        
      </CardActions>
    </Card>))}

        </Stack>
      </Box>
      <Box sx={{justifyContent:'center', display:'flex'}}>
      <Stack direction="row" sx={{scroll:true}}>
          <Card>
            <CardContent>
          <Box
        component="span"
        sx={{
          display: 'block',
          alignItems:'center',
          marginLeft:'10',
         
          borderRadius: 2,
          fontSize: '1.275rem',
          fontWeight: '500',
          backgroundColor:'#e1bee7' ,
          // '6a1b9a',
      p:1,
      m:1,
        }}
      >
      Total Score  : {marks}
      </Box>
      <Box
        component="span"
        sx={{
          display: 'block',
          alignItems:'center',
          marginLeft:'10',
         
          borderRadius: 2,
          fontSize: '1.275rem',
          fontWeight: '500',
          backgroundColor:'#e1bee7' ,
          // '6a1b9a',
      p:1,
      m:1,
        }}
      >
      Percentage : { (corr/total)*100} %

      {/* Wrong :  {wrong} */}
      </Box>
      </CardContent>
          </Card>
          <PieChart
  
   center={[25, 25]}
   data={data}
   labelPosition={20}
   lengthAngle={360}
   lineWidth={40}
   paddingAngle={0}
   radius={20}
   rounded
   startAngle={0}
   viewBoxSize={[50, 50]
  }labelStyle={{
    fontSize: "3px",
    fontColor: "FFFFFA",
    fontWeight: "50",
    fontFamily: "monospace"
  }}
  label={(data) => data.dataEntry.title}
  labelPosition={100}
      />
          </Stack>
      </Box>
    </div>
  )
}

export default Report