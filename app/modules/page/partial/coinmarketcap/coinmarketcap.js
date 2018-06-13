angular.module('page').controller('CoinmarketcapCtrl',function($scope, $http, botConfig){

    var $cmCtrl = this;
    $cmCtrl.listStats = [];
    $cmCtrl.currentPage = 1;
    $cmCtrl.perPage = 100;
    $cmCtrl.showSpinner = true;

    $http.get(botConfig.apiEndpoint + '/api/scrapy/coinmarketcap/', {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(function (response) {
        $cmCtrl.showSpinner = false;
        $cmCtrl.totalItems = response.data.count;
        $cmCtrl.listStats = response.data.results;
    });

    $cmCtrl.pageChanged = function () {
        $cmCtrl.showSpinner = true;
        $http.get(botConfig.apiEndpoint + '/api/scrapy/coinmarketcap/?page=' + $cmCtrl.currentPage, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            $cmCtrl.showSpinner = false;
            $cmCtrl.listStats = response.data.results;
        });
    }
});
