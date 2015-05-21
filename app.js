var app = angular.module("myApp", []);

app.controller("myController", function($scope, $filter) {
    //Initialize data
    $scope.buttons = ['Bar', 'Circles', 'People', 'Pie', 'Pixels'];
    $scope.buttonsDescription = ['Percentage Bar', '10 Circles', '100 People', 'Pie Chart', '10000 Pixels in a Square'];
    $scope.zooms = [1, 10, 100, 1000, 10000, 100000];
    $scope.divs = [0, 1];
    $scope.numerators = [null, null];
    $scope.denominators = [null, null];
    $scope.result = [100, 100];
    $scope.resultText = ["Risk", "Risk"];
    $scope.circles = {};
    $scope.humans = {};


    //Select type of graph
    $scope.selectedIndex = 0;
    $scope.clickSelect = function(index) {
        $scope.selectedIndex = index;
    };

    $scope.selectedZoom = 0;
    $scope.clickZoom = function(index) {
        $scope.selectedZoom = index;
    };

    $scope.delGraph = function() {
        if ($scope.divs.length > 2) {
            $scope.divs.pop();
            $scope.result.pop();
            $scope.resultText.pop();
            $scope.numerators.pop();
            $scope.denominators.pop();
            delete $scope.circles[$scope.divs.length];
            delete $scope.humans[$scope.divs.length];


        };
    };
    $scope.addGraph = function() {
        $scope.divs.push($scope.divs.length);
        $scope.result.push(100);
        $scope.resultText.push("Risk");
        $scope.numerators.push(null);
        $scope.denominators.push(null);
        $scope.circles[$scope.divs.length - 1] = $scope.returnLoopedArray(10, 100);
        $scope.humans[$scope.divs.length - 1] = $scope.returnLoopedArray(100, 100);



    };

    $scope.compareGraph = function() {
        //for each div input graph
        for (i = 0; i < $scope.divs.length; i++) {
            var temp = Math.round(($scope.numerators[i] / $scope.denominators[i]) * 100 * 1000000) / 1000000;
            tempX = temp * $scope.zooms[$scope.selectedZoom];

            //Bar results
            if (temp === null || temp === "") {
                $scope.resultText[i] = "Check input";
                $scope.result[i] = 100;
            } else if (temp > 100) {
                $scope.resultText[i] = "Population < Cases";
                $scope.result[i] = 100;
            } else if (temp >= 0 && temp <= 100) {
                $scope.resultText[i] = temp + "%";
                $scope.result[i] = tempX;
                $scope.circles[i] = $scope.returnLoopedArray(10, tempX / 10);
                $scope.humans[i] = $scope.returnLoopedArray(100, tempX);
            } else {
                $scope.resultText[i] = "Check input";
                $scope.result[i] = 100;
            }





        }

    };

    $scope.returnLoopedArray = function(numberOfItems, roundedValue) {
        var loopedArray = [];
        for (j = 0; j < numberOfItems; j++) {
            if (j < Math.round(roundedValue)) {
                loopedArray[j] = true;
            } else {
                loopedArray[j] = false;
            }
        }
        return loopedArray
    };

    //initialize some stuff
    $scope.circles[0] = $scope.returnLoopedArray(10, 100);
    $scope.circles[1] = $scope.returnLoopedArray(10, 100);
    $scope.humans[0] = $scope.returnLoopedArray(100, 100);
    $scope.humans[1] = $scope.returnLoopedArray(100, 100);


    $scope.footerDate = new Date().getFullYear();

});



app.directive("canvaspie", function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            data: '=',
        },
        replace: true,
        link: function(scope, element, attrs) {
            scope.$watch('data', function() {
                var canvas = element[0];
                var first = canvas.getContext("2d");
                first.clearRect(0, 0, canvas.width, canvas.height);
                first.clearRect(0, 0, canvas.width, canvas.height);
                var radius = canvas.width / 2;
                first.beginPath();
                first.arc(radius, radius, radius, 0, (scope.data / 100) * 2 * Math.PI);
                first.lineTo(radius, radius);
                first.fillStyle = "#d9534f";
                first.fill();
                first.beginPath();
                first.arc(radius, radius, radius, (scope.data / 100) * 2 * Math.PI, 2 * Math.PI);
                first.lineTo(radius, radius);
                first.fillStyle = "#444444";
                first.fill();
            })

        },

        template: "<canvas class='canvas' width='75' height='75' ng-transclude></canvas>"
    }
});

app.directive("canvasdots", function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            data: '=',
        },
        replace: true,
        link: function(scope, element, attrs) {
            scope.$watch('data', function() {
                var canvas = element[0];
                var first = canvas.getContext("2d");
                first.clearRect(0, 0, canvas.width, canvas.height);
                first.beginPath();
                first.strokeStyle = '#d9534f';
                var valor = (scope.data / 100) * 10000;
                var square = Math.round(Math.sqrt(valor));

                for (y = 0; y < square; y++) {
                    for (x = 0; x < square; x++) {
                        if (valor > 0) {
                            first.lineTo(x, y);
                            valor--;
                        }
                    }
                }
                first.stroke();


            })

        },

        template: "<canvas class='canvas barholder' width='99' height='99' ng-transclude></canvas>"
    }
});