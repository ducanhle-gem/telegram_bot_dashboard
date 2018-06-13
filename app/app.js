angular.module('telegrambotStat', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'templates', 'angularSpinner', 'page']);

angular.module('telegrambotStat').config(function($stateProvider, $urlRouterProvider, $locationProvider, usSpinnerConfigProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

    usSpinnerConfigProvider.setTheme('fixedTheme', {radius:20, width:5, length: 10, top: '50%', left: '50%', position: 'fixed', transform: 'translate(-50%, -50%)'});

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
