(function() {
    'use strict';

    angular
        .module('app.giftcard')
        .controller('NewGiftcardCtrl', NewGiftcardCtrl);

        NewGiftcardCtrl.$inject = ['giftcardApi','$state','$stateParams'];

    /* @ngInject */
    function NewGiftcardCtrl(giftcardApi,$state,$stateParams) {
        /*jshint validthis: true */
        var vm = this;
        vm.packages = [];
        vm.giftcard = {};
        var today = new Date();
        vm.numberOfClass = 0;
        vm.label = 'Package';
        var now = moment().format("YYYY-MM-DD");

        vm.storeGiftcard = storeGiftcard;
        vm.selectGiftcard = selectGiftcard;
        vm.selectCover = selectCover;


        activate();

        function activate(){
            getPackages();
            getGiftcardCovers();
        }
        function getPackages(){
            return giftcardApi.getPackages().getList().then(function(packages) {
                vm.packages = packages;
                vm.numberOfClass = vm.packages[2].no_of_class;
            });
        }
        function getGiftcardCovers(){
            return giftcardApi.getGiftcardCovers().getList().then(function(covers){
                vm.covers = covers;
            });
        }
        function selectGiftcard(packageID){
            // vm.hideMe = true;
            // vm.label = 'Cover Photo';
            // vm.showCovers = true;
            vm.packageId = packageID
            storeGiftcard();
        }
        function selectCover(coverId){
            vm.coverId = coverId;
            return storeGiftcard();
        }
        function storeGiftcard(){
            // var now = moment().format("YYYY-MM-DD");
            // var validity = moment().add(1, 'y');

            // var packageWithId = _.find(vm.packages, function(pack) {
            //   return pack.id === vm.packageId;
            // });
            // vm.giftcard = {
            //     card_number: '',
            //     student_name: '',
            //     cover_photo: vm.coverId,
            //     validity: validity,
            //     date_purchase: now,
            //     remaining_class: packageWithId.no_of_class,
            //     package_id: vm.packageId,
            //     active: 1
            // }

            // giftcardApi.getGiftcards().post(vm.giftcard)
            // .then(function() {
            //     console.log("success");
            //     $state.go('printGiftcard',{id:vm.packageId});
            // });
            //
            $state.go('printGiftcard',{id:vm.packageId});
        }

    }
})();