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

    MetronomeController.$inject = ['$timeout'];

    function MetronomeController($timeout) {
        var vm = this;

        vm.bpm = 120;
        vm.conf = {
            minBpmValue: 0,
            maxBpmValue: 300
        };

        vm.$onInit = onInit;
        vm.onBpmChange = onBpmChange;

        function onInit() {}

        function onBpmChange(bpm) {
            vm.bpm = bpm;
        }
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
//# sourceMappingURL=app.js.map
