(function() {
    'use strict';

	angular
		.module('metronome', [ 'ionic' ])
        .config(($stateProvider, $urlRouterProvider) => {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('index', {
                    url: '/',
                    views: {
                        'leftMenu': { template: '<pi-metronome-menu></pi-metronome-menu>' },
                        'main': { template: '<pi-metronome></pi-metronome>' }
                    }
                });
        });
})();