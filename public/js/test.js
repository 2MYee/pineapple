
$('#save').click(function(){
    console.log('click called')
    $.ajax({
        url: '/calendar',
        dataType: 'json',
        type: 'POST',
        data:{
            title: $('#title').val(),
            date: $('#date').val(),
            content: $('explain').val()
        },

        success: function(result){
            console.log(result)
        }
    })
})

$('#ajaxsend').click( function() {

    $.ajax({
        url: '/test',                //주소
        dataType: 'json',            //데이터 형식
        type: 'POST',                //전송 타입
        data: {msg:$('#msg').val()}, //데이터를 json 형식, 객체형식으로 전송

        success: function(result) {  //성공했을 때 함수 인자 값으로 결과 값 나옴
            if ( result['result'] == true ) {
                $('#result').html(result['msg']);
            }else{
                $('#result').html('failed');
            }
        } 
    }); 
})


$('#delete').click(()=>{
    $.ajax({
        url:'/calendar/delete',
        
        data:{
            title: $('#title').val(),
            date: $('#date').val(),
            content: $('explain').val()
        },

        success: (result)=>{

        }
    })
})