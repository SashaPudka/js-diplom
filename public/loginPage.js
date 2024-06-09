'use strict'

const UserForm = new Object(); 

UserForm.loginFormCallback = function(data) {
    ApiConnector.login (data, response => {
      if (response) {  //в случае успеха
        location.reload();
      } else {
        UserForm.setLoginErrorMessage(message);
    };
  });
};

UserForm.registerFormCallback = function(data) {
  ApiConnector.register (data, response => {
    if (response) {  //в случае успеха
      location.reload();
    } else {
      UserForm.setRegisterErrorMessage(message);
    };
  });
};