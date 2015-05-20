var app = angular.module("myApp", []);

app.controller("myController", function($scope, $filter) {
    //Initialize data
    $scope.buttons = ['Bar', 'Circles', 'People', 'Pie', 'Dots'];
    $scope.divs = [0, 1];
    $scope.numerators = [null, null];
    $scope.denominators = [null, null];
    $scope.result = [100, 100];
    $scope.resultText = ["Risk", "Risk"];
    $scope.circles = {};
    $scope.humans = {};
    $scope.caca = 'que es esto';


    //Select type of graph
    $scope.selectedIndex = 0;
    $scope.clickSelect = function(index) {
        $scope.selectedIndex = index;
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

            //Bar results
            if (temp === null || temp === "") {
                $scope.resultText[i] = "Check input";
                $scope.result[i] = 100;
            } else if (temp > 100) {
                $scope.resultText[i] = "Population < Cases";
                $scope.result[i] = 100;
            } else if (temp >= 0 && temp <= 100) {
                $scope.resultText[i] = temp + "%";
                $scope.result[i] = temp;
                $scope.circles[i] = $scope.returnLoopedArray(10, temp / 10);
                $scope.humans[i] = $scope.returnLoopedArray(100, temp);
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


    /*
        var radius = canvas.width / 2;
        first.beginPath();
        first.arc(radius, radius, radius, 0, 0.5 * 2 * Math.PI);
        first.lineTo(radius, radius);
        first.fillStyle = "#d9534f";
        first.fill();
        second.beginPath();
        second.arc(radius, radius, radius, 0.5 * 2 * Math.PI, 2 * Math.PI);
        second.lineTo(radius, radius);
        second.fillStyle = "#5cb85c";
        second.fill();*/


});



app.directive("canvaspie", function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                data: '=',
            },
            controller: function($scope, $element) {
                console.log();

            },
            replace: true,
            link: function(scope, element, attrs) {
                scope.$watch('data', function() {
                        var canvas = element[0];
                        var first = canvas.getContext("2d");
                        var second = canvas.getContext("2d");
                        var radius = canvas.width / 2;
                        first.beginPath();
                        first.arc(radius, radius, radius, 0, (scope.data / 100) * 2 * Math.PI);
                        first.lineTo(radius, radius);
                        first.fillStyle = "#d9534f";
                        first.fill();
                        second.beginPath();
                        second.arc(radius, radius, radius, (scope.data / 100) * 2 * Math.PI, 2 * Math.PI);
                        second.lineTo(radius, radius);
                        second.fillStyle = "#444444";
                        second.fill();
                    })

                },

                template: "<canvas class='canvas' width='75' height='75' ng-transclude></canvas>"
            }
        });

    /*




        for (i = 0; i < 10; i++) {

            if (i == 5) {
                $(".circles").append('<br>');
            }
            $(".circles").append('<span class="glyphicon glyphicon-record"></span>'); //circles
        }
        $(".humans").children().remove();

        for (i = 0; i < 100; i++) {
            if (i == 20 || i == 40 || i == 60 || i == 80) {
                $(".humans").append('<br>');
            }
            $(".humans").append('<span class="glyphicon glyphicon-user"></span>'); //humans
        }

        $(".pie").children().remove();
        $(".pie").append('<canvas class="canvas" width="75" height="75">Please update your browser to support the canvas element.</canvas>'); //pie

        for (p = 0; p < $(".pie").length; p++) {
            var canvas = document.getElementsByClassName("canvas")[p];
            var first = canvas.getContext("2d");
            var second = canvas.getContext("2d");
            var radius = canvas.width / 2;
            first.beginPath();
            first.arc(radius, radius, radius, 0, 0.5 * 2 * Math.PI);
            first.lineTo(radius, radius);
            first.fillStyle = "#d9534f";
            first.fill();
            second.beginPath();
            second.arc(radius, radius, radius, 0.5 * 2 * Math.PI, 2 * Math.PI);
            second.lineTo(radius, radius);
            second.fillStyle = "#5cb85c";
            second.fill();
        }

    };
    
    
    
    
    $scope.compareGraph = function() {

        for (j = 0; j < $(".numerator").length; j++) {

            numerator = $(".numerator:nth(" + j + ")").val();
            denominator = $(".denominator:nth(" + j + ")").val();
            if (numerator > denominator) {
                $(".denominator:nth(" + j + ")").animate({
                    backgroundColor: "#d9534f"
                }, 1000).animate({
                    backgroundColor: "white"
                }, 1000);
            } else if (denominator == 0) {
                $(".numerator:nth(" + j + ")").animate({
                    backgroundColor: "#d9534f"
                }, 1000).animate({
                    backgroundColor: "white"
                }, 1000);
                $(".denominator:nth(" + j + ")").animate({
                    backgroundColor: "#d9534f"
                }, 1000).animate({
                    backgroundColor: "white"
                }, 1000);
            } else {
                result = Math.floor((numerator / denominator) * 100);

                //BAR RESULT

                $(".bar:nth(" + j + ")").css("width", result + "%");
                $(".bar:nth(" + j + ")").html(result + "%");


                $(".circles:nth(" + j + ")").empty(); //reset defaults
                $(".humans:nth(" + j + ")").empty();
                $(".pie:nth(" + j + ")").empty();


                //CIRCLES RESULT

                var i = 0;
                while (i < result / 10) {
                    if (i == 5) {
                        $(".circles:nth(" + j + ")").append('<br>');
                    }
                    $(".circles:nth(" + j + ")").append('<span class="glyphicon glyphicon-record red"></span>');


                    i++;
                }
                while (i < 10) {
                    if (i == 5) {
                        $(".circles:nth(" + j + ")").append('<br>');
                    }
                    $(".circles:nth(" + j + ")").append('<span class="glyphicon glyphicon-record"></span>');

                    i++;
                }

                //HUMAN RESULT


                i = 0;
                while (i < result) {
                    if (i == 20 || i == 40 || i == 60 || i == 80) {
                        $(".humans:nth(" + j + ")").append('<br>');
                    }
                    $(".humans:nth(" + j + ")").append('<span class="glyphicon glyphicon-user red"></span>');


                    i++;
                }
                while (i < 100) {
                    if (i == 20 || i == 40 || i == 60 || i == 80) {
                        $(".humans:nth(" + j + ")").append('<br>');
                    }
                    $(".humans:nth(" + j + ")").append('<span class="glyphicon glyphicon-user"></span>');

                    i++;
                }

                //PIE RESULT
                $(".pie:nth(" + j + ")").append('<canvas class="canvas" width="75" height="75">Please update your browser to support the canvas element.</canvas>');




                var canvas = document.getElementsByClassName("canvas")[j];
                var first = canvas.getContext("2d");
                var second = canvas.getContext("2d");
                var radius = canvas.width / 2;
                first.beginPath();
                first.arc(radius, radius, radius, 0, (result / 100) * 2 * Math.PI);
                first.lineTo(radius, radius);
                first.fillStyle = "#d9534f";
                first.fill();
                second.beginPath();
                second.arc(radius, radius, radius, (result / 100) * 2 * Math.PI, 2 * Math.PI);
                second.lineTo(radius, radius);
                second.fillStyle = "#5cb85c";
                second.fill();






            }
        }
    }
    
    */