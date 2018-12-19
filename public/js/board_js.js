

const getBoard = ()=>{
    $.ajax({
        url: '/',
        type: 'post',
        dataType: 'json',
        
        success : (result)=>{
            console.log(result);
            //result : Array
            //column : id, title, date, content, style
        }
    })
}