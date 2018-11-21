function checkPassword(e) {
    console.log(e.value);
    // var pw = e.target.value;

    var id = document.getElementById("newIdInput").value;
    var passwordBox = document.getElementById("newPasswordInput");
    var password = passwordBox.value;
    var pwMessage = document.getElementById("pwAlert");

    if (!/^[a-zA-Z0-9]{10,15}$/.test(password)) {
        pwMessage.innerHTML = "숫자와 영문자 조합으로 10~15자리를 사용해야 합니다.";
        setLineColor(passwordBox, '2px', 'red');
        opacityVisible(pwMessage);
        return false;
    }

    var checkNumber = password.search(/[0-9]/g);
    var checkEnglish = password.search(/[a-z]/ig);

    if (checkNumber < 0 || checkEnglish < 0) {
        pwMessage.innerHTML = "숫자와 영문자를 혼용하여야 합니다.";
        setLineColor(passwordBox, '2px', 'red');
        opacityVisible(pwMessage);
        return false;
    }

    if (/(\w)\1\1\1/.test(password)) {
        pwMessage.innerHTML = '같은 문자를 4번 이상 사용하실 수 없습니다.';
        setLineColor(passwordBox, '2px', 'red');
        opacityVisible(pwMessage);
        return false;
    }

    // if (password.search(id) > -1) {
    //     alert("비밀번호에 아이디가 포함되었습니다.");
    //     return false;
    // }
    setLineColor(passwordBox, '1px', '#c4c2c2');
    opacityUnvisible(pwMessage);
    // pwMessage.innerHTML = '';
    return true;
}

function checkPasswordAgain(e) {
    var pw = document.getElementById('newPasswordInput').value;
    var pwConfirm = e.value;
    var confirmMessage = document.getElementById('pwConfirmAlert');

    if (pwConfirm != '' && (pwConfirm != pw)) {
        confirmMessage.innerHTML = "비밀번호가 일치하지 않습니다.";
        console.log(pwConfirm != pw);
        setLineColor(e, '2px', 'red');
        opacityVisible(confirmMessage);
        return false;
    }
    
    setLineColor(e, '1.5px', '#c4c2c2');
    opacityUnvisible(confirmMessage);
    // confirmMessage.innerHTML = '';
    return true;
}

function opacityVisible(e){
    e.style.opacity = '1';
}

function opacityUnvisible(e){
    e.style.opacity  = '0';
}

function setLineColor(e, px, color) {
    e.style.borderBottom = 'solid ' + px + ' ' + color;
}

function textMoveUp(tar){
    tar.style.top ='30px';
    tar.style.left ='11px';
    // tar.style.color = 'rgb(8, 156, 255)';
    tar.style.fontSize = "15px";
    tar.style.marginTop = "13.5px";
}
function textMoveDown(tar,e){
    // var e = document.getElementById('newIdInput');
    if(e.value != '')
        return false;

    tar.style.top ='50px';
    tar.style.left ='15px';
    tar.style.color = 'grey';
    tar.style.fontSize = "25px";
    tar.style.marginTop = 0;

    return true;
}

// $(document).ready(function(){
//     var temp = $('#pwAlert').html();
//     $("#pwAlert").mouseenter(function(){
//         $('#pwAlert').html("숫자와 영문자 조합으로 10~15자리 사용");
//     });
//     console.log(temp);
//     $("#pwAlert").mouseleave(function(){
//         $('#pwAlert').html(temp);
//     });
// })
// window.onload = function() {
//     var id = document.getElementById("newIdInput");
//     var pw = document.getElementById("newPasswordInput");

//     checkPassword(id, pw);
// }
// 이벤트핸들러...
// 이벤트 리스너