var arr = new Array(42); // 여기에 달에 대한 정보 받음
var today = new Date();
var date = new Date();
var prevMonth;

$(document).ready(function () {
    arr.fill('');

    buildCalendar();
    $('.cal').off().on('click', function () {
        changeColorOn(this);
    });
    
    $('.month').off().on('click', function () {
        if (this.id == 'leftArrow') {
            prevCalendar(1);
        }
        else if (this.id == 'rightArrow') {
            nextCalendar(1);
        }
        else {
            console.log(this.id - prevMonth);
            if (this.id - prevMonth < 0) {
                prevCalendar(prevMonth - this.id);
            }
            else if (this.id - prevMonth > 0) {
                nextCalendar(this.id - prevMonth);
            }
        }
    });
    
});

function prevCalendar(gap) { //이전 달
    today = new Date(today.getFullYear(), today.getMonth() - gap, today.getDate());
    buildCalendar();
}

function nextCalendar(gap) { //다음 달
    today = new Date(today.getFullYear(), today.getMonth() + gap, today.getDate());
    buildCalendar();
}

function buildCalendar() { //현재 달 달력 만들기
    var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    var count = 0;
    var temp = '#' + prevMonth;

    dateCheck(doMonth);
    $(temp).css('font-size', '25px');
    prevMonth = today.getMonth() + 1;
    temp = '#' + prevMonth;
    $(temp).css('font-size', '35px');
    console.log(prevMonth);

    for (i = 1; i <= 42; i++) { // 숫자비움
        tar = '#box' + (i + count);
        $(tar).html('');
    }
    for (i = 0; i < doMonth.getDay(); i++) { // 1일 시작하는 칸 맞추기
        count += 1;
    }
    for (i = 1; i <= lastDate.getDate(); i++) { // 숫자채움
        tar = '#box' + (i + count);
        $(tar).html(i);
    }
    for (i = 1; i <= 42; i++) { // 색칠
        tar = '#box' + i;
        if (i % 7 == 0) {
            $(tar).css('color', 'blue');
        }
        else if (i % 7 == 1) {
            $(tar).css('color', 'red');
        }
    }

}

function dateCheck(doMonth) {
    $('#chatBox').html(doMonth);
}

// function changeColorOff(tar) { // 삭제준비
//     $('.window .close').click(function (e) {  
//         //링크 기본동작은 작동하지 않도록 한다.
//         e.preventDefault();  
//         $('#mask, .window').hide();  
//     });   
//     $('#memoBox').css('display', 'none').css('z-index', '3');

// }

function changeColorOn(tar) {
    var coverHeight = $(document).height();
    var coverWidth = $(document).width();

    console.log(coverHeight);
    $('#cover').css({ 'width': coverWidth, 'height': coverHeight });
    $('#cover').fadeTo("slow", 0.5);

    $(tar).css('background', 'grey');
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
    $('#save').off().on('click', function (e) {
        var i = tar.id.slice(3); // calendor array index
        arr[i] = $('#explain').val();

        //링크 기본동작은 작동하지 않도록 한다.
        e.preventDefault();
        $('#cover').hide();
        $('#memoBox').css('display', 'none').css('z-index', '30');
        $(tar).css('background', 'white');
    });
    $('#cover').click(function () {
        $(this).hide();
        $('.window').hide();
        $('#memoBox').css('display', 'none').css('z-index', '30');
        $(tar).css('background', 'white');
    });
}

function onCalendar() {
    
}