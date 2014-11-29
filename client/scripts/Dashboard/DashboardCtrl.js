(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardCtrl', DashboardCtrl);
        DashboardCtrl.$inject = ['giftcardApi'];
    /* @ngInject */
    function DashboardCtrl(giftcardApi) {
        /*jshint validthis: true */
        var vm = this;
        vm.profit = 0;
        vm.giftcards = {};

        activate();

        function activate() {
            getGiftcards();
        }
        function getGiftcards(){
            giftcardApi.getGiftcards().getList().then(function(data){
                return vm.giftcards = data;
            })
        }
    }
})();