import React from 'react';

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
        this.setState({loginName: event.target.value});
        break;
      case 'password':
        this.setState({password: event.target.value});
        break;
      default:
        break;
    }
  }

  handleSubmit(event) {
  event.preventDefault();
    fetch('127.0.0.1:3001', {
      method: 'POST',
      data: {
        user: this.state
      }
    }).then(function(response) {
      return response.json()
    }).then(function(body) {
      console.log(body);
    });
  }

  render() {
    return (<Form onSubmit={(e) => this.handleSubmit(e)}>
      <Row>
        <Col>
          <FormGroup>
            <Label for="firstName">Vorname</Label>
            <Input type="text" name="firstName" id="firstName" placeholder="Vorname" value={this.state.fistName} onChange={(e) => this.handleChange(e)}/>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="lastName">Nachname</Label>
            <Input type="text" name="lastName" id="lastName" placeholder="Nachname" value={this.state.lastName} onChange={(e) => this.handleChange(e)}/>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="loginName">Login-Name</Label>
            <Input type="text" name="loginName" id="loginName" placeholder="Login-Name" value={this.state.loginName} onChange={(e) => this.handleChange(e)}/>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="password">Passwort</Label>
            <Input type="password" name="password" id="password" placeholder="********" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={{
            size: 4,
            offset: 8
          }}>
          <Button color="primary" block={true}>Speichern</Button>
        </Col>
      </Row>
    </Form>);
  }
}

export default User;
