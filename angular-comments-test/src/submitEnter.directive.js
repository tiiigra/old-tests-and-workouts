(function () {

    'use strict';

    angular.module('EmpeekTest')

    .directive('submitEnter', SubmitEnterDirective);

    function  SubmitEnterDirective() {

        return function (scope, element, attrs) {

            element.on("keypress", function (e) {

                if (e.which === 13) {

                    if (scope.commentForm.$invalid) {
                        return;
                    }

                    scope.$apply(function () {
                        scope.$eval(attrs.submitEnter, {'e': e});
                    });

                    e.preventDefault();
                }
            });
        };
    }
})();