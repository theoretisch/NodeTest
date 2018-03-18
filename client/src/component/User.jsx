import React from 'react';
import {Card, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const axios = require('axios');

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      loginName: '',
      password: ''
    };
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'firstName':
        this.setState({firstName: event.target.value});
        break;
      case 'lastName':
        this.setState({lastName: event.target.value});
        break;
      case 'loginName':
      console.log('handle, before', this.state.loginName);
        this.setState({loginName: event.target.value});
        console.log('handle, after', this.state.loginName);
        this.checkLoginName();
        break;
      case 'password':
        this.setState({password: event.target.value});
        break;
      default:
        break;
    }
  }

  checkLoginName() {
    console.log('check', this.state.loginName);
    axios.get(this.props.apiUrl + '/user/' + this.state.loginName).then(function(response) {
      if (response.status === 201) {
        alert(this.state.loginName + ' wurde angelegt');
      }
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
  }

  saveUser(event) {
    event.preventDefault();
    axios.post(this.props.apiUrl + '/user', this.state).then(function(response) {
      if (response.status === 201) {
        alert(this.state.loginName + ' wurde angelegt');
      }
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return <Card>
      <CardText>
        <TextField floatingLabelText="Vorname" id="firstName" name="firstName" value={this.state.firstName} onChange={(e) => this.handleChange(e)}/>
        <br/>
        <TextField floatingLabelText="Nachname" id="lastName" name="lastName" value={this.state.lastName} onChange={(e) => this.handleChange(e)}/>
        <br/>
        <TextField floatingLabelText="Login-Name" id="loginName" name="loginName" value={this.state.loginName} onChange={(e) => {
          this.handleChange(e);
        }}/>
        <br/>
        <TextField floatingLabelText="Passwort" type="password" id="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
        <br/>
      </CardText>
      <CardActions>
        <FlatButton label="Speichern" onClick={(e) => this.saveUser(e)}/>
      </CardActions>
    </Card>;
  }
}

export default User;
