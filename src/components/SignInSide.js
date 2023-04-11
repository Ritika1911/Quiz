import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import GoogleIcon from '@mui/icons-material/Google';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import vote from '../assets/vote.png';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
const theme = createTheme();

export default function SignInSide() {
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://repository-images.githubusercontent.com/182525249/aadd7a80-54fe-11eb-9872-ccd06b8789b6)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{
              m: 1, bgcolor: 'secondary.main' }}>
              <AccountCircleTwoToneIcon />
            </Avatar>
            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '1.575rem',
          fontWeight: '700',}}>
            Welcome!
          </Typography>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={vote}
          alt="green iguana"
        />
        <CardContent>
         
          <Typography variant="p" color="text.secondary" sx={{ fontSize: '1.375rem',
          fontWeight: '250',justifyContent:'center'}}>
          Looking to test your knowledge? Check out our app, with a variety of categories and challenging questions!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
            <Button variant="contained" 
            sx={{
              m: 3}}
              startIcon={<GoogleIcon />} onClick={() => signIn()}>
        Sign In with Google
      </Button>
          </Box>
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}