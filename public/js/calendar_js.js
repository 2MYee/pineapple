var arr = new Array(42); // 여기에 달에 대한 정보 받음
var today = new Date();
var date = new Date();
var prevMonth;

var server = [
    { "id": 1, "date_start": '2018.12.3', "date_end": '2018.12.3', "author": '1234', "title": '고 웹 해', "contents": '즂됐으', "style": 'cyan' },
    { "id": 2, "date_start": '2018.12.12', "date_end": '2018.12.12', "author": '1234', "title": '보 드 타', "contents": '쥬륵쓰', "style": 'grey' },
    { "id": 3, "date_start": '2018.12.12', "date_end": '2018.12.12', "author": '1234', "title": '보 드 또 타', "contents": '쥬륵쓰22', "style": 'red/white' },
    { "id": 4, "date_start": '2018.12.12', "date_end": '2018.12.12', "author": '1234', "title": '망 ㅎ', "contents": '쥬륵쓰333', "style": 'yellow' }
];
var holiday = [];

$(document).ready(function () {
    arr.fill('');

    buildCalendar();
    $('.cal').off().on('click', function () { // 달력 칸 클릭
        changeColorOn(this);
    });

    $('.month').off().on('click', function () { // 상단 월 선택 클릭
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
    console.log('지금' + prevMonth + '월');

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

    if (today.getMonth() + 1 < 10){
        console.log(today.getFullYear() + ' ' + today.getMonth())
        getHoliday(today.getFullYear(), '0' + (today.getMonth() + 1), count, lastDate);
    }
    else{
        console.log(today.getFullYear() + ' ' + today.getMonth())
        getHoliday(today.getFullYear(), (today.getMonth() + 1), count, lastDate);
    }
    // newDateBox(count, lastDate);
    // fillSchedule();
}

function newDateBox(count, lastDate) { // 작은 박스 생성.. box랑 id 다름. 날짜에맞춤
    var tar;
    var box;
    for (var i = 1; i <= lastDate.getDate(); i++) {
        tar = '#box' + (i + count);
        box = "<div" + " id=box" + i + "_1" + " class='dateBox'></div>";
        // console.log(tar);
        $(tar).append(box);
        box = "<div" + " id=box" + i + "_2" + " class='dateBox'></div>";
        $(tar).append(box);
        box = "<div" + " id=box" + i + "_3" + " class='dateBox'></div>";
        $(tar).append(box);
    }
    fillSchedule();
}

function fillSchedule() { // 달력에 스케줄 채움
    var tarDateStart; // 아직 자르지 않은 날짜
    var tarDate; // 자르고 난 날짜 [0], [1], [2]
    var tar;

    for (var i = 0; i < server.length; i++) { // 여기서 스타일지정도 해줘야
        tarDateStart = server[i].date_start;
        tarDate = tarDateStart.split(".");
        tar = "#box" + (Number(tarDate[2])) + "_";

        if (tarDate[0] == today.getFullYear() && tarDate[1] == today.getMonth() + 1) {
            if ($(tar + "1").html() == '') {
                $(tar + "1").html(server[i].title);
                addStyleClass(tar + "1", server[i].style);
            } else if ($(tar + "1").html() != '' && $(tar + "2").html() == '') {
                $(tar + "2").html(server[i].title);
                addStyleClass(tar + "2", server[i].style);
            } else {
                $(tar + "3").html(server[i].title);
                addStyleClass(tar + "3", server[i].style);
            }
        }
    }
}

function addStyleClass(tar, style) { // 스케줄에 스타일 부여는 모두 여기서.
    var list = style.split('/');
    $(tar).addClass('calBox');
    $(tar).css('background', list[0]);
    $(tar).css('color', list[1]);
}

function dateCheck(doMonth) { //임시 날짜체크용
    $('#chatBox').html(doMonth);
}

function changeColorOn(tar) {
    var coverHeight = $(document).height();
    var coverWidth = $(document).width();

    $('#cover').css({ 'width': coverWidth, 'height': coverHeight });
    $('#cover').fadeTo("slow", 0.5);

    $(tar).css('background', 'grey');
    popUp($(tar).offset().top, $(tar).offset().left, tar);
}

function popUp(x, y, tar) {
    $('#memoBox').css('display', 'block').css('top', x + 110).css('left', y + 2);
    $('#memoList').css('display', 'block');
    // $('#memoForm').css('display', 'block');
    // console.log(tar);
    listFilling(tar);
    waitSave(tar);
}

function listFilling(tar) {
    var tarDateStart; // 아직 자르지 않은 날짜
    var tarDate;
    var selected = $(tar).html().split('<'); // get Date
    var temp;
    var id;

    $('#memoTable').html('<thead><tr><th>일정</th><th>날짜</th></tr></thead>'); // initialize

    for (var i = 0; i < server.length; i++) {
        tarDateStart = server[i].date_start;
        tarDate = tarDateStart.split(".");
        if (tarDate[2] == selected[0] && tarDate[1] == today.getMonth() + 1 && tarDate[0] == today.getFullYear()) {
            box = "<tbody>";
            $("#memoTable").append(box);
            box = "<tr><td>" + server[i].title + "</td><td>" + server[i].date_start + "</td><td class='index' style='display:none'>" + server[i].id + "</td></tr>";
            $("#memoTable").append(box);
            box = "</tbody>";
            $("#memoTable").append(box);
        }
    }

    $('td').click(function () { // 일정리스트에서 클릭시 id 반환하게 해줌
        temp = $(this).parents("tr");
        id = $(temp).children('.index').html();
        changePopUp(id);
    });
    $('#newSchedule').click(function () {
        newPopUp(server.length + 1, selected[0]); // 새로운 id 삽입
    });
}

function newPopUp(id, selected) { //여기부터하자 새로글쓰기부분
    $('#memoList').css('display', 'none');
    $('#memoForm').css('display', 'block');
    $('#currentId').html(id);
    $('#title').val();
    $('#date').val(today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + selected);
    $('#explain').val();
}

function changePopUp(id) { //memoForm으로 바꾸고 내용물채움
    $('#memoList').css('display', 'none');
    $('#memoForm').css('display', 'block');
    $('#currentId').html(id);
    $('#title').val(server[id - 1].title);
    $('#date').val(server[id - 1].date_start);
    $('#explain').val(server[id - 1].contents);
}

function clearPopUp() {
    $('#memoList').css('display', 'block');
    $('#memoForm').css('display', 'none');
}

function waitSave(tar) {
    $('#save').off().on('click', function (e) { // 저장버튼 눌렀을때
        var id = $('#currentId').html();
        if (id > server.length) {
            server.push({ "id": server.length + 1, "date_start": $('#date').val(), "date_end": $('date').val(), "author": "1234", "title": $('#title').val(), "contents": $('#explain').val(), "style": "yellow" }); // author 수정
        } else {
            server[id - 1].title = $('#title').val();
            server[id - 1].date_start = $('#date').val();
            server[id - 1].contents = $('#explain').val();
        }
        //링크 기본동작은 작동하지 않도록 한다.
        e.preventDefault();
        $('#cover').hide();
        clearPopUp();
        $('#memoBox').css('display', 'none').css('z-index', '30');
        $(tar).css('background', '#ada8a4');
        buildCalendar();
            console.log('click called')
            $.ajax({
                url: '/calendar/',
                dataType: 'json',
                type: 'POST',
                data: {
                    title: $('#title').val(),
                    date: $('#date').val(),
                    content: $('explain').val()
                },

                success: function (result) {
                    console.log(result)
                }
            })
    });

    $('#delete').off().on('click', function (e) { // 삭제버튼 눌렀을때
        var id = $('#currentId').html();
        const index = server.findIndex(function (item) { return item.id == id });
        console.log("삭제됨?", index);


        $.ajax({
            url:'/calendar/delete',
            
            data:{
                id: id,
                title: $('#title').val(),
                date: $('#date').val(),
                content: $('explain').val()
            },

            success: (result)=>{

            }
        })
        if (index > -1) {
            server.splice(index, 1);
            console.log("삭제됨");
        }

        e.preventDefault();
        $('#cover').hide();
        clearPopUp();
        $('#memoBox').css('display', 'none').css('z-index', '30');
        $(tar).css('background', '#ada8a4');
        buildCalendar();
        
    });

    $('#cover').click(function () {
        $(this).hide();
        $('.window').hide();
        clearPopUp();
        $('#memoBox').css('display', 'none').css('z-index', '30');
        $(tar).css('background', '#ada8a4');
    });
}

function getHoliday(year, month, count, lastDate) {
    var flag = 0;
    for (var i = 0; i < holiday.length; i++) {
        if (String(year)+String(month) == holiday[i]) {
            flag = 1;
        }
    }
    if (flag != 1) { // 리퀘스트하는데 너무 느려서 분기.
        $.ajax({
            url: '/calendar/getHoliday',                //주소
            dataType: 'json',            //데이터 형식
            type: 'POST',                //전송 타입
            data: {
                year: year,
                month: month
            },                           //데이터를 json 형식, 객체형식으로 전송

            success: function (result) {  //성공했을 때 함수 인자 값으로 결과 값 나옴
                console.log(result)
                for (i = 0; i < result.length ; i++) {
                    holiday.push(result[i].locdate[0].slice(0, 6));
                    server.push({
                        "id": -2, "date_start": result[i].locdate[0].slice(0, 4) + '.' + result[i].locdate[0].slice(4, 6) + '.' + result[i].locdate[0].slice(6, 8),
                        "date_end": result[i].locdate[0].slice(0, 4) + '.' + result[i].locdate[0].slice(4, 6) + '.' + result[i].locdate[0].slice(6, 8),
                        "author": "1234", "title": result[i].dateName[0], "contents": '', "style": "red"
                    });
                    // console.log(server);
                    console.log('push done');
                }
                newDateBox(count, lastDate);
            }
        });
    }
    else{
        console.log('');
        newDateBox(count, lastDate);
    }
}

///////////// 절취선

function filling(count) { // 원래 기능을 바꿀때군... 노쓸모 중복
    // var i = tar.id.slice(3); // calendor array index
    // $('#explain').val(arr[i]);
    // console.log(arr[i]);
    var tarDateStart; // 아직 자르지 않은 날짜
    var tarDate; // 자르고 난 날짜 [0], [1], [2] 년 월 일
    var tar;

    $('#memoList').css('display', 'none');
    $('#memoForm').css('display', 'block');

    for (var i = 0; i < server.length; i++) { // 여기서 스타일지정도 해줘야
        tarDateStart = server[i].date_start;
        tarDate = tarDateStart.split(".");
        tar = "#box" + (Number(tarDate[2]) + count) + "_";
        console.log(tar);

        if ($(tar + "1").html() == '') {
            $(tar + "1").html(server[i].title);
            addStyleClass(tar + "1", server[i].style);
        } else if ($(tar + "1").html() != '' && $(tar + "2").html() == '') {
            $(tar + "2").html(server[i].title);
            addStyleClass(tar + "2", server[i].style);
        } else {
            $(tar + "3").html(server[i].title);
            addStyleClass(tar + "3", server[i].style);
        }
    }
    waitSave(tar);
}
