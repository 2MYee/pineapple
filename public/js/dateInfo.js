window.onload = ()=>{

}

const getHoliday = (year, month)=>{
    $.ajax({
        url: '/test',                //주소
        dataType: 'json',            //데이터 형식
        type: 'POST',                //전송 타입
        data:{
            year: year,
            month : month
        },                           //데이터를 json 형식, 객체형식으로 전송
        // data: {msg:$('#msg').val()}, 

        success: function(result) {  //성공했을 때 함수 인자 값으로 결과 값 나옴
            $('#result').html(result[0]['dateName'][0]); //어린이날
            //dateKind, dateName, isHoliday, locdate, seq
            //dateNmae : 이름 (어린이날, 성탄절...)
            //isHoliday : Y or N
            //locdate : 날짜 (20180101)
            
            // if ( result['result'] == true ) {
            //     $('#result').html(result['msg']);
            // }else{
            //     $('#result').html('failed');
            // }
        }
    }); 
}