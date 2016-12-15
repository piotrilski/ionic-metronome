(function() {
    'use strict';

    angular.module('metronome')
        .controller('MetronomeBpmSelectorController', MetronomeBpmSelectorController);

    MetronomeBpmSelectorController.$inject = [];

    function MetronomeBpmSelectorController() {
        let vm = this;
        
        vm.changeBpm = changeBpm;
        vm.$onInit = onInit;

        function onInit() {

        }

        function changeBpm(inpt, increase) {
            let bpm = parseInt(inpt, 10);

            if(increase) {
                vm.bpm = bpm < vm.conf.maxBpmValue ? 
                    bpm + 1 : vm.conf.maxBpmValue;
            } else {
                vm.bpm = bpm > vm.conf.minBpmValue ? 
                    bpm - 1 : vm.conf.minBpmValue;
            }

            vm.onBpmChange({bpm: vm.bpm});
        }
    }
})();