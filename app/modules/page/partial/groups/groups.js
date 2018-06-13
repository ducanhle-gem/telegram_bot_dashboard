angular.module('page').controller('GroupsCtrl',function($scope, $http, botConfig){
    var $grpCtrl = this;
    $grpCtrl.groupList = [];
    $grpCtrl.currentPage = 1;
    $grpCtrl.perPage = 100;
    $grpCtrl.showSpinner = true;

    $http.get(botConfig.apiEndpoint + '/api/telegram-messages/groups/', {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        $grpCtrl.showSpinner = false;
        $grpCtrl.totalItems = response.data.count;
        $grpCtrl.groupList = response.data.results;
    });

    $grpCtrl.pageChanged = function () {
        $grpCtrl.showSpinner = true;
        $http.get(botConfig.apiEndpoint + '/api/telegram-messages/groups/?page=' + $grpCtrl.currentPage, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            $grpCtrl.showSpinner = false;
            $grpCtrl.groupList = response.data.results;
        });
    }
});
