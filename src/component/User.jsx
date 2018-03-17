import React from 'react';

const User = ({state, action}) => {
  return (
    <div className='User'>
      <div className="row">
        <div className="col">
          <label>Vorname</label>
        </div>
        <div className="col">
          <input type="text" id="firstName" name="firstName" placeholder="Vorname" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>Nachname</label>
        </div>
        <div className="col">
          <input type="text" id="lastName" name="lastName" placeholder="Nachname" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>Login-Name</label>
        </div>
        <div className="col">
          <input type="text" id="loginName" name="loginName" placeholder="Login-Name" />
        </div>
      </div>
    </div>
  );
};


export default User;
