angular.module('page', ['ui.bootstrap', 'ui.router','ngAnimate']);

angular.module('page').config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'modules/page/partial/home/home.html'
    });
    /* Add New States Above */

});

