import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';

import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import User from './User';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#7cb342',
    primary2Color: '#aee571',
    primary3Color: '#4b830d',
    accent1Color: '#33691e',
    accent2Color: '#629749',
    accent3Color: '#003d00'
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
        <AppBar title="Title" iconElementLeft={<IconButton onClick = {
            () => this.toggleMenu()
          } > <MenuIcon/>
        </IconButton>}></AppBar>
        <Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})}></Drawer>
        <div className="content">
          <User apiUrl={this.props.apiUrl}/>
        </div>
      </div>
    </MuiThemeProvider>;
  }

};

export default App;
