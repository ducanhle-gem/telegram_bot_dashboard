angular.module('telegrambotStat', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'templates', 'page']);

angular.module('telegrambotStat').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('telegrambotStat').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
