(function() {
    'use strict';

    angular
        .module('app.giftcardApi',[])
        .factory('giftcardApi', giftcardApi);

        giftcardApi.$inject = ['Restangular'];

    /* @ngInject */
    function giftcardApi(Restangular) {

        function getPackages(){
            return Restangular.service('packages');
        }
        function getPackage(packageId){
            return Restangular.one('packages',packageId);
        }

        function getGiftcards(){
            return Restangular.service('giftcards');
        }
        function getGiftcard(giftcardId){
            return Restangular.one('giftcards',giftcardId);
        }
        function getCardNumber(){
            return Restangular.one('generateCardNumber');
        }
        function getGiftcardlogs(){
            return Restangular.service('giftcardlogs');
        }
        function getDanceClasses(){
            return Restangular.service('danceclasses');
        }
        function getDanceClass(danceClassId){
            return Restangular.one('danceclasses',danceClassId);
        }
        function getDanceStyles(){
            return Restangular.service('dancestyles');
        }
        function getTeachers(){
            return Restangular.service('teachers');
        }
        function getStudios(){
            return Restangular.service('studios');
        }
        function getGiftcardCovers(){
            return Restangular.service('giftcardcovers');
        }
        var service = {
            getPackages: getPackages,
            getPackage: getPackage,
            getGiftcards: getGiftcards,
            getGiftcard: getGiftcard,
            getCardNumber: getCardNumber,
            getGiftcardlogs: getGiftcardlogs,
            getDanceClasses: getDanceClasses,
            getDanceClass: getDanceClass,
            getDanceStyles: getDanceStyles,
            getTeachers: getTeachers,
            getStudios: getStudios,
            getGiftcardCovers: getGiftcardCovers
        };
        return service;
    }
})();