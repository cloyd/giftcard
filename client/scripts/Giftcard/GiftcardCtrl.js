(function() {
    'use strict';

    angular
        .module('app.giftcard')
        .controller('GiftcardCtrl', GiftcardCtrl);

        GiftcardCtrl.$inject = ['giftcardApi','$filter','$modal','$state','logger'];

    /* @ngInject */
    function GiftcardCtrl(giftcardApi,$filter,$modal,$state,logger) {
      /*jshint validthis: true */
      var vm = this;
      var init;

      vm.searchKeywords = '';
      vm.filteredGiftcards = [];
      vm.row = '';
      vm.numPerPageOpt = [3, 5, 10, 20];
      vm.numPerPage = vm.numPerPageOpt[2];
      vm.currentPage = 1;
      vm.currentPageGiftcards = [];

      vm.buttonActive = '';
      vm.textActive = '';

      vm.select = select;
      vm.search = search;
      vm.order = order;
      vm.activateGiftcard = activateGiftcard;
      vm.onOrderChange = onOrderChange;
      vm.onNumPerPageChange = onNumPerPageChange;


      activate();

      function activate(){
        getGiftcards();
      }

      function getGiftcards(){
        giftcardApi.getGiftcards().getList().then(function(data) {
          vm.giftcards = data;
          init();
        });
      }
      function init(){
        search();
        return select(vm.currentPage);
      }
      function select(page){
        var end, start;
        start = (page - 1) * vm.numPerPage;
        end = start + vm.numPerPage;
        return vm.currentPageGiftcards = vm.filteredGiftcards.slice(start, end);
      }
      function onFilterChange() {
        select(1);
        vm.currentPage = 1;
         return vm.row = '';
      }
      function onNumPerPageChange() {
        select(1);
        return vm.currentPage = 1;
      }
      function onOrderChange() {
        select(1);
        return vm.currentPage = 1;
      }
      function search() {
        vm.filteredGiftcards = $filter('filter')(vm.giftcards, vm.searchKeywords);
        return onFilterChange();
      }
      function order(rowName) {
        if (vm.row === rowName) {
          return;
        }
        vm.row = rowName;
        vm.filteredGiftcards = $filter('orderBy')(vm.giftcards, rowName);
        return onOrderChange();
      }
      function activateGiftcard(giftcardID) {
            var modalInstance;

            modalInstance = $modal.open({
              templateUrl: "studentnameModalContent.html",
              controller: 'GiftcardModalInstanceCtrl'
            });

            modalInstance.result.then((function(studentname) {
              var now = moment().format("YYYY-MM-DD");
              var giftcardWithId = _.find(vm.giftcards, function(giftcard) {
                return giftcard.id === giftcardID;
              });

              giftcardWithId.student_name = studentname;
              giftcardWithId.active = 0;
              giftcardWithId.date_activated = now;
              giftcardWithId.put().then(function(){
                $state.go('giftcardDetail',{id:giftcardID});
                logger.logSuccess("Card Number: " + giftcardWithId.card_number + " successfully activated.");
            });
            }), function() {
              console.log("Modal dismissed at: " + new Date());
            });
      }
    }

})();