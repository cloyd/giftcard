(function() {
    'use strict';

    angular
        .module('app.danceClass')
        .controller('CancelDanceClassModalInstanceCtrl', CancelDanceClassModalInstanceCtrl);
        CancelDanceClassModalInstanceCtrl.$inject = ['$scope','$modalInstance'];
    /* @ngInject */
    function CancelDanceClassModalInstanceCtrl($scope,$modalInstance) {
        /*jshint validthis: true */
        var vm = this;

        activate();

        function activate() {
            $scope.ok = function() {
                $modalInstance.close();
            }
            $scope.cancel = function() {
                $modalInstance.dismiss("Modal Dismiss");
            }
        }
    }
})();