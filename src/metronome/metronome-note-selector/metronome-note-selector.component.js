(function() {
    'use strict';

    angular.module('metronome')
        .component('piMetronomeNoteSelector', {
            templateUrl: 'metronome/metronome-note-selector/metronome-note-selector.html',
            bindings: {
                note: '<',
                onNoteChange: '&'
            },
            controller: 'MetronomeNoteSelectorController',
            controllerAs: 'mc'
        });
})();