import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router';
import {useLocation} from 'react-router-dom';
import {getAuth, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";
import home from '../assets/home';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import icon from '../assets/icon.png';
import test from '../assets/test.png';

const Home = () => {
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
    const {name} = state;
    const navigate = useNavigate();
    const createfun = () => {
        console.log("clicked");
        navigate('/create')
      }

      const takequiz = () => {
        console.log("clicked");
        navigate('/display')
      }
      const signOutfun= ()=> {
        signOut(auth);
        console.log("signed out");
        navigate('/');
      }
  return (
    <div>
      <Box>
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
          <Button color="inherit" onClick={signOutfun}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Typography gutterBottom variant="h3" component="div" sx={{
        m:2
      }}>
        Hello {name}!
          </Typography>
          </Box>
          <Box sx={{
            marginLeft:5
          }}>
<Card sx={{maxWidth: 345, maxHeight:345,display:'inline-block', margin:6 }} onClick={e => createfun()}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={icon}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create a new Quiz.
          </Typography>
          <Typography variant="p" color="text.secondary">
          Chose grading, questions and customize your quiz!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345, maxHeight:345,display:'inline-block', margin:6 }} onClick={e => takequiz()}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image={test}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Take a Quiz!
          </Typography>
          <Typography variant="p" color="text.secondary">
          Test your knowledge, chose amongst varied choices!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ width: 345, height:345,display:'inline-block', margin:6 }} onClick={e => {navigate('/editdisplay')}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkxr5KXDuQFzJ2kXUbxrAIkV2sC_1paZIeVg&usqp=CAU
          "
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Edit Quiz
          </Typography>
          <Typography variant="p" color="text.secondary">
         Add/ Delete Options and Questions.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
          </Box>
        <ButtonGroup
  disableElevation
  variant="contained"
  aria-label="Disabled elevation buttons"
>

</ButtonGroup>

    </div>
  )
}

export default Home;