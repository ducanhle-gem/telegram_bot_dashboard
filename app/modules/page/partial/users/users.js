angular.module('page').controller('UsersCtrl',function($scope, $http, botConfig){
    var $usrCtrl = this;

    $usrCtrl.userList = [];

    $http.get(botConfig.apiEndpoint + '/api/telegram-messages/users/', {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        $usrCtrl.userList = response.data.results;
    })
});
