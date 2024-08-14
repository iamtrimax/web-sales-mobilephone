/*
const user_name = document.querySelector("#name");
const email_user = document.querySelector("#email_user");
const pw = document.querySelector("#pw");
const pw1 = document.querySelector("#pw1");
const btn = document.querySelector("#dk");
btn.addEventListener("click", e => {
    e.preventDefault();
    if(user_name.value=="" || email_user.value == "" || pw.value == "" || pw1.value =="")
    {
        alert("không được bỏ trống");
    }
    else{

        if(pw.value!==pw1.value){
            
        }
        else{
            const user = {
                username: user_name.value,
                email: email_user.value,
                passwords: pw.value
            };
          let json = JSON.stringify(user);
           localStorage.setItem(email_user.value, json);
           alert("Đăng ký thành công");
           window.location.href = "/FE/account/login_page/login.html";
        }
    }
  
})*/
var isLogin = false;
$(document).ready(function(){
    //reg account
    var name = $("#name");
    function checkName(){
        $(".err_name").remove();
        if(name.val()==""){
            $('#name').after('<span class="err_name"><br>không được bỏ trống ô này</span>');
            return false;
        }
        else
            return true;
    }
    name.blur(checkName);
    //check email
    var email = $("#email_user");
    function checkEmail(){
        var reg_mail = /^[a-zA-Z0-9]+\@[a-zA-Z]+\.[a-z]{2,4}/
        $(".err_email").remove();
        if(email.val()==""){
            $('#email_user').after('<span class="err_email"><br>không được bỏ trống ô này</span>');
            return false;
        }else if(reg_mail.test(email.val())==false){
            $('#email_user').after('<span class="err_email"><br>Email không hợp lệ</span>');
            return false;
        }else
            return true;
    }
    email.blur(checkEmail);
    //check pw
    var pw = $("#pw");
    function checkpw(){
        var reg_pw = /^[A-Za-z0-9(!@#$%^&*()._ ]{6,}$/
        $(".err_pw").remove();
        if(pw.val()==""){
            $('#pw').after('<span class="err_pw"><br>không được bỏ trống ô này</span>');
            return false;
        }else if(reg_pw.test(pw.val())==false){
            $('#pw').after('<span class="err_pw"><br>Mật khẩu không hợp lệ</span>');
            return false;
        }else
            return true;
    }
    pw.blur(checkpw);
    //check passwords confirm
    var pw1 = $("#pw1");
    function checkpwcf(){
        $(".err_pw1").remove();
        if(pw.val()==""){
            $('#pw1').after('<span class="err_pw"><br>không được bỏ trống ô này</span>');
            return false;
        }else if(pw1.val()!=pw.val()){
            $('#pw1').after('<span class="err_pw1"><br>Mật khẩu không khớp</span>');
            return false;
        }else
            return true;
    }
    pw1.blur(checkpwcf);

    $('#btnDk').click(function(){
        if(!checkName()||!checkEmail()||!checkpw()||!checkpwcf()){
            alert("Kiểm tra và nhập đúng thông tin");
            return false;
        }else{
            const user = {
                username:name.val(),
                emailu: email.val(),
                passwords: pw.val(),
                status: isLogin,
            };
           let json = JSON.stringify(user);
           localStorage.setItem(email.val(), json);
           alert("Đăng ký thành công");
           window.location.href = "/FE/account/login_page/login.html";
        }
    });
    //login account
    var email_ip = $("#email_user_inp");
    function checkNameLogin(){
        $(".err_name").remove();
        if(email_ip.val()==""){
           email_ip.after('<span class="err_name"><br>không được bỏ trống ô này</span>');
            return false;
        }
        else
            return true;
    }
    email_ip.blur(checkNameLogin);
    //checkpwip
    var pw_ip = $("#pw_inp");
    function checkpwLogin(){
        $(".err_pw").remove();
        if(pw_ip.val()==""){
           pw_ip.after('<span class="err_pw"><br>không được bỏ trống ô này</span>');
            return false;
        }
        else
            return true;
    }
    pw_ip.blur(checkpwLogin);
    //login
    $('#loginbtn').click(function(){
        if(!checkNameLogin()||!checkpwLogin()){
            return false;
        }else{
            const data = JSON.parse(localStorage.getItem(email_ip.val()));
            if(data===null){
                alert("Người dùng không tồn tại vui lòng kiểm tra lại email hoặc mật khẩu");
            }
            else{
                if(data.emailu===email_ip.val()&& data.passwords===pw_ip.val()){
                    alert("đăng nhập thành công");
                    isLogin=true;
                    const user_cur={
                        name:data.username,
                        email:data.emailu,
                        status:isLogin
                    }
                    window.localStorage.setItem('curent_user',JSON.stringify(user_cur));
                    window.location.href="/FE/home/home.html"
                }
                else{
                    alert("Người dùng không tồn tại vui lòng kiểm tra lại email hoặc mật khẩu");
                }
            }

        }
    })
    //forget pass
    $('#dy').click(function(){
        if(!checkName()||!checkEmail()||!checkpw()||!checkpwcf()){
            alert("Kiểm tra và nhập đúng thông tin");
            return false;
        }
        else{
            const data = JSON.parse(localStorage.getItem(email.val()));
            if((data.username === name.val() && data.emailu===email.val())&&(pw.val()===pw1.val())){
                const user = {
                    username: name.val(),
                    emailu: email.val(),
                    passwords: pw.val()
                };
                let json = JSON.stringify(user);
            localStorage.setItem(email.val(), json);
                alert("Đổi mật khẩu thành công");
                window.location.href="/FE/account/login_page/login.html"
            }else{
                if(data.username !== name.val()|| data.email!==email.val()){
                    alert("Tài khoản không tồn tại vui lòng kiểm tra lại username hoặc email");
                }
            }
        }
    })
    $('#logout').click(function(){
        localStorage.removeItem("curent_user")
    })
})
/*function login(){
    const email_inp = document.querySelector("#email_user_inp");
    const pass_inp = document.querySelector("#pw_inp");
    const loginBtn = document.querySelector("#loginbtn");
    loginBtn.addEventListener("click", e => {
        e.preventDefault();
        if(email_inp.value==="" || pass_inp.value===""){
            alert("không được bỏ trống");
        }else{
            const data = JSON.parse(localStorage.getItem(email_inp.value));
            console.log(data.email);
            console.log(data.passwords);
            if(data.email===email_inp.value&& data.passwords===pass_inp.value){
                alert("đăng nhập thành công");
                window.location.href="/FE/home/home.html"
            }
            else if(email_inp.value!==data.email||pass_inp.value!==data.passwords){
                alert("vui lòng kiểm tra lại email hoặc mật khẩu");
            }
        }
    })
}*/
/*function Forgetpw(){
    const user_name = document.querySelector("#name");
    const email_user = document.querySelector("#email_user");
    const pw = document.querySelector("#pw");
    const pw1 = document.querySelector("#pw1");
    const dk = document.querySelector("#dy");
    dk.addEventListener("click", e =>{
        e.preventDefault();
        if(user_name.value=="" || email_user.value == "" || pw.value == "" || pw1.value =="")
        {
            alert("không được bỏ trống");
        }else{
            const data = JSON.parse(localStorage.getItem(email_user.value));
            if((data.username === user_name.value && data.email===email_user.value)&&(pw.value===pw1.value)){
                const user = {
                    username: user_name.value,
                    email: email_user.value,
                    passwords: pw.value
                };
                let json = JSON.stringify(user);
            localStorage.setItem(email_user.value, json);
                alert("Đổi mật khẩu thành công");
                window.location.href="/FE/account/login_page/login.html"
            }else{
                if(data.username !== user_name.value || data.email!==email_user.value){
                    alert("Tài khoản không tồn tại vui lòng kiểm tra lại username hoặc email");
                }
                else{
                    if(pw.value!==pw1.value){
                        alert("Mật khẩu không khớp");
                    }
                }
            }
        }
    })
}*/


