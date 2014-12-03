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
            return giftcardApi.getGiftcards().getList().then(function(data){
                vm.giftcards = data;
                getProfit(vm.giftcards);
            })


        }

        function getProfit(giftcards){
            for (var i = 0; i < giftcards.length; i++) {
                vm.profit += Number(giftcards[i].package.amount);
            };
        }
    }
})();