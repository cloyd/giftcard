(function() {
    'use strict';

    angular
        .module('app.giftcard')
        .controller('GiftcardDetailCtrl', GiftcardDetailCtrl);

        GiftcardDetailCtrl.$inject = ['giftcardApi','$stateParams'];
    /* @ngInject */
    function GiftcardDetailCtrl(giftcardApi,$stateParams) {
        /*jshint validthis: true */
        var vm = this;
        var giftcardId = Number($stateParams.id);
        vm.giftcard = [];
        vm.giftcard.validity = '';

        activate();

        function activate(){
            getGiftcard(giftcardId);
        }

        function getGiftcard(id){
            giftcardApi.getGiftcard(id).get().then(function(data){
                vm.giftcard = data;
                var dateActivated = vm.giftcard.date_activated
                alert(dateActivated);

                dateActivated = moment().add(vm.giftcard.package.expiration, 'd');
                vm.expiration = dateActivated;
                vm.expiration = moment(vm.expiration).format('MMM D YYYY');
            });
        }
    }
})();