import React from 'react'
import {signInWithGoogle} from '../config/firebase';
import { red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Box from '@mui/material/Box';
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { useNavigate } from 'react-router';
import thinking from '../assets/thinking.png';
import Typography from '@mui/material/Typography';
const Signin = () => {
    const navigate = useNavigate();
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
    const signIn = () => {
        var provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(result=>{
            const name = result.user.displayName;
            navigate('/home', { state: { name:name } });
            console.log("n ",result);
          }).catch(error => {
            console.log("error ",error);
          })
    }
  return (
    <div>
      <Box 
      sx={{}}>
       <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={thinking}
        alt="Live from space album cover"
      />
    </Card>
      {/* <Box
      sx={{
        height: 400,
        border : 1
      }}>
      <Box
        component="img"
        sx={{
          height: 250,
          width: 250,
          marginLeft: 20,
          marginTop:5,
          
        }}
        alt="The house from the offer."
        src={thinking}
      />
      <Box sx={{ width: '100%', maxWidth: 500,
    display:'inline-block',
    }}>
      <Typography variant="h1" gutterBottom>
        Quiz App
      </Typography>
    </Box>
    </Box> */}
        <button onClick={() => signIn()}>Sign in</button>
        </Box>
    </div>
  )
}

export default Signin