
import db from "../config/firebase";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import {useCollectionData} from "react-firebase-hooks/firestore"
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
const EditDisplay = () => {
    const query= collection(db,"quiz");
    const [docs,loading,error]=useCollectionData(query);
    console.log("data ",docs);
    const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

    const navigate = useNavigate();
    const takeq=(val)=>{
        console.log("to q ",val);
        navigate('/quiz',{ state: { name:val } });
    }
    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
      }));
      
const themeLight = createTheme({
    palette: {
      background: {
        default: "#E8E8E8"
      }
    }
  });
  return (
    <div >
    {loading && <><Box sx={{marginTop:40,marginLeft:25}}><h1>Fetching available Quizes..</h1><LinearProgress sx={{alignItems:'center', padding: 3}} /></Box></> }
    <Box theme={themeLight} sx={{ flexGrow: 1, maxWidth: 752, backgroundColor:'#ce93d8', border:'black',boxShadow:4 , marginLeft:55, marginTop:5, borderRadius:2}}>
    <Grid item xs={12} md={6}>
          <Typography sx={{p:2}} variant="h6" component="div">
          <Box
        component="span"
        sx={{
          display: 'block',
          marginTop:1,
          alignItems:'center',
          marginLeft:'70',
        //   bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        //   color: (theme) =>
        //     theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          fontSize: '1.575rem',
          fontWeight: '700',
          
        }}
      >
        Pick a quiz to Edit:
      </Box>
          </Typography>
          <Demo>
            <List dense={dense}>
            {docs?.map(doc=>(
              <div>
                <ListItem
               onClick={e=>{navigate('/edit',{ state: { quizId:doc?.id, name:doc?.name}})}}
                sx={{
                    backgroundColor: 'f3e575',
                    '&:hover': {
                        backgroundColor: '#ce93d8',
                        color: 'white',
                    },
                    height:70,
                    fontSize: '1.575rem',
                    fontWeight: '500',
                    display:'inline-block',
                }}
                >
                    <Box sx={{display:'inline-block', marginLeft:7}}>{doc.name}</Box>
                <Box sx={{display:'inline-block', width:50, float:'right'}}>    <EditIcon sx={{display:'inline-block'}} onClick={e=>{navigate('/edit',{ state: { quizId:doc?.id, name:doc?.name}})}}/></Box>
                </ListItem>
                
                  
                  
                </div>
              ))}
            </List>
          </Demo>
        </Grid>
        </Box>
    <ul>
        {/* {docs?.map(doc=>(
            <div key={Math.random()}>
                <li>
                   <p onClick={e=>takeq(doc.name)}>{doc.name} </p>
                </li>
            </div>
        ))} */}
    </ul>
    </div>
  )
}

export default EditDisplay;