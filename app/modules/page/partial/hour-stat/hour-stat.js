angular.module('page').controller('HourStatCtrl',function($scope, $http, botConfig){

    var $hrCtrl = this;
    $hrCtrl.listStats = [];
    $http.get(botConfig.apiEndpoint + '/api/telegram-messages/hour-stats/', {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        $hrCtrl.listStats = response.data.results;
    })
});
