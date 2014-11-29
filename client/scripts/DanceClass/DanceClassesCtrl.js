(function() {
    'use strict';

    angular
        .module('app.danceClass')
        .controller('DanceClassesCtrl', DanceClassesCtrl);

        DanceClassesCtrl.$inject = ['giftcardApi','$filter','$state','logger','$modal'];
    /* @ngInject */
    function DanceClassesCtrl(giftcardApi,$filter,$state,logger,$modal) {
        /*jshint validthis: true */
      var vm = this;
      vm.danceClasses = [];
      vm.searchKeywords = '';
      vm.filteredDanceClasses = [];
      vm.row = '';

      vm.numPerPageOpt = [4, 5, 10, 20];
      vm.numPerPage = vm.numPerPageOpt[0];
      vm.currentPage = 1;
      vm.currentPageDanceClasses = [];

      vm.select = select;
      vm.search = search;
      vm.order = order;
      vm.timeIn = timeIn;
      vm.editDanceClass = editDanceClass;
      vm.onOrderChange = onOrderChange;
      vm.onNumPerPageChange = onNumPerPageChange;
      vm.cancelDanceClass = cancelDanceClass;


      activate();

      function activate(){
        getDanceClasses();
      }
      function getDanceClasses(){
        return giftcardApi.getDanceClasses().getList().then(function(data){
          vm.danceClasses = data;
          init();
        });

      }
      function init() {
        vm.search();
        return select(vm.currentPage);
      }
      function onFilterChange() {
        select(1);
        vm.currentPage = 1;
        return vm.row = '';
      }
      function select(page) {
        var end, start;
        start = (page - 1) * vm.numPerPage;
        end = start + vm.numPerPage;
        return vm.currentPageDanceClasses = vm.filteredDanceClasses.slice(start, end);
      }
      function search() {
        vm.filteredDanceClasses = $filter('filter')(vm.danceClasses, vm.searchKeywords);
        return onFilterChange();
      }
      function order(rowName) {
        if (vm.row === rowName) {
          return;
        }
        vm.row = rowName;
        vm.filteredDanceClasses = $filter('orderBy')(vm.danceClasses, rowName);
        return vm.onOrderChange();
      };
      function onOrderChange() {
        select(1);
        return vm.currentPage = 1;
      };
      function onNumPerPageChange() {
        select(1);
        return vm.currentPage = 1;
      };
      function timeIn(classId){
        $state.go('danceClassDetail',{id:classId});
      }
      function editDanceClass(classId){
        $state.go('editDanceClass',{id:classId});
      }
      function cancelDanceClass(classId){
        var modalInstance;

        var danceClass = _.find(vm.danceClasses, function(d) {
          return d.id === classId;
        });

        modalInstance = $modal.open({
          templateUrl: "cancelDanceClassModalContent.html",
          controller: "CancelDanceClassModalInstanceCtrl"
        });

        modalInstance.result.then((function(id) {
          danceClass.remove(danceClass).then(function() {
              logger.logError("Dance Class " + danceClass.id + " successfully cancelled");
              activate();
          });
        }), function() {
            console.log("Modal dismissed at: " + new Date());
        });
      }
    }
})();