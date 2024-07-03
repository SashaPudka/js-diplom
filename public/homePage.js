'use strict'

 //выход из личного кабинета//

const logoutButton = new LogoutButton(); 

logoutButton.action = () => {
    ApiConnector.logout (response => {
      if (response.success) { 
        location.reload();
      }
    });
  };

  //Получение информации о пользователе//

  ApiConnector.current (response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
      }
    })

    //Получение текущих курсов валюты//

    const ratesBoard = new RatesBoard(); 

    function getCurrency() {
      ApiConnector.getStocks((response) => {
        if(response.success) {
          ratesBoard.clearTable();
          ratesBoard.fillTable(responce.data);
        }
      })
    }

    getCurrency();
    setTimeout(getCurrency, 60_000);

    
    //Операции с деньгами//

    const moneyManager = new MoneyManager();

    moneyManager.addMoneyCallback = (data) => {
      ApiConnector.addMoney(data, (response) => {
        if (response.success) {
          ProfileWidget.showProfile(response.data);
          moneyManager.setMessage(response.success, 'Account has been replenished');
        } else {
          moneyManager.setMessage(response.success, response.error);
        }
      });
    };

    moneyManager.conversionMoneyCallback = (data) => {
      ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
          ProfileWidget.showProfile(response.data);
          moneyManager.setMessage(response.success, 'Currency conversion has been completed');
        } else {
          moneyManager.setMessage(response.success, response.error);
        }
      });
    };

    moneyManager.sendMoneyCallback = (data) => {
      ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
          ProfileWidget.showProfile(response.data);
          moneyManager.setMessage(response.success, 'Currency transfer has been completed');
        } else {
          moneyManager.setMessage(response.success, response.error);
        }
      });
    };

   //Работа с избранным//

   const favoritesWidget = new FavoritesWidget();

   ApiConnector.getFavorites(responce => {
     if (responce.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(responce.data);
      favoritesWidget.updateUsersList(responce.data);
     };
   });

   favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, (responce) => {
      if(responce) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responce.data);
        favoritesWidget.updateUsersList(responce.data);
        favoritesWidget.setMessage(responce.success, 'added to the favorites list');
      } else {
        favoritesWidget.setMessage(response.success, response.error);
      };
    });
   }

   favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, (responce) => {
      if(responce) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responce.data);
        favoritesWidget.updateUsersList(responce.data);
        favoritesWidget.setMessage(responce.success, 'removed from the favorites list');
      } else {
        favoritesWidget.setMessage(response.success, response.error);
      };
    });
   }
