window.onload = function(){
    // $('#result').html('aaaaa');
}

$('#ajaxsend').click( function() {
    console.log('called')
    $.ajax({
        url: '/test',                //주소
        dataType: 'json',            //데이터 형식
        type: 'POST',                //전송 타입
        data: {msg:$('#msg').val()}, //데이터를 json 형식, 객체형식으로 전송

        success: function(result) {  //성공했을 때 함수 인자 값으로 결과 값 나옴
            $('#result').html(result[0]['dateName'][0]); //어린이날
            
            // if ( result['result'] == true ) {
            //     $('#result').html(result['msg']);
            // }else{
            //     $('#result').html('failed');
            // }
        }
    }); 
})

$('#asdf').click( function(){
    $.ajax({
        url:'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=2015&solMonth=05&ServiceKey=n3ZXMtMlodEBPY8IeuelMTZp%2FcgX6pCpXY%2Bi7VTS%2FHTgUO7quObnSu8RxAP9NbCiieqGcNd17bkrSTcvSuAbKA%3D%3D',
        type:'GET',
        dataType:'jsonp',

        success: function(xml){
            $(xml).find('item').each(function(){
                $(this).find('dataName').each(function(){
                    var name = $(this).text;
                    $('#result').append('<p1>name</p1>')
                })
            })
        }
    })
})

// document.querySelector('.ajaxsend').addEventListener('click', function () {
//     // 입력값 위치를 찾아 변수에 담고
//     console.log('clicked')
//     // var inputdata = document.forms[0].elements[0].value;
//     // sendAjax 함수를 만들고 URL과 data를 전달
//     sendAjax('http://localhost:3000/test', 'qwerty')
// })


// function sendAjax(url, test) {

//     // 입력값을 변수에 담고 문자열 형태로 변환
//     var data = {
//         email: test
//     };
//     data = JSON.stringify(data);
//     console.log(data.email);
//     // content-type을 설정하고 데이터 송신
//     var xhr = new XMLHttpRequest();
//     xhr.open('post', '/test');
//     xhr.setRequestHeader('Content-type', "application/json");
//     xhr.send(data);

//     // 데이터 수신이 완료되면 표시
//     xhr.addEventListener('load', function () {
//         console.log(xhr.responseText);
//         // 문자열 형식으로 변환
//         var result = JSON.parse(xhr.responseText);
//         // 데이터가 없으면 return 반환
//         if(result.result !== 'ok') return;
//         // 데이터가 있으면 결과값 표시
//         document.querySelector(".result").innerHTML = result.email;
//     });
// }

