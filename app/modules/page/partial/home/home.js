angular.module('page').controller('HomeCtrl',function($scope, $http, botConfig){
    var $hmCtrl = this;
    $hmCtrl.listMessage = [];
    $hmCtrl.currentPage = 1;
    $hmCtrl.perPage = 100;
    $hmCtrl.showSpinner = true;

    $http.get(botConfig.apiEndpoint + '/api/telegram-messages/messages/', {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        $hmCtrl.showSpinner = false;
        $hmCtrl.totalItems = response.data.count;
        $hmCtrl.listMessage = response.data.results;
    });

    $hmCtrl.pageChanged = function () {
        $hmCtrl.showSpinner = true;
        $http.get(botConfig.apiEndpoint + '/api/telegram-messages/messages/?page=' + $hmCtrl.currentPage, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            $hmCtrl.showSpinner = false;
            $hmCtrl.listMessage = response.data.results;
        });
    }

});
