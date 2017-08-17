(function () {
  'use strict';

  angular
    .module('bikeGallery')
    .config(routes);

  routes.$inject = ['$stateProvider'];

  function routes($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'view/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
     })
      .state('galleries', {
        url: '/galleries/{itemId}/bikes',
        templateUrl: 'views/galleries.html',
        controller: 'GalleryController',
        controllerAs: 'vm'
      })
  }
})();
