(function () {

    'use strict';

    angular.module('EmpeekTest')
    .service('ItemListService', ItemListService);

    ItemListService.$inject = ["StorageService", "$rootScope"];
    function ItemListService(StorageService, $rootScope) {

        var service = this;

        service.items = StorageService.getData();

        console.log("service.items", service.items) ;

        $rootScope.$on('storageEvent', function(event, data) {
            service.items = data;
        });

        service.getItems = function () {
            return  service.items;
        };

        service.addItem = function (item) {
            StorageService.addItem(item);

        };

        service.removeItem = function (index) {
            StorageService.removeItem(index);
        };

        service.addComment = function(comment, index) {
            StorageService.addComment(comment, index);
        };
    }
})();