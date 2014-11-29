(function() {
    'use strict';

    angular
        .module('app.danceStyle')
        .controller('DanceStyleCtrl', DanceStyleCtrl);
        DanceStyleCtrl.$inject = ['giftcardApi','logger','$modal','$scope'];

    /* @ngInject */
    function DanceStyleCtrl(giftcardApi,logger,$modal,$scope) {
        /*jshint validthis: true */
        var vm = this;

        activate();

        function activate(){
            getDanceStyles();
        }
        function getDanceStyles(){
            giftcardApi.getDanceStyles().getList().then(function(data){
                return vm.danceStyles = data;
            });
        }
        function getDanceStyle(id){
            var danceStyleWithId;
            return danceStyleWithId = _.find(vm.danceStyles, function(danceStyle)
            {
                return danceStyle.id === id;
            });
        }
        vm.addDanceStyle = function (){
            vm.danceStyle = {
                name: vm.d
            }

            vm.danceStyles.post(vm.danceStyle)
            .then(function() {
                vm.d = void 0;
                logger.logSuccess("Dance Style " + vm.danceStyle.name +" successfully added");
                activate();
            });
        }
        vm.deleteDanceStyle = function(danceStyleId){
            var modalInstance;
            var danceStyle = getDanceStyle(danceStyleId);

            modalInstance = $modal.open({
                templateUrl: "danceStyleModalContent.html",
                controller: 'DanceStyleModalInstanceCtrl'
            });

            modalInstance.result.then((function(id) {
                danceStyle.remove(danceStyle).then(function() {
                    logger.logError("Dance Style " + danceStyle.name + " successfully deleted");
                    activate();
                });
            }), function() {
                console.log("Modal dismissed at: " + new Date());
            });
        }
    }
})();