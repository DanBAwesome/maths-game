var startGame = function (selectedOperators, maxSumLength, callback) {
    var numbers = [];
    var operators = ["+", "-", "×", "÷"];
    var operatorOrder = [];
    var answer = 0;
    var initInput = false;
    var timer;
    var seconds = 10;
    var score = 0;

    var gameSetup = function () {
        numbers.length = 2;
        createSum();
        createDOM();
        createEventListeners();
        $("#input").focus();
    };

    var createEventListeners = function () {
        $(document).on("input", "#input", function () {
            if (!initInput) {
                timer = window.setInterval(function () {
                    seconds--;
                    $("#gameWindow .card-title").text(setTime());

                    if(seconds === 0) {
                        window.clearInterval(timer);
                        callback(score);
                    }
                }, 1000);
                initInput = true;
            }

            if (parseFloat($(this).val()) === answer) {
                score++;
                setScore();
                $("#currentScore").text(setScore());
                $(this).val("");
                createSum();
                $("#currentSum").text(createSumText());
                seconds++;
                $("#gameWindow .card-title").text(setTime());

                if(score > highscore) {
                    highscore = score;
                    $("#highscore").text(setHighscore());
                }
            }
        });
    };

    var createSum = function () {
        operatorOrder = [];
        for (i = 0; i < numbers.length; i++) {
            numbers[i] = Math.ceil(Math.random() * maxSumLength);
        }

        answer = numbers.reduce(function (max, number) {
            var currentOperator = selectedOperators[Math.floor(Math.random() * (selectedOperators.length))];
            operatorOrder.push(currentOperator);
            return getOperator(currentOperator, max, number);
        });

        while(answer % 1 !== 0 || answer < 0) {
            createSum();
        }
    };

    var setScore = function() {
        return "Current Score: " + score;
    };

    var setHighscore = function() {
        return "High Score: " + highscore;
    };

    var createSumText = function () {
        var sumText = "";
        for (var i = 0; i < operatorOrder.length; i++) {
            if (i === 0) {
                sumText += numbers[i];
            }

            sumText += " " + operatorOrder[i] + " " + numbers[i + 1];
        }

        return sumText;
    };

    var getOperator = function (operator, a, b) {
        switch (operator) {
            case operators[0]: return a + b;
            case operators[1]: return a - b;
            case operators[2]: return a * b;
            case operators[3]: return a / b;
        }
    };

    var setTime = function () {
        return "Remaining Time: " + seconds + "s";
    };

    var createDOM = function () {
        $("#gameWindow .card-body").append("<h1 class='card-title'>" + setTime() + "</h1>" +
            "<h3 id='currentSum'>" + createSumText() + "</h3>" +
            "<input class='form-control w-25 m-auto' id='input' type='number' autocomplete='off' />" +
            "<p id='currentScore'>" + setScore() + "</p>" +
            "<p id='highscore'>" + setHighscore() + "</p>"
        );
    };

    gameSetup();
}