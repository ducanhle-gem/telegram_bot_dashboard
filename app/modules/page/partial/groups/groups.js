angular.module('page').controller('GroupsCtrl',function($scope, $http, botConfig){
    var $grpCtrl = this;
    $grpCtrl.groupList = [];

    $http.get(botConfig.apiEndpoint + '/api/telegram-messages/groups/', {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        $grpCtrl.groupList = response.data.results;
    })
});
