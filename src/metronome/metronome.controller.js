(function() {
    'use strict';

    angular.module('metronome')
        .controller('MetronomeController', MetronomeController);

    MetronomeController.$inject = ['metronomeService'];

    function MetronomeController(metronomeService) {
        let vm = this;
        let audioContext = null;
        
        const bufferPercentageGap = 0.1;
        const frequency = {
            high: 880,
            mid: 440,
            low: 220,
        };

        vm.isPlaying = false;
        vm.bpm = 120;
        vm.note = 4; 
        vm.conf = {
            minBpmValue: 0,
            maxBpmValue: 300
        };

        vm.$onInit = onInit;
        vm.onBpmChange = onBpmChange;
        vm.onNoteChange = onNoteChange;
        vm.play = play;

        function onInit() {
            audioContext = new AudioContext();
        }

        function onNoteChange(note) {
            vm.note = note;
        }

        function onBpmChange(bpm) {
            vm.bpm = bpm;
        }

        
        let interval = null;

        function play() {      
            if(vm.isPlaying) {
                metronomeService.stop();
                vm.isPlaying = false;
            } else {
                metronomeService.start(vm.bpm);
                vm.isPlaying = true;
            }

            // if(isPlaying && interval) {
            //     $interval.cancel(interval);

            //     interval = null;
            //     isPlaying = false;
            // } else {
            //     let bps = vm.bpm / 60.0;
            //     let intervalBuffer = 1000.0 / bps;
  
            //     isPlaying = true;
            //     interval = $interval(() => {
            //         let intervalBufferInSek = intervalBuffer/1000;
            //         let singleBufferTime = intervalBufferInSek/vm.note;
            //         let startTime = audioContext.currentTime;
            //         let endTime = startTime + intervalBufferInSek;
            //         let tick = 1;

            //         while(startTime < endTime) {
            //             let freq = tick === 1 ? frequency.high : frequency.mid;
                        
            //             playNote(startTime, audioContext, freq);

            //             tick++;
            //             startTime += singleBufferTime;
            //         }                   
            //     }, intervalBuffer);
            // }
        } 
                
        function playNote(startTime, audioContext, frequency) {            
            let noteLength = 0.05;             
            let osc = audioContext.createOscillator();
            
            osc.connect(audioContext.destination);
            osc.frequency.value = frequency;
            osc.start(startTime);
            osc.stop(startTime + noteLength);
        }
    }
})();