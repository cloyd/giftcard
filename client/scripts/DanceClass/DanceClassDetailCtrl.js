(function() {
    'use strict';

    angular
        .module('app.danceClass')
        .controller('DanceClassDetailCtrl', DanceClassDetailCtrl);

        DanceClassDetailCtrl.$inject = ['$stateParams','giftcardApi','$state','$scope','$modal','logger','ngAudio'];
    /* @ngInject */
    function DanceClassDetailCtrl($stateParams,giftcardApi,$state,$scope,$modal,logger,ngAudio) {
        /*jshint validthis: true */
        var vm = this;
        vm.giftcards = [];
        vm.selected = void 0;
        vm.zero = void 0;
        vm.danceClassId = void 0;
        vm.errorMessage = '';

        var danceClassId = Number($stateParams.id);
        vm.audio = ngAudio.load('sound_effects/dun-dun-dun.mp3');

        // functions
        vm.showError = showError;
        vm.timeIn = timeIn;
        vm.focusInput = focusInput;

        activate();

        function activate(){
            getGiftcards();
            getDanceClass(danceClassId);
            focusInput();
        }

        function getGiftcards(){
            return vm.getGiftcards = giftcardApi.getGiftcards().getList().then(function(data){
                return vm.giftcards = data;

            });
        }
        function getDanceClass(id){
            return giftcardApi.getDanceClass(id).get().then(function(data){
                return vm.danceClass = data;
            });
        }

        // Use ng-change instead of $watch


        $scope.$watch('vm.selected', function() {

            if(vm.selected === vm.zero){
                vm.notValid = "empty";
                // logger.logWarning("Card Number is required.");
            }
            if(vm.selected.remaining_class <= 0){
                vm.notValid = "Card Not Valid";
                logger.logError("Card Number : " + vm.selected.card_number + " is not valid");
                showError();
                vm.cacheData = vm.selected;
                vm.selected = void 0;

            }else if(vm.selected.active == 1){
                vm.notValid = "Card Not Valid";
                logger.logError("Card Number : " + vm.selected.card_number + " NOT activated yet");
                vm.errorMessage = 'This Card is NOT activated yet.';
                showError();
                vm.cacheData = vm.selected;
                vm.selected = void 0;
            }
            else if(vm.selected.id){
                vm.notValid = void 0;
                vm.cacheData = vm.selected;
                console.log(vm.cacheData.date_activated);
                var dateActivated = vm.cacheData.date_activated;
                dateActivated = moment().add(vm.cacheData.package.expiration, 'd');
                vm.expiration = dateActivated;
                vm.expiration = moment(vm.expiration).format('MMM D YYYY');
                timeIn(danceClassId);


            }
        });
        function showError(){
            var modalInstance;
            vm.audio.play();

            modalInstance = $modal.open({
                templateUrl: "warningModalContent.html",
                controller: 'WarningModalInstanceCtrl'
            });

        }
        function timeIn(danceClassId){

            vm.giftcardLog = {
                giftcard_id: vm.selected.id,
                danceclass_id: danceClassId
            }

            vm.giftcard1 = vm.selected;
            vm.giftcard1.remaining_class -= 1;

            giftcardApi.getGiftcardlogs().post(vm.giftcardLog)
            .then(function() {
                vm.giftcard1.put().then(function(){
                    console.log("added class", vm.giftcard1);
                    console.log("remaining class", vm.giftcard1.remaining_class);
                    vm.selected = void 0;
                    // $state.go('danceClassDetail',{id:danceClassId});
                    activate();
                    logger.logSuccess(
                        vm.danceClass.dancestyle.name + " with " + vm.danceClass.teacher.name  + " <br />  successfully added.");
                    });
            });
        }

        function focusInput() {
            $scope.$broadcast('itemFocus');
        }
    }
})();