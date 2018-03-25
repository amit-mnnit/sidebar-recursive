(function () {
    var App = angular.module('sideNavApp');
    App.controller('SideNavController', function ($rootScope, $scope) {
        var sideMenuListArray = [
        ];
        var tmp = [];
        function setData(data, tmp) {
                data.forEach(function(value){
                    if (typeof value == "string") {
                        tmp.push({ name: value, child: [] });
                    }
                    else {
                        var key = Object.keys(value)[0];
                        tmp.push({ name: key, child: [] });
                        setData(value[key], tmp[tmp.length - 1].child)
                    }
                })
            
        }
        setData(sideMenuListArray, tmp);
        this.menu = tmp;
        
    });

    App.directive("navigation", ['$compile', function ($compile) {
        var obj = {};
        obj.restrict = 'E';
        obj.replace = true;
        obj.scope = {
            menu: '='
        };
        obj.template = '<ul><li ng-repeat="item in menu"><div class="sidebar-text">{{item.name}}</div><span ng-if="item.child.length > 0"><navigation menu="item.child"></navigation></span></li></ul>'
        obj.compile = Compile;
        function Compile(el) {
            var contents = el.contents().remove();
            var compiled;
            return function (scope, el) {
                if (!compiled)
                    compiled = $compile(contents);

                compiled(scope, function (clone) {
                    el.append(clone);
                });
            };
        }
        return obj;
    }])

})();
