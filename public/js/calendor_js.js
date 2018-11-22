var arr = new Array(42);
// var arr = [];
var mon = new Array(12);
var today = new Date();
mon.fill('aaa');
mon[10] = '0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,0,0,0,0,0,0,0,0';
mon[11] = '0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,0,0,0,0,0';

$(document).ready(function () {
    arr.fill('');
    var mm = today.getMonth(); // Jan is 0
    setUpDate(mon[mm]); // 서버에서 현 날짜 저장.

    $('.cal').off().on('click', function () {
        changeColorOn(this);
    });

    $('.month').off().on('click', function () {
        console.log(this.id);
        if (this.id == '11') {
            setUpDate(mon[10]);
            mm = 10;
        }
        else if (this.id == '12') {
            setUpDate(mon[11]);
            mm = 11;
        }
        else if (this.id == 'leftArrow') {
            mm -= 1;
            if (mm < 0)
                mm = 11;
            setUpDate(mon[mm]);
        }
        else if (this.id == 'rightArrow') {
            mm += 1;
            if (mm > 11)
                mm = 1;
            setUpDate(mon[mm]);
        }
    });
});

function setUpDate(mon) {
    var i;
    var tar;
    var tmp = new Array();
    for (i = 1; i <= 42; i++) {
        tar = '#box' + i;
        $(tar).html('');
    }

    tmp = mon.split(',');
    for (i = 1; i <= 42; i++) {
        tar = '#box' + i;
        if (tmp[i - 1] != 0) {
            if (i % 7 == 0) {
                $(tar).html(tmp[i - 1]).css('color', 'blue');
            } else if (i % 7 == 1) {
                $(tar).html(tmp[i - 1]).css('color', 'red');
            } else {
                $(tar).html(tmp[i - 1]);
            }
        }
    }
    // var i = tar.id.slice(3);
}

function changeColorOff(tar) {
    $(tar).css('background', 'white');
    $('#cover').css('background', 'white').css('display', 'none').css('opacity', 1);
    $('#memoBox').css('display', 'none').css('z-index', '3');

}

function changeColorOn(tar) {
    $(tar).css('background', 'grey');
    $('#cover').css('background', 'darkgrey').css('display', 'block').css('opacity', 0.5).css('z-index', '1');
    popUp($(tar).offset().top, $(tar).offset().left, tar);
}

function popUp(x, y, tar) {
    $('#memoBox').css('display', 'block').css('top', x + 110).css('left', y + 2);
    console.log(tar);
    filling(tar);
}

function filling(tar) {
    var i = tar.id.slice(3); // calendor array index
    $('#explain').val(arr[i]);
    console.log(arr[i]);
    waitSave(tar);
}

function waitSave(tar) {
    $('#save').off().on('click', function () {
        var i = tar.id.slice(3); // calendor array index
        arr[i] = $('#explain').val();
        changeColorOff(tar);
    });
}