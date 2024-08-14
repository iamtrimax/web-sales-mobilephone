var dataNameProduct = getProduct("ProductIsSelected").nameProduct;
var dataprice = getProduct("ProductIsSelected").priceProduct;
var selected_pay
var select_gender;
$(document).ready(function(){
    console.log(document.referrer)
    $('#sl').val(getProduct('ProductIsSelected').quanty+"");
    $('.total').html(parseInt($('#sl').val())* parseInt(dataprice.replace(/\./g, ""))+'VND');
    var list_infor=getProduct("inforCus")||[];
    $('#card').hide();
    // Kiểm tra xem ô input radio nào được chọn
    $("input[name='pay']").change(function() {
        $('#card').hide();
        selected_pay = $(this).val();
        if(selected_pay=="0"){
            $('#card').show();
        }
    });
    var name = $("#name");
    function checkName(){
        $(".err_name").remove();
        if(name.val()==""){
            $('#name').after('<span class="err_name text-danger mt-1"><br>không được bỏ trống ô này</span>');
            return false;
        }
        else
            return true;
    }
    name.blur(checkName);
  ///////////////////
  var ngaysinh = $('#ns');
  function checkns(){
    $('.err_ns').remove()
    if(ngaysinh.val()==""){
        ngaysinh.after('<span class="err_ns text-danger mt-1"><br>không được bỏ trống ô này</span>');
        return false;
    }else{
        cur_day = new Date();
        select_day = new Date(ngaysinh.val());
        if(cur_day.getFullYear()-select_day.getFullYear()<15){
            ngaysinh.after('<span class="err_ns text-danger mt-1"><br>Tuổi không hợp lệ</span>');
            return false
        }
        else{
            return true;
        }
    }
  }
  ngaysinh.blur(checkns);
  var identifine = $('#cccd');
  function checkIdentifine(){
    $('.err_i').remove();
    if(identifine.val()==""){
        identifine.after('<span class="err_i text-danger mt-1"><br>không được bỏ trống ô này</span>');
    }
    else{
        var reg = /^\d{9,12}$/
        if(reg.test(identifine.val())==false){
           identifine.after('<span class="err_i text-danger mt-1"><br>căn cước công dân hoặc chứng minh nhân dân không hợp lệ</span>');
            return false
        }else{
            return true;
        }
    }
    return true;
  }
  identifine.blur(checkIdentifine);
  var phone = $('#phone');
  function checkphone(){
    $('.err_p').remove();
    if(phone.val()==""){
        phone.after('<span class="err_p text-danger mt-1"><br>không được bỏ trống ô này</span>');
    }
    else{
        var reg_phone = /^[0]{1}[2-9]{1}[0-9]{8}$/
        if(reg_phone.test(phone.val())==false){
           phone.after('<span class="err_p text-danger mt-1"><br>số điện thoại không hợp lệ</span>');
            return false
        }else{
            return true;
        }
  }
  return true;
}
  phone.blur(checkphone);

  var addr = $('#addr');
  function checkaddr(){
    $('.err_addr').remove();
    if(addr.val()==""){
        addr.after('<span class="err_addr text-danger mt-1"><br>không được bỏ trống ô này</span>');
        return false;
    }
    return true;
  }
  addr.blur(checkaddr);
  var reg_num = /^\d{16}$/
  var numcard = $('#numcard');
    function checknc(){
    $('.err_nc').remove();
    if(numcard.val()==""){
        numcard.after('<span class="err_nc text-danger mt-1"><br>không được bỏ trống ô này</span>');
    }
    else{
        if(reg_num.test(numcard.val())==false){
            numcard.after('<span class="err_nc text-danger mt-1"><br>số thẻ không hợp lệ</span>');
            return false;
        }
    }
    return true;
    }    numcard.blur(checknc);
    //tính tổng giá tiền
    $('#sl').on('input',function(){
        var total = parseInt($(this).val())* parseInt(dataprice.replace(/\./g, ""));
        $('.total').html(total+'vnd');
    })
    // đưa tên sản phẩm và giá vào ô tên sản phẩm và giá
    $('.name').text(dataNameProduct);
    $('.cost').text(dataprice);
//lấy dữ liêu tên ngân hàng
    var selectedValue;
    $('#nameBank').change(function() {
        selectedValue = $(this).val(); // Lấy giá trị của option được chọn
      });
    $('input[name=gt]').change(function(){
        select_gender = $(this).val()
    })
    function createObject(){
        var today = new Date();
        var datebuy = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()+"   "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()    
        var infor ={
            //tạo đối tượng chứa info của khác hàng
                nameProduct:dataNameProduct,
                quanty:$('#sl').val(),
                price:dataprice,
                fullname:name.val(),
                birthday:ngaysinh.val(),
                identifine:identifine.val(),
                gender:select_gender,
                address:addr.val(),
                phone:phone.val(),
                email:$('#email').val(),
                pay:selected_pay,
                dateBuy: datebuy
        };
        return infor;
    }
// sự kiện khi đặt hàng
    $('#book').on('click',function(){
        if($('input[name=pay]').val()=="0"){
            if(!checkName()||!checkns()||!checkIdentifine()||!checkaddr()||!checkphone()||!checknc()){
                alert("kiểm tra lại thông tin")
                return false
            }else{
                list_infor.push(createObject());
                SaveProductToLocalstorage("inforCus",list_infor)
                alert("mua hàng thành công");
                if(document.referrer.includes("http://127.0.0.1:5501/FE/cart/cart.html")){
                    var list_cart = getProduct("list_cart") || [];
                    var pos = getProduct("pos_buy")
                    var numofpro = getProduct('soluonghangtronggio')
                    numofpro-=1
                    console.log(list_cart)
                    list_cart.splice(parseInt(pos), parseInt(pos)+1);
                    SaveProductToLocalstorage("list_cart",list_cart)
                    SaveProductToLocalstorage('soluonghangtronggio',numofpro);
                    console.log(getProduct('list_cart'))
                    
                }
                window.location.href="/FE/historyBuy/historyBuy.html";
                return true
            }
        }else{
            if(!checkName()||!checkns()||!checkIdentifine()||!checkaddr()||!checkphone()){
                alert("kiểm tra lại thông tin")
                return false
            }else{
                list_infor.push(createObject())
                SaveProductToLocalstorage("inforCus",list_infor)
                alert("mua hàng thành công");
                if(document.referrer.includes("http://127.0.0.1:5501/FE/cart/cart.html")){
                    var list_cart = getProduct("list_cart") || [];
                    var pos = getProduct("pos_buy").selected
                    console.log(list_cart)
                    list_cart.splice(parseInt(pos), parseInt(pos)+1);
                    SaveProductToLocalstorage("list_cart",list_cart)
                    console.log(getProduct('list_cart'))
                }
                window.location.href="/FE/historyBuy/historyBuy.html";
                return true
            }

        }
    })
    console.log(selected);
})

//var namephone = document.getElementsByClassName('name');
//namephone.innerText = namephone;
//console.log(dataNameProduct);
