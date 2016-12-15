(function() {
    'use strict';

    angular.module('metronome')
        .component('piMetronome', {
            templateUrl: 'metronome/metronome.html',
            controller: 'MetronomeController',
            controllerAs: 'mc'
        });
})();