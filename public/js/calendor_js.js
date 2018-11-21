var arr = new Array(30);
// var arr = [];


$(document).ready(function () {
    arr.fill('');
    // new Promise(function () {
        $('.cal').off().on('click', function () {
            changeColorOn(this);
            // popUp($(this).offset().top, $(this).offset().left);
            // filling(this);
        });
    // });
});

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