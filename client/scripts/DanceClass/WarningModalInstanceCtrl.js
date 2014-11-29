(function() {
    'use strict';

    angular
        .module('app.danceClass')
        .controller('WarningModalInstanceCtrl', WarningModalInstanceCtrl);

        WarningModalInstanceCtrl.$inject = ['$modalInstance','$scope'];
    /* @ngInject */
    function WarningModalInstanceCtrl($modalInstance,$scope) {
        /*jshint validthis: true */
        var vm = this;

        console.log();
        $scope.ok = function() {
             $modalInstance.dismiss("Modal Dismiss");
        };
    }
})();