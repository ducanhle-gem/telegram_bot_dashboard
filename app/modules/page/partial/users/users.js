angular.module('page').controller('UsersCtrl',function($scope, $http, botConfig){
    var $usrCtrl = this;

    $usrCtrl.userList = [];
    $usrCtrl.currentPage = 1;
    $usrCtrl.perPage = 100;
    $usrCtrl.showSpinner = true;

    $http.get(botConfig.apiEndpoint + '/api/telegram-messages/users/', {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        $usrCtrl.showSpinner = false;
        $usrCtrl.totalItems = response.data.count;
        $usrCtrl.userList = response.data.results;
    });

    $usrCtrl.pageChanged = function () {
        $usrCtrl.showSpinner = true;
        $http.get(botConfig.apiEndpoint + '/api/telegram-messages/users/?page=' + $usrCtrl.currentPage, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            $usrCtrl.showSpinner = false;
            $usrCtrl.userList = response.data.results;
        });
    }
});
