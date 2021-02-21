module.exports = function toReadable (number) {
    let digits = ["zero","one","two","three","four","five","six","seven",
        "eight","nine","ten","eleven","twelve","thirteen",
        "fourteen","fifteen","sixteen","seventeen","eighteen",
        "nineteen"];
    let dozens = ["twenty","thirty","forty","fifty","sixty","seventy",
        "eighty","ninety"];
    let other =  ["hundred","thousand","million","billion","trillion"];

    let numArr = number.toString().split('').reverse();

    let counter = 0;
    let arr = [];

    for(let i = 0; i < numArr.length; i++) {
        counter++;
        if(counter === 2) {
            arr.push(numArr.slice(i-1, i+1));
            counter = -1;
        }
        if(counter === 0) {
            arr.push(numArr[i]);
        }
        if(counter === 1 && i+1 === numArr.length) {
            arr.push(numArr[i]);
        }
    }
    arr = arr.reverse();

    let resStr ='';
    let realLen = numArr.length;
    for(let i = 0; i < arr.length; i++) {
        let checkPos = checkState(realLen);
        if(arr[i].length === 2) {
            let fNumber = parseInt(arr[i][1], 10);
            let sNumber = parseInt(arr[i][0], 10);
            if(fNumber < 2) {
                let smallNumber = parseInt(arr[i].reverse().join(''), 10);
                if(smallNumber) {
                    resStr = resStr + ' ' +  digits[smallNumber];
                }
            } else  {
                if(sNumber) {
                    resStr = resStr + ' ' + dozens[fNumber-2] + ' ' + digits[sNumber];
                } else {
                    resStr = resStr + ' ' + dozens[fNumber-2];
                }
            }

            if( checkPos > -1) {
                resStr = resStr + ' ' +other[checkPos];
            }
            realLen = realLen - 2;
        } else {
            let oneNumber = parseInt(arr[i], 10);
            if(oneNumber) {
                resStr = resStr + ' ' + digits[oneNumber];
                if( checkPos > -1) {
                    resStr = resStr + ' ' +other[checkPos];
                }
            } else if(arr.length === 1) {
                resStr = digits[oneNumber];
            }
            realLen--;
        }
    }
    return resStr.trim();
}

function checkState(curPosition) {
    if(curPosition === 13 ||curPosition === 14) {
        return 4;
    }
    if(curPosition === 10 ||curPosition === 11) {
        return 3;
    }
    if(curPosition === 7 ||curPosition === 8) {
        return 2;
    }
    if(curPosition === 4 ||curPosition === 5) {
        return 1;
    }
    if(curPosition % 3 === 0) {
        return 0;
    }
    return -1;
}
