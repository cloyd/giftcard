(function() {
    'use strict';

    angular
        .module('app.testmod',[])
        .controller('Test1Ctrl', Test1Ctrl);
        Test1Ctrl.$inject = ['$scope'];
    /* @ngInject */
    function Test1Ctrl($scope) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Test1Ctrl';
        vm.date = new moment();
        vm.focusInput = focusInput;
        vm.testFunction = testFunction;
        vm.date = moment().format('dddd, MMMM D YYYY');

        activate();
        function activate() {
            focusInput();
        }
        function focusInput() {
            $scope.$broadcast('itemSelected');
        }
        function testFunction(){
            activate();
        }
    }
})();