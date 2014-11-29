(function() {
    'use strict';

    angular
        .module('app')
        .filter('timee', timee);
        timee.$inject = ['$filter'];
    /* @ngInject */
    function timee($filter) {
        /*jshint validthis: true */
        var vm = this;
        return function (input) {
            if(input == null){ return ""; }

            var _date = $filter('date')(new Date(input), 'HH:mm:ss');

            return _date.toUpperCase();


        }

    }
})();