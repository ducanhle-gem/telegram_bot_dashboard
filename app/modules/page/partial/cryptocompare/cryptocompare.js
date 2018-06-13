angular.module('page').controller('CryptocompareCtrl',function($scope, $http, botConfig){
    var $ccCtrl = this;
    $ccCtrl.listStats = [];
    $ccCtrl.currentPage = 1;
    $ccCtrl.perPage = 100;
    $ccCtrl.showSpinner = true;

    $http.get(botConfig.apiEndpoint + '/api/scrapy/cryptocompare/', {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        $ccCtrl.showSpinner = false;
        $ccCtrl.totalItems = response.data.count;
        $ccCtrl.listStats = response.data.results;
    });

    $ccCtrl.pageChanged = function () {
        $ccCtrl.showSpinner = true;
        $http.get(botConfig.apiEndpoint + '/api/scrapy/cryptocompare/?page=' + $ccCtrl.currentPage, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            $ccCtrl.showSpinner = false;
            $ccCtrl.listStats = response.data.results;
        });
    }

});
