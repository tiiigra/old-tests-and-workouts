(function () {

    'use strict';

    angular.module('EmpeekTest')

    .controller('ItemListCtrl', ItemListCtrl);


    ItemListCtrl.$inject = ["ItemListService"];

    function ItemListCtrl(ItemListService) {

        var itemList = this;

        /** Initialization **/
        itemList.items = getItems();
        itemList.currentItemIndex = 0;
        itemList.currentComments = getComments(itemList.currentItemIndex);



        itemList.add = function (form) {
            ItemListService.addItem({
                payload: itemList.input,
                commentsQuantity: 0,
                comments: []
            });
            itemList.input = "";

            updateItemsRef();
            setIfListEmpty();
        };

        itemList.remove = function (index) {
            ItemListService.removeItem(index);
            updateItemsRef();
            itemList.currentComments = initComments();
            setIfListEmpty();
        };


        itemList.addComment = function () {
            ItemListService.addComment(itemList.commentInput,
                                       itemList.currentItemIndex);
            itemList.commentInput = '';

            updateItemsRef();
            updateCurrentComments(itemList.currentItemIndex);
        };

        itemList.getCurrentComments = function (index){
            itemList.currentItemIndex = index;
            itemList.currentComments = getComments(index);
        };

        function getItems() {
            return ItemListService.getItems();
        }

        function updateItemsRef() {
            itemList.items = ItemListService.getItems();
        }

        function getComments(index) {
            setIfListEmpty();
            return itemList.items.length > 0 ? itemList.items[index].comments : [];
        }

        function initComments() {
            if (itemList.items.length === 0) {
                return [];
            }
            if (itemList.items[0].comments.length > 0) {
                return itemList.items[0].comments;
            }
        }

        function updateCurrentComments(index) {
            itemList.currentComments = itemList.items[index].comments;
        }

        function setIfListEmpty() {
            itemList.isEmpty = itemList.items.length === 0;
        }
    }
})();