(function() {
  'use strict';
  angular
  .module('app', [

    'ui.router','restangular','ngAnimate', 'ui.bootstrap', 'ui.select','angular-loading-bar','ngAudio','kf.focusOn','easypiechart', 'textAngular', 'ui.tree', 'ngMap', 'ngTagsInput',

    'app.controllers', 'app.directives', 'app.localization', 'app.nav', 'app.ui.ctrls', 'app.ui.directives', 'app.ui.services', 'app.ui.map', 'app.form.validation', 'app.ui.form.ctrls', 'app.ui.form.directives', 'app.tables', 'app.task','app.chart.ctrls','app.chart.directives','app.page.ctrls',

      // custom modules
      'app.giftcardApi','app.dashboard','app.giftcard','app.danceClass','app.danceStyle','app.teacher'

    ])



    .config(function($stateProvider, $urlRouterProvider, RestangularProvider, uiSelectConfig) {

      uiSelectConfig.theme = 'selectize';

      RestangularProvider.setBaseUrl('http://giftcard:8888/public/api/v1/');
      // RestangularProvider.setBaseUrl('http://localhost/giftcard/public/api/v1/');
      // RestangularProvider.setBaseUrl('http://giftcard-api.gforceofficial.com/public/api/v1/');

      RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
          var extractedData;
          // .. to look for getList operations
          if (operation === "getList" || operation === "get") {
            // .. and handle the data and meta data
            extractedData = data.data;
          }
          else {
            extractedData = data;
          }
          return extractedData;
      });

      // Routing

          $stateProvider

            // setup an abstract state for the tabs directive
            .state('dash', {
              url: "/dashboard",
              templateUrl: "views/dashboard.html"
            })
            .state('showGiftcards', {
              url: "/giftcards",
              templateUrl: "views/giftcards/showGiftcards.html"
            })
            .state('giftcardDetail', {
              url: "/giftcards/:id",
              templateUrl: "views/giftcards/giftcardDetail.html"
            })
            .state('newGiftcard', {
              url: "/newGiftcard",
              templateUrl: "views/giftcards/newGiftcard.html"
            })
            .state('newGiftcardDetail', {
              url: "/newGiftcardDetail/:id",
              templateUrl: "views/giftcards/newGiftcardDetail.html"
            })
            .state('newDanceClass', {
              url: "/newDanceClass",
              templateUrl: "views/danceClass/newDanceClass.html"
            })
            .state('danceClasses', {
              url: "/danceClasses",
              templateUrl: "views/danceClass/danceClasses.html"
            })
            .state('danceClassDetail',{
              url: "/danceClass/:id",
              templateUrl: "views/danceClass/danceClassDetail.html"
            })
            .state('editDanceClass',{
              url: "/editDanceClass/:id",
              templateUrl: "views/danceClass/editDanceClass.html"
            })
            .state('danceStyle',{
              url: "/danceStyle",
              templateUrl: "views/danceStyle/danceStyle.html"
            })
            .state('teachers',{
              url: "/teachers",
              templateUrl: "views/teacher/teachers.html"
            })
            .state('newTeacher',{
              url: "/newTeacher/",
              templateUrl: "views/teacher/newTeacher.html"
            })
            .state('tasks', {
              url: "/tasks",
              templateUrl: "views/tasks/tasks.html"
            })
            .state('printGiftcard', {
              url: "/printGiftcard/:id",
              templateUrl: "views/giftcards/testPrint.html"
            })
            .state('reports',{
              url: "/reports",
              templateUrl: "views/reports/dailyReport.html"
            })
            .state('studio',{
              url:"/studio",
              templateUrl: "views/studio/studio.html"
            })
            .state('testPage', {
              url: "/testPage",
              templateUrl: "views/testPage.html"
            })



            .state('404', {
              url: "/404",
              templateUrl: "views/pages/404.html"
            })
            .state('lockScreen', {
              url: "/lock",
              templateUrl: "views/pages/lock-screen.html"
            })
            .state('signin', {
              url: "/signin",
              templateUrl: "views/pages/signin.html"
            })
            ;
          // if none of the above states are matched, use this as the fallback
          $urlRouterProvider.otherwise('/dashboard');

    });

})();
