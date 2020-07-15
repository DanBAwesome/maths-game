var highscore = 0;

(function () {
    var selectedOperators = ["+"];
    var sumLength = 10;

    var setup = function () {
        var localHighscore = localStorage.getItem("highscore");
        if (localHighscore) {
            highscore = localHighscore;
        }
        $("#gameWindow .card-body").text("");
        $("#gameWindow .card-body").append("<h1 class='card-title'>10 Second Maths Game</h1>" +
            "<div>High Score: " + highscore + "</div>" +
            "<form id='settings'>" +
                "<div>" +
                    "<div class='custom-control custom-checkbox'>" +
                    "<input type='checkbox' class='custom-control-input' value='+' id='add' /><label class='custom-control-label' for='add'>+</label>" +
                    "</div>" +
                    "<div class='custom-control custom-checkbox'>" +
                    "<input type='checkbox' class='custom-control-input' value='-' id='subtract'/><label class='custom-control-label' for='subtract'>-</label>" +
                    "</div>" +
                    "<div class='custom-control custom-checkbox'>" +
                    "<input type='checkbox' class='custom-control-input' value='×' id='multiply'/><label class='custom-control-label' for='multiply'>×</label>" +
                    "</div>" +
                    "<div class='custom-control custom-checkbox'>" +
                    "<input type='checkbox' class='custom-control-input' value='÷' id='divide'/><label class='custom-control-label' for='divide'>÷</label>" +
                    "</div>" +
                "</div>" +
                "<div id='numRange'>" +
                    "<label class='d-block'>" + changeMaxLengthDOM() + "</label>" +
                    "<input type='range' min='10' max='50' step='5' value='"+ sumLength + "' />" +
                "</div>" +
            "</form>" +
            "<button id='begin' class='btn btn-primary'>Begin</button>");
        createEventListeners();
        wasOperatorSelected();
    };

    var addScoreToDOM = function(score) {
        var scoreText = "Your Score Was: " + score;
        if(Number(score) === Number(highscore)) {
            scoreText = "New High Score!!!";
        }
        $(".card-title").first().next().after("<p id='finalScore'>" + scoreText + "</p>");
    };

    var wasOperatorSelected = function() {
        for(var checkbox of $("#settings [type=checkbox]")) {
            if(selectedOperators.indexOf($(checkbox).val()) !== -1) {
                $(checkbox).prop("checked", true);
            }
        }
    };

    var addOperatorChoices = function() {
        for(var checkbox of $("#settings [type=checkbox]")) {
            var selectedIndex = selectedOperators.indexOf($(checkbox).val());
            console.log(selectedIndex)
            if(checkbox.checked && selectedIndex === -1) {  
                selectedOperators.push($(checkbox).val())
            }
            else if(!checkbox.checked && selectedIndex !== -1){
                selectedOperators.splice(selectedIndex, 1);
            }
        }
    };

    var changeMaxLengthDOM = function() {
        return "Number Limit: " + sumLength;
    };

    var createEventListeners = function () {
        $(document).on("click", "#begin", function () {
            addOperatorChoices();
            if(selectedOperators.length === 0) {
                return alert("Please Select At Least One Operator To Begin");
            }
            $(this).closest(".card-body").text("");
            startGame(selectedOperators, sumLength, function (score) {
                localStorage.setItem("highscore", highscore);
                $(document).off();
                setup();
                addScoreToDOM(score);
                selectedOperators = [];
            });
        });

        $(document).on("input", "#settings [type=range]", function() {
            sumLength = $(this).val();
            $("#settings > #numRange > label").text(changeMaxLengthDOM());
        });
    };

    $(document).ready(function () {
        setup();
    });
})();
