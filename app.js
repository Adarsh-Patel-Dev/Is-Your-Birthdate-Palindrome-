function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return (str === reverse);
}

function convertDateToStr(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}



function getAllDateFormat(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormat(date) {
    var listOfPalindromes = getAllDateFormat(date);

    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return false;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}



function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [30, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }

    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++
    }
    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {
    var nextCounter = 0;
    var nextDate = getNextDate(date);

    while (1) {
        nextCounter++;
        var isPalindrome = checkPalindromeForAllDateFormat(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);

    }
    return [nextCounter, nextDate];

}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [30, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (isLeapYear(year)) {
            if (day < 1) {
                day = 29;
                month--;
            }
        } else {
            if (day < 1) {
                day = 28;
                month--;
            }
        }
    } else {
        if (day < 1) {
            month--;
            if (month < 1) {
                month = 12;
                year--;
            }
            day = daysInMonth[month - 1];
        }
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getPreviousPalindromeDate(date){
    var prevCounter = 0;
    var previousDate = getPreviousDate(date);

    while(1){
        prevCounter++;
        var isPreviousPalindrome = checkPalindromeForAllDateFormat(previousDate);
        if(isPreviousPalindrome){
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    return [prevCounter,previousDate];
}



    var dateInput = document.querySelector("#bday-input");
    var showBtnRef = document.querySelector("#show-btn");
    var resultRef = document.querySelector("#prevPalindrome");
    // var resultRefer = document.querySelector("#nextPalindrome");
    var output = document.querySelector(".output");


    function clickHandler(e) {
        var bdayStr = dateInput.value;
        output.style.display = "block";

        if (bdayStr !== '') {
            var listOfDate = bdayStr.split('-');
            var date = {
                day: Number(listOfDate[2]),
                month: Number(listOfDate[1]),
                year: Number(listOfDate[0])
            };

            var isPalindrome = checkPalindromeForAllDateFormat(date);

            if (isPalindrome) {
                resultRef.innerText = "WOW your b'day is palindrome 🤩"
                // resultRefer.style.display = "none";

            } else {
                var [ctr, nextDate] = getNextPalindromeDate(date);
                var [previousCtr, previousDate] = getPreviousPalindromeDate(date);
                if(ctr > previousCtr ){
                    resultRef.innerText = `The nearest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year} , you missed it by only ${previousCtr} days 😧!`
                }else{
                    resultRef.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} , you missed it by only ${ctr} days 😧!`
                }
                // resultRef.innerText = `The previous palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year} , you missed it by ${previousCtr} days!`
                // resultRefer.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} , you missed it by ${ctr} days!`

            }
        } else {
            resultRef.innerText = `Please enter date of birth 🤨`;
        }
    }

    showBtnRef.addEventListener("click", clickHandler);