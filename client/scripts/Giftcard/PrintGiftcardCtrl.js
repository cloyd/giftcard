(function() {
    'use strict';

    angular
        .module('app.giftcard')
        .controller('PrintGiftcardCtrl', PrintGiftcardCtrl);
        PrintGiftcardCtrl.$inject = ['$window','giftcardApi','$stateParams','logger','$state'];
    /* @ngInject */
    function PrintGiftcardCtrl($window,giftcardApi,$stateParams,logger,$state) {
        /*jshint validthis: true */
        var vm = this;
        var packageId = Number($stateParams.id);
        console.log(packageId);
        vm.today = moment().format('YYYY-MM-DD');
        vm.date_expiration = moment().add(1, 'y').format('YYYY-MM-DD');
        activate();

        function activate() {
            getPackage(packageId);
            getCardNumber();
        }
        function getPackage(id){
            return giftcardApi.getPackage(id).get().then(function(data){
                return vm.pack = data;
            });
        }
        function getCardNumber(){
            return giftcardApi.getCardNumber().get().then(function(data){
                return vm.newGiftcard = data;
            });
        }

        vm.printGiftcard = function(){
            storeGiftcard();
            var originalContents, popupWin, printContents;
            printContents = document.getElementById('invoice').innerHTML;
            originalContents = document.body.innerHTML;
            popupWin = window.open();
            popupWin.document.open('_self');
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /><link rel="stylesheet" href="fonts/printfonts.css" media="print"></head><body onload="window.print()">' + printContents + '</html>');
            return popupWin.document.close();
        }

        function storeGiftcard(){
            var newGiftcard = {
                card_number: vm.newGiftcard.card_number,
                validity: vm.date_expiration,
                package_id: packageId,
                remaining_class: vm.pack.no_of_class,
                date_purchase: vm.today,
                active: 1
            }
            giftcardApi.getGiftcards().post(newGiftcard)
            .then(function() {
                logger.logSuccess("successfully added");
                $state.go('showGiftcards');
            });
        }
    }
})();