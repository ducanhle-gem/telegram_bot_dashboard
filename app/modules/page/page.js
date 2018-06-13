angular.module('page', ['ui.bootstrap', 'ui.router','ngAnimate']);

angular.module('page').config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'modules/page/partial/home/home.html'
    });
    $stateProvider.state('hour-stat', {
        url: '/hour-stats',
        templateUrl: 'modules/page/partial/hour-stat/hour-stat.html'
    });
    $stateProvider.state('users', {
        url: '/users',
        templateUrl: 'modules/page/partial/users/users.html'
    });
    $stateProvider.state('groups', {
        url: '/groups',
        templateUrl: 'modules/page/partial/groups/groups.html'
    });
    $stateProvider.state('coinmarketcap', {
        url: '/coinmarketcap',
        templateUrl: 'modules/page/partial/coinmarketcap/coinmarketcap.html'
    });
    $stateProvider.state('cryptocompare', {
        url: '/cryptocompare',
        templateUrl: 'modules/page/partial/cryptocompare/cryptocompare.html'
    });
    /* Add New States Above */

});

