import React, { useState } from 'react';
import './Todo.css';
import { Button, Input, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgoundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows [5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        //updates with new text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true});


        setOpen(false);
    }

    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
        >
        <div className={classes.paper}>
            <h1> Edit Message</h1>
            <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
            <Button onClick={updateTodo}variant="contained" color="Primary"> Update ToDo</Button>
        </div>
        </Modal>
        <List>
            <ListItem>
            <ListItemAvatar>
            </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Dummy Deadline ⏰" />
            </ListItem>
            <Button onClick={e => setOpen(true)} variant="contained" color="Default">Edit</Button>
            <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()} variant="contained" color="Secondary">Delete</Button>

        </List>
        </>
    )
}

export default Todo
