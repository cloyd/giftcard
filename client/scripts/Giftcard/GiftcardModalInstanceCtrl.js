(function() {
    'use strict';

    angular
        .module('app.giftcard')
        .controller('GiftcardModalInstanceCtrl', GiftcardModalInstanceCtrl);

        GiftcardModalInstanceCtrl.$inject = ['$modalInstance','$scope'];
    /* @ngInject */
    function GiftcardModalInstanceCtrl($modalInstance,$scope) {
        /*jshint validthis: true */
        var vm = this;

        console.log();
        $scope.ok = function() {
            $modalInstance.close($scope.studentname);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss("cancel");
        };

    }
})();