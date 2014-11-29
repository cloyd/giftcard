(function() {
    'use strict';

    angular
        .module('app')
        .controller('TestCtrl', TestCtrl);
        TestCtrl.$inject = ['ngAudio','logger','$modal'];
    /* @ngInject */
    function TestCtrl(ngAudio,logger,$modal) {
        /*jshint validthis: true */
        var vm = this;

        activate();

        function activate() {
            vm.audio = ngAudio.load('Sound-Effects/dun-dun-dun.mp3');
        }

        vm.test = function(){
            vm.audio.play();
            logger.logError(vm.testinput);
            var modalInstance;

            modalInstance = $modal.open({
                templateUrl: "testModalContent.html"
            });

            vm.testinput = void 0;
        }
    }
})();