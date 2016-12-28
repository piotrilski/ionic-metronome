(function() {
    'use strict';

    angular.module('metronome')
        .controller('MetronomeNoteSelectorController', MetronomeNoteSelectorController);

    MetronomeNoteSelectorController.$inject = [];

    function MetronomeNoteSelectorController() {
        let vm = this;
        
        vm.changeNote = changeNote;
         
        function changeNote(inpt) {
            let note = parseInt(inpt, 10);

            vm.onNoteChange({note: vm.note});
        }
    }
})();