(function () {

    'use strict';

    angular.module('EmpeekTest')
    .service('StorageService', StorageService);

    StorageService.$inject = ['$rootScope'];

    function StorageService($rootScope) {

        var service = this;

        var storageData = initData();

        service.getData = function () {
          return  storageData;
        };

        service.addItem = function (item) {
            var oldState = JSON.parse(localStorage.getItem("items")) || [];
            oldState.push(item);
            localStorage.setItem("items", JSON.stringify((oldState)));
            emitData();
        };

        service.removeItem= function(index) {
            var oldState = JSON.parse(localStorage.getItem("items")) || [];
            oldState.splice(index, 1);
            localStorage.setItem("items", JSON.stringify((oldState)));
            emitData();
        };

        service.addComment = function(comment, index) {
            var oldState = JSON.parse(localStorage.getItem("items"));
            oldState[index].comments.push(comment);
            var updatedState = incrementCounter(oldState, index);
            localStorage.setItem("items", JSON.stringify((updatedState)));
            emitData();
        };

        function emitData() {
            storageData = getItems();
            $rootScope.$emit("storageEvent", storageData);
        }

        function initData() {
            return  JSON.parse(localStorage.getItem("items")) || [];
        }

        function getItems() {
            var data =  JSON.parse(localStorage.getItem("items"));
            return data;
        }

        function incrementCounter(arr, index) {
            arr[index].commentsQuantity++;
            return arr;
        }
    }
})();