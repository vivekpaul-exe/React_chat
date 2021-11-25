// Css Chat
import 'react-chat-elements/dist/main.css';

import React, { useState, useEffect } from 'react';
import {
    useHistory,
    useParams
  } from "react-router-dom";
import {MessageBox} from "react-chat-elements"
// import Me,ssageList from '../assets/components/MessageList'
import { useStyles } from "./styles"
import {
    Form,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import {Container , TextField , IconButton, 
    Grid,
        AppBar , 
        Toolbar ,
        Typography,
        Button,Chip,
    Input,
    InputAdornment} from "@material-ui/core"

import Moment from 'moment';
import TimeAgo from 'timeago-react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import firebase from '../Firebase';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../Styles.css';
import PeaIcon from '../containers/PeaIcon';
import MenuIcon from '@material-ui/icons/Menu';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';

function ChatRoom() {
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [nickname, setNickname] = useState('');
    const [roomname, setRoomname] = useState('');
    const [newchat, setNewchat] = useState({ roomname: '', nickname: '', message: '', date: '', type: '' });
    const history = useHistory();
    const { room } = useParams();
    const [showEmoji, setShowEmoji] = useState(false);
    const [value , setValue] = useState('')
    
    const toggleEmoji = () => setShowEmoji(!showEmoji);
    const classes = useStyles();
   

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleChange();
    }
  };

  const onEmojiSelect = (e) => {
    handleChange({
      target: {
        value: value + e.native,
      },
    });
  };


    useEffect(() => {
        const fetchData = async () => {
            setNickname(localStorage.getItem('nickname'));
            setRoomname(room);
            firebase.database().ref('chats/').orderByChild('roomname').equalTo(roomname).on('value', resp => {
              setChats([]);
              setChats(snapshotToArray(resp));
            });
        };
        fetchData();
    }, [room, roomname]);

    useEffect(() => {
        const fetchData = async () => {
            setNickname(localStorage.getItem('nickname'));
            setRoomname(room);
            firebase.database().ref('chats/').orderByChild('roomname').equalTo(roomname).on('value', resp => {
              setChats([]);
              setChats(snapshotToArray(resp));
              console.log(chats)
            });
            
        };
      
        fetchData();
    }, [room, roomname]);
    

    const snapshotToArray = (snapshot) => {
        const returnArr = [];

        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    }

    const submitMessage = (e) => {
        e.preventDefault();
        const chat = newchat;
        chat.roomname = roomname;
        chat.nickname = nickname;
        chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
        chat.type = 'message';
        

        const newMessage = firebase.database().ref('chats/').push();
        newMessage.set(chat);
        setNewchat({ roomname: '', nickname: '', message: '', date: '', type: '' });
    };

    const handleChange = (e) => {
         e.persist();
        setNewchat({...newchat, [e.target.name]: e.target.value});
    }

    const exitChat = (e) => {
        const chat = { roomname: '', nickname: '', message: '', date: '', type: '' };
        chat.roomname = roomname;
        chat.nickname = nickname;
        chat.date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
        chat.message = `${nickname} leave the room`;
        chat.type = 'exit';
        const newMessage = firebase.database().ref('chats/').push();
        newMessage.set(chat);
    
        firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).once('value', (resp) => {
          let roomuser = [];
          roomuser = snapshotToArray(resp);
          const user = roomuser.find(x => x.nickname === nickname);
          if (user !== undefined) {
            const userRef = firebase.database().ref('roomusers/' + user.key);
            userRef.update({status: 'offline'});
          }
        });
        
    
        history.goBack();
    }

    return (
        <div className="Container main">
        <AppBar position="fixed" className={classes.appbar}>
              <Toolbar>
               
                <Typography variant="h4" className={classes.title}>
                  #chats
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
            <div className="container">
                
                   <div className="demo">
                       {/* {chats.map((item,idx) => (
                           <MessageBox key={idx}
                            position={`${item.nickname === nickname? "right":"left"}`}
                                type={`${item.type === message}`}
                                text={item.message}
                                />
                               
                      
                       ))} */}
                   
                   </div>
                    <Container >
                    {/* <svg xmlns='http://www.w3.org/2000/svg'  width='100' height='100' viewBox='0 0 100 100'><rect fill='#ffffff' width='100' height='100'/><g  stroke='#434343' stroke-width='0' stroke-opacity='1'><rect  fill='#2E2EEC' x='-60' y='-60' width='110' height='240'/></g></svg> */}
                    
                        <ScrollToBottom className="ChatContent" style="height:90vh">
                            
                        {chats.map((item, idx) => (
                            
                                <div key={idx} className="MessageBox">
                                    {item.type ==='join'||item.type === 'exit'?
                                        <div className="ChatStatus">
                                        
                                            <Chip label={item.message} className={classes.chip}/>
                                        </div>:
                                        
                                        // <div className="ChatMessage">
                                        //     <div>
                                            
                                        //     <div className={`${item.nickname === nickname? "RightBubble":"LeftBubble"}`}>
                                            
                                        //     <p className="text">{item.message}</p>
                                        //     {item.nickname === nickname ? 
                                        //         <span className="MsgName">Me</span>:<span className="MsgName">{item.nickname}</span>
                                        //     }
                                        //     <span className="MsgDate">  <TimeAgo datetime={item.date} /></span>
                                        //     </div>
                                            
                                        //     </div>
                                            
                                        // </div>
                                        <MessageBox key={idx}
                                        position={`${item.nickname === nickname? "right":"left"}`}
                                            type={'text'}
                                            text={item.message}
                                            title={item.nickname}
                                            status ='read'
                                            />
                                    }
                                </div>
                                
                            ))}
                        </ScrollToBottom>
                        
                    
                        
                    </Container>
                
            </div>
            <footer class="footer ">
                          <Container className="msg-container">
                            <Form className="MessageForm" onSubmit={submitMessage} autocomplete="off" >
                                
                                 <Grid
                                  container
                                  spacing={1}
                                  alignItems="center"
                                  classes={{ container: classes.root }}
                                >
                                    <Grid item>
                                        <label htmlFor="pea-message-input-upload">
                                          <input
                                            className={classes.fileInput}
                                            id="pea-message-input-upload"
                                            type="file"

                                          />
                                          <AttachFileRoundedIcon className ={classes.svgsend} color="#242424"/>
                                        </label>
                                      </Grid> 
                                    <Grid item classes={{ item: classes.flex }} container>
                                    <Input
                                      id="message-input"
                                      fullWidth
                                      disableUnderline
                                      classes={{ root: classes.inputRoot }}
                                      margin="none"
                                    name="message"
                                    value={newchat.message} 
                                      variant="outlined"
                                      onKeyUp={onKeyUp}
                                      onChange={handleChange}
                                     
                                      placeholder="Type your message"
                                      endAdornment={
                                        <InputAdornment position="end" onClick={toggleEmoji}>
                                          {!showEmoji ? (
                                            <EmojiEmotionsIcon


                                              className={classes.emoji}
                                            />
                                          ) : (
                                            <PeaIcon
                                              icon="fas fa-times-circle"
                                              alt="emoji-picker-close"
                                              className={classes.icon}
                                            />
                                          )}
                                        </InputAdornment>
                                      }
                                    />
                                </Grid>
                                <Grid item>
                                    <IconButton type="submit">
                                          <ion-icon 
                                          className={classes.icon}
                                         
                                          name="send"></ion-icon>
                                    </IconButton>

                                      </Grid>
                                    </Grid>

                         
                                </Form>
                          </Container>
            </footer>
        </div>
    );
}

export default ChatRoom;