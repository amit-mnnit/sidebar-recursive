(function () {
    var App = angular.module('amitApp');
    App.controller('amitController', function ($rootScope, $scope) {
        var dataFromServer = [
            {
                "Software Products": [
                    {
                        "Programming Languages": [
                            "Java API",
                            "Python API"
                        ]
                    },
                    {
                        "Documentation": [
                            "Java Docs",
                            "Python Docs",
                            {
                                "HTTP Docs": [
                                    "REST Docs",
                                    "SOAP Docs"
                                ]
                            }
                        ]
                    },
                    "Try It!"
                ]
            },
            {
                "Cloud Products": [
                    "SAAS",
                    "PAAS",
                    "IAAS"
                ]
            },
            {
                "About Us": [
                    {
                        "Locations": [
                            {
                                "India": [
                                    "Delhi",
                                    {
                                        "Mumbai": [
                                            "Lower Parel",
                                            "Goregaon"
                                        ]
                                    },
                                    "Bangalore"
                                ]
                            },
                            "USA",
                            "Singapore"
                        ]
                    },
                    "Founders",
                    "Advisors"
                ]
            },
            "Contact Us"
        ];
        var tmp = [];
        function setData(data, tmp) {
            for (var i = 0; i < data.length; i++) {
                if (typeof data[i] == "string") {
                    tmp.push({ name: data[i], child: [] });
                }
                else {
                    var key = Object.keys(data[i])[0];
                    tmp.push({ name: key, child: [] });
                    setData(data[i][key], tmp[tmp.length - 1].child)
                }
            }
        }
        setData(dataFromServer, tmp);
        $scope.menu = tmp;
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