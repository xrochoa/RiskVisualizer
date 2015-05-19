var app = angular.module("myApp", []);

app.controller("myController", function($scope, $filter) {
    //Initialize data
    $scope.buttons = ['Bar', 'Circles', 'People', 'Pie', 'Dots'];
    $scope.divs = [0, 1];
    $scope.numerators = [null, null];
    $scope.denominators = [null, null];
    $scope.result = [100, 100];
    $scope.resultText = ["Risk", "Risk"];
    $scope.circles = {
        0: [true, true, true, true, true, true, true, true, true, true],
        1: [true, true, true, true, true, true, true, true, true, true]
    };


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

        };
    };
    $scope.addGraph = function() {
        $scope.divs.push($scope.divs.length);
        $scope.result.push(100);
        $scope.resultText.push("Risk");
        $scope.numerators.push(null);
        $scope.denominators.push(null);
        $scope.circles[$scope.divs.length - 1] = [true, true, true, true, true, true, true, true, true, true];


    };

    $scope.getTimes = function(n) {
        return new Array(n);
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
                //Circle results
                $scope.circles[i] = [];
                for (j = 0; j < 10; j++) {
                    if (j < Math.round(temp / 10)) {
                        $scope.circles[i][j] = true;
                    } else {
                        $scope.circles[i][j] = false;
                    }
                }
            } else {
                $scope.resultText[i] = "Check input";
                $scope.result[i] = 100;
            }





        }
    };



    $scope.footerDate = new Date().getFullYear();

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