(function() {
    'use strict';

    angular.module('metronome')
        .controller('MetronomeController', MetronomeController);

    MetronomeController.$inject = ['$timeout'];

    function MetronomeController($timeout) {
        let vm = this;
        
        vm.bpm = 120;
        vm.conf = {
            minBpmValue: 0,
            maxBpmValue: 300
        };

        vm.$onInit = onInit;
        vm.onBpmChange = onBpmChange;

        function onInit() {
            
        }

        function onBpmChange(bpm) {
            vm.bpm = bpm;
        }       
    }
})();