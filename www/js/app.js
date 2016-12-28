'use strict';

(function () {
	'use strict';

	angular.module('metronome', ['ionic']).run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}

			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});
})();
'use strict';

(function () {
    'use strict';

    angular.module('metronome', ['ionic']).config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('index', {
            url: '/',
            views: {
                'leftMenu': { template: '<pi-metronome-menu></pi-metronome-menu>' },
                'main': { template: '<pi-metronome></pi-metronome>' }
            }
        });
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('metronome').component('piMetronome', {
        templateUrl: 'metronome/metronome.html',
        controller: 'MetronomeController',
        controllerAs: 'mc'
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('metronome').controller('MetronomeController', MetronomeController);

    MetronomeController.$inject = ['metronomeService'];

    function MetronomeController(metronomeService) {
        var vm = this;
        var audioContext = null;

        var bufferPercentageGap = 0.1;
        var frequency = {
            high: 880,
            mid: 440,
            low: 220
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

        var interval = null;

        function play() {
            if (vm.isPlaying) {
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
            var noteLength = 0.05;
            var osc = audioContext.createOscillator();

            osc.connect(audioContext.destination);
            osc.frequency.value = frequency;
            osc.start(startTime);
            osc.stop(startTime + noteLength);
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('metronome').factory('metronomeService', MetronomeService);

    MetronomeService.$inject = [];

    function MetronomeService() {
        var service = Object.freeze({
            start: start,
            stop: stop
        });

        return service;

        function start(bpm) {
            var bps = bpm / 60.0;
            var intervalBuffer = 1000.0 / bps;
        }

        function stop() {}
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('metronome').component('piMetronomeBpmSelector', {
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
'use strict';

(function () {
    'use strict';

    angular.module('metronome').controller('MetronomeBpmSelectorController', MetronomeBpmSelectorController);

    MetronomeBpmSelectorController.$inject = [];

    function MetronomeBpmSelectorController() {
        var vm = this;

        vm.changeBpm = changeBpm;
        vm.$onInit = onInit;

        function onInit() {}

        function changeBpm(inpt, increase) {
            var bpm = parseInt(inpt, 10);

            if (increase) {
                vm.bpm = bpm < vm.conf.maxBpmValue ? bpm + 1 : vm.conf.maxBpmValue;
            } else {
                vm.bpm = bpm > vm.conf.minBpmValue ? bpm - 1 : vm.conf.minBpmValue;
            }

            vm.onBpmChange({ bpm: vm.bpm });
        }
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('metronome').component('piMetronomeMenu', {
        templateUrl: 'metronome/metronome-menu/metronome-menu.html',
        bindings: {},
        controller: 'MetronomeMenuController',
        controllerAs: 'mmc'
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('metronome').controller('MetronomeMenuController', MetronomeMenuController);

    MetronomeMenuController.$inject = [];

    function MetronomeMenuController() {
        var vm = this;
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('metronome').component('piMetronomeNoteSelector', {
        templateUrl: 'metronome/metronome-note-selector/metronome-note-selector.html',
        bindings: {
            note: '<',
            onNoteChange: '&'
        },
        controller: 'MetronomeNoteSelectorController',
        controllerAs: 'mc'
    });
})();
'use strict';

(function () {
    'use strict';

    angular.module('metronome').controller('MetronomeNoteSelectorController', MetronomeNoteSelectorController);

    MetronomeNoteSelectorController.$inject = [];

    function MetronomeNoteSelectorController() {
        var vm = this;

        vm.changeNote = changeNote;

        function changeNote(inpt) {
            var note = parseInt(inpt, 10);

            vm.onNoteChange({ note: vm.note });
        }
    }
})();
//# sourceMappingURL=app.js.map
