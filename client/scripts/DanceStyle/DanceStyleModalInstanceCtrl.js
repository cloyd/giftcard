(function() {
    'use strict';

    angular
        .module('app.danceStyle')
        .controller('DanceStyleModalInstanceCtrl', DanceStyleModalInstanceCtrl);
http://localhost:9000/#/danceClasses
        DanceStyleModalInstanceCtrl.$inject = ['$modalInstance','$scope'];
    /* @ngInject */
    function DanceStyleModalInstanceCtrl($modalInstance,$scope) {
        /*jshint validthis: true */
        var vm = this;

        $scope.ok = function() {
            $modalInstance.close($scope.danceStyleId);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss("Modal Dismiss");
        };
    }
})();