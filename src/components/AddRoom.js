import React, { useState } from 'react';
import {
    useHistory
} from "react-router-dom";
import { Container,IconButton } from '@material-ui/core';
import {
    Alert,
   
    Spinner,
    Form,
   
    FormGroup, 
    Label, 
    Input
} from 'reactstrap';
import firebase from '../Firebase';
import AddIcon from '@material-ui/icons/Add';
function AddRoom() {
    const history = useHistory();
    const [room, setRoom] = useState({ roomname: '' });
    const [showLoading, setShowLoading] = useState(false);
    const ref = firebase.database().ref('rooms/');

    const save = (e) => {
        e.preventDefault();
        setShowLoading(true);
        ref.orderByChild('roomname').equalTo(room.roomname).once('value', snapshot => {
            if (snapshot.exists()) {
                return (
                    <div>
                        <Alert color="primary">
                            Room name already exist!
                        </Alert>
                    </div>
                );
            } else {
                const newRoom = firebase.database().ref('rooms/').push();
                newRoom.set(room);
                history.goBack();
                setShowLoading(false);
            }
        });
    };

    const onChange = (e) => {
        e.persist();
        setRoom({...room, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <Container>
            {showLoading &&
                <Spinner color="primary" />
            }
            <Container>
                <h2>Please enter new Room</h2>
                <Form onSubmit={save}>
                    <FormGroup>
                        <Label>Room Name</Label>
                        <Input type="text" name="roomname" id="roomname" placeholder="Enter Room Name" value={room.roomname} onChange={onChange} />
                        <IconButton variant="outlined" color="secondary"type="submit">
                        <AddIcon/>
                    </IconButton>
                    </FormGroup>
                    
                </Form>
            </Container>
            </Container>
        </div>
    );
}

export default AddRoom;