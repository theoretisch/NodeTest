import React from 'react';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';

import lightgreen from 'material-ui/colors/lightGreen';
import orange from 'material-ui/colors/orange';

import MenuIcon from 'material-ui-icons/Menu';

//import User from './User';

const theme = createMuiTheme({
  palette: {
    primary: lightgreen,
    secondary: orange
  }
});

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  toggleMenu(bool) {
    this.setState({
      open: (bool !== undefined ? bool : !this.state.open)
    })
  }

  render() {
    return (<MuiThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton aria-label="Menu"
              onClick={() => this.toggleMenu()}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="title">
              Title
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.open} onClose={this.toggleMenu(false)}></Drawer>
      </div>
    </MuiThemeProvider>);
  }

};

export default App;
