(function() {
    'use strict';

    angular
        .module('app.teacher')
        .controller('NewTeacherCtrl', NewTeacherCtrl);

        NewTeacherCtrl.$inject = ['giftcardApi'];
    /* @ngInject */
    function NewTeacherCtrl(giftcardApi) {
        /*jshint validthis: true */
        var vm = this;
        vm.testAdd = testAdd;
        vm.name = '';
        vm.pic = '';
        vm.teachers = {};

        activate();

        function activate() {
            getTeachers();
        }
        function getTeachers(){
            return giftcardApi.getTeachers().getList().then(function(data){
              vm.teachers = data;
            });
        }
        function testAdd(){
            console.log("Teacher Name: ",vm.name);
            console.log("Profile Pic: ",vm.pic);
        }
    }
})();