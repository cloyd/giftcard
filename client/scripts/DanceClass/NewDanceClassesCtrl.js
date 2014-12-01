(function() {
    'use strict';

    angular
        .module('app.danceClass')
        .controller('NewDanceClassesCtrl', NewDanceClassesCtrl)

        NewDanceClassesCtrl.$inject = ['giftcardApi','$state','$filter','logger'];

    /* @ngInject */
    function NewDanceClassesCtrl(giftcardApi,$state,$filter,logger) {
        /*jshint validthis: true */
      var vm = this;

      // time picker
      vm.class_time = '';
      vm.danceClass_time = '';
      vm.classTimes = [
        {time:'1:30 - 2:30'},
        {time:'2:30 - 3:30'},
        {time:'3:30 - 4:30'},
        {time:'4:30-5:30'},
        {time:'5:30 - 6:30'},
        {time:'6:30 - 7:30'},
        {time:'7:30 - 8:30'},
        {time:'8:30 - 9:30'},
        {time:'9:30 - 10:30'},
        {time:'9:00 - 10:30'}
        ];

      activate();

      function activate(){
        getDanceStyles();
        getTeachers();
        getStudios();
      }
      function getDanceStyles(){
        return giftcardApi.getDanceStyles().getList().then(function(data){
          vm.dancestyle = {};
          vm.dancestyles = data;
          vm.dancestylesLoaded = 1;
        });
      }
      function getTeachers(){
        giftcardApi.getTeachers().getList().then(function(data){
          vm.teacher = {};
          vm.teachers = data;
          vm.teachersLoaded = 1;
        });
      }
      function getStudios(){
        giftcardApi.getStudios().getList().then(function(data){
          vm.studio = {};
          vm.studios = data;
          vm.studiosLoaded = 1;
        });
      }
      vm.submitForm = function() {
        vm.danceClass = {
          dancestyle_id : vm.dancestyle.selected.id,
          teacher_id : vm.teacher.selected.id,
          studio_id : vm.studio.selected.id,
          date : '',
          time : vm.classTime.selected.time
        }
        vm.showInfoOnSubmit = true;

        giftcardApi.getDanceClasses().post(vm.danceClass).then(function() {
            $state.go('danceClasses');
            logger.logSuccess("New Class successfully added.");
        });
      }
      // vm.changed = function() {
      //   // console.log('Time changed to: ' + vm.mytime);
      //   // vm.danceClass_time = vm.mytime + '-' + vm.mytime2;

      //   // vm.filtertime1 = $filter('date')(vm.mytime);
      //   // vm.filtertime2 = $filter('date','shortTime')(vm.mytime2);

      //   vm.danceClass_time = vm.class_time;

      //    console.log("danceClass_time", vm.danceClass_time);
      // };
    }
})();