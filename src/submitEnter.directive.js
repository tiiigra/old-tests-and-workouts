(function () {

    'use strict';

    angular.module('EmpeekTest')

    .directive('submitEnter', function() {

        return function(scope, element, attrs) {

            element.bind("keypress", function(e) {

                if(e.which === 13) {

                    if (scope.commentForm.$invalid) {
                        return;
                    }

                    scope.$apply(function(){
                        scope.$eval(attrs.submitEnter, {'e': e});
                    });

                    e.preventDefault();
                }
            });
        };
    });
})();