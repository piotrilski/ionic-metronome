(function() {
    'use strict';

    angular.module('metronome')
        .component('piMetronomeMenu', {
            templateUrl: 'metronome/metronome-menu/metronome-menu.html',
            bindings: {},
            controller: 'MetronomeMenuController',
            controllerAs: 'mmc'
        });
})();