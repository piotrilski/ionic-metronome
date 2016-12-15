(function() {
    'use strict';

    angular.module('metronome')
        .component('piMetronomeBpmSelector', {
            templateUrl: 'metronome/metronome-bpm-selector/metronome-bpm-selector.html',
            bindings: {
                bpm: '<',
                conf: '<',
                onBpmChange: '&'
            },
            controller: 'MetronomeBpmSelectorController',
            controllerAs: 'mbsc'
        });
})();