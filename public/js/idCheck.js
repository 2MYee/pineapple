$('#idCheck').click( function() {

    $.ajax({
        url: '/check',               //주소
        dataType: 'json',            //데이터 형식
        type: 'POST',                //전송 타입
        data: {name:$('#name').val()}, //데이터를 json 형식, 객체형식으로 전송

        success: function(result) {  //성공했을 때 함수 인자 값으로 결과 값 나옴
            if ( result['result'] == true ) {
                $('#result').html(result['msg']); // TODO : button clickable
            }else{
                $('#result').html('failed'); //TODO : button clickable
            }
        } 
    }); 
})