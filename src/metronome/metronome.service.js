(function() {
    'use strict';

    angular.module('metronome')
        .factory('metronomeService', MetronomeService);

    MetronomeService.$inject = [];

    function MetronomeService() {
        let service = Object.freeze({
            start: start,
            stop: stop
        });

        return service;

        function start(bpm) {
            let bps = bpm / 60.0;
            let intervalBuffer = 1000.0 / bps;

            
        }

        function stop() {

        }
    }
})();