'use strict'

const UserForm = new Object(); 

UserForm.loginFormCallback = data => {
    ApiConnector.login (data, response => {
      if (response.success) {  
        location.reload();
      } else {
        UserForm.setLoginErrorMessage('Please, enter the details');
    };
  });
};

UserForm.registerFormCallback = data => {
  ApiConnector.register (data, response => {
    if (response.success) { 
      location.reload();
    } else {
      UserForm.setRegisterErrorMessage('Registration want successful');
    };
  });
};