import React, { Component } from 'react';
import './App.css';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'



export default class App extends Component {
  state = {
    exercises: [
      { id: 1, title: 'Bench Press' },
      { id: 2, title: 'Deadlift' },
      { id: 3, title: 'Squats' }
    ],
    title: ''
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  handleChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    })

  handleCreate = e => {
    e.preventDefault()
    if (this.state.title) {
      this.setState(({ exercises, title }) => ({
        exercises: [
          ...exercises,
          {
            title,
            id: Date.now()
          }
        ],
        title: ''
      }))
    }
  }

  handleDelete = id =>
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }))


  render() {
    const { title } = this.state;
    return (
      <Paper>
        <Typography variant='display1' align='center' gutterBottom>Exercises</Typography>
        <form onSubmit={this.handleCreate}>
          <TextField
            name='title'
            label='Exercise'
            value={title}
            onChange={this.handleChange}
            margin='normal' />
          <Button
            type='submit'
            color='primary'
            variant='raised'>
            Create
          </Button>
        </form>
        <List>
          {
            this.state.exercises.sort(this.dynamicSort('-id')).map(({ id, title }) =>
            <ListItem key={id}>
              <ListItemText primary={title} />
              <ListItemSecondaryAction>
                <IconButton color='primary' onClick={() => this.handleDelete(id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </Paper>
    );
  }
}
