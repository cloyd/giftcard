(function() {
    'use strict';

    angular
        .module('app.danceClass')
        .controller('EditDanceClassCtrl', EditDanceClassCtrl);
        EditDanceClassCtrl.$inject = ['giftcardApi','$stateParams','$state','logger'];
    /* @ngInject */
    function EditDanceClassCtrl(giftcardApi,$stateParams,$state,logger) {
        /*jshint validthis: true */
        var vm = this;
        var danceClassId = Number($stateParams.id);

        activate();

        function activate(){
            vm.dancestyle = {};
            vm.teacher = {};
            vm.studio = {};
            getDanceClass(danceClassId);
        }
        function getDanceClass(danceClassId){
            return giftcardApi.getDanceClass(danceClassId).get().then(function(data){
                vm.danceClass = data;
                getDanceStyles();
                getTeachers();
                getStudios();
            });
        }
        function getDanceStyles(){
            return giftcardApi.getDanceStyles().getList().then(function(data){
                    vm.dancestyles = data;
                    vm.dancestylesLoaded = 1;
                    vm.dancestyle.selected = vm.danceClass.dancestyle;
                });
        }
        function getTeachers(){
            return giftcardApi.getTeachers().getList().then(function(data){
                vm.teachers = data;
                vm.teachersLoaded = 1;
                vm.teacher.selected = vm.danceClass.teacher;
            });
        }
        function getStudios(){
            return giftcardApi.getStudios().getList().then(function(data){
                vm.studios = data;
                vm.studiosLoaded = 1;
                vm.studio.selected = vm.danceClass.studio;
            });
        }

        vm.updateDanceClass = function (danceClassId){
            vm.danceClass.dancestyle_id = vm.dancestyle.selected.id,
            vm.danceClass.teacher_id = vm.teacher.selected.id,
            vm.danceClass.studio_id = vm.studio.selected.id,
            vm.danceClass.time = vm.danceClass.time

            vm.danceClass.put().then(function() {
                $state.go('danceClasses');
                logger.logSuccess("Dance Class successfully updated.");
            });
        }
    }
})();