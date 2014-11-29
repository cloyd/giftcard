(function() {
    'use strict';

    angular
        .module('app.giftcard')
        .controller('NewGiftcardDetailCtrl', NewGiftcardDetailCtrl);

        NewGiftcardDetailCtrl.$inject = ['$stateParams','giftcardApi'];

    /* @ngInject */
    function NewGiftcardDetailCtrl($stateParams,giftcardApi) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'NewGiftcardDetailCtrl';

        var packageId = Number($stateParams.id);


        giftcardApi.getPackage(packageId).get().then(function(data){
            vm.pack = data;
        });
    }
})();