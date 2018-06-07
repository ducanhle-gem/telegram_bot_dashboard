angular.module('page').controller('HomeCtrl',function($scope, $http, botConfig){
    var $hmCtrl = this;
    $hmCtrl.listMessage = [];
    $http.get(botConfig.apiEndpoint + '/api/telegram-messages/messages/', {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        console.log(response.data.results)
        $hmCtrl.listMessage = response.data.results;
    })

});
