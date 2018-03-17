import React from 'react';
import User from './User';

const App = (state, action) => {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col">
          <h3>Willkommen!</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <User />
        </div>
      </div>
    </div>
  );
};

export default App;
