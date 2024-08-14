var numofpro;
$(document).ready(function(){
  var list_cart = getProduct('list_cart') || []
  numofpro = getProduct("soluonghangtronggio")|| 0;
  var list_cmt = getProduct("list_cmt") || [];
    $('<img>', {
      class: "img-thumbnail",
      src: getProduct("ProductIsSelected").pathImg,
      width: "300px"
    }).insertAfter($('#imgs'));
    $('#product').html(getProduct('ProductIsSelected').nameProduct)
    $('#cost').html(getProduct('ProductIsSelected').priceProduct)
    $('#comp').html("Công ty: "+getProduct('ProductIsSelected').company)
    $('#promo').html("khuyến mãi: "+getProduct('ProductIsSelected').promo.name+" "+getProduct('ProductIsSelected').promo.value)
    $('#numRate').html("Số lượt đánh giá: "+getProduct('ProductIsSelected').numrate+" đánh giá")
    $('#scr').html(getProduct('ProductIsSelected').detail.screen)
    $('#Fcam').html(getProduct('ProductIsSelected').detail.cameraFront)
    $('#Bcam').html(getProduct('ProductIsSelected').detail.camera)
    $('#os').html(getProduct('ProductIsSelected').detail.os)
    $('#cpu').html(getProduct('ProductIsSelected').detail.cpu)
    $('#ram').html(getProduct('ProductIsSelected').detail.ram)
    $('#rom').html(getProduct('ProductIsSelected').detail.rom)
    $('#mem').html(getProduct('ProductIsSelected').detail.microUSB)
    $('#pin').html(getProduct('ProductIsSelected').detail.battery)
    //dữ liêu cmt
    $('#btn-cmt').click(function(){
      if($('#cmt').val() !=""){
        const cmt = {
          user_name: getProduct("curent_user").name,
          content: $('#cmt').val(),
          product: getProduct("ProductIsSelected").nameProduct
       }
       list_cmt.push(cmt);
        SaveProductToLocalstorage("list_cmt",list_cmt);
        location.reload()
      }
    })
    var b =  $('#display').val()
    $('#plus').click(function(){
        b++
      $('#display').val(b+"")
    })
    $('#subtract').click(function(){
      if(b>1){
        b--
        $('#display').val(b+"")
      }
      else{
        b = 1;
        $('#display').val(b+"")
      }
    })
    $('#add').click(function(){
      if(getProduct("curent_user")==null){
        $('#modal').hide()
        alert('bạn cần phải đăng nhập để sử dụng tính năng này')
        window.location.href="/FE/account/login_page/login.html"
      } else{
        $('#modal').show()
      }
    })
      $('#phone').append("<img src = '"+getProduct("ProductIsSelected").pathImg+"' class='img-thumbnail'>")
      $('#npro').html(getProduct('ProductIsSelected').nameProduct)
      $('#cpro').html(getProduct('ProductIsSelected').priceProduct)
      $('#rampro').html('RAM: '+getProduct('ProductIsSelected').detail.ram)
      $('#rompro').html('ROM: '+getProduct('ProductIsSelected').detail.rom)

      $('<p class="num"></p>').insertAfter($('#cart'))
      $('.num').html(numofpro+"");  
      $('#add-cart').on("click",function(){
        numofpro+= 1;
        $('.num').html(numofpro);
        const cart = {
          name:getProduct('ProductIsSelected').nameProduct,
          cost:getProduct('ProductIsSelected').priceProduct,
          ram:getProduct('ProductIsSelected').detail.ram,
          rom:getProduct('ProductIsSelected').detail.rom,
          quantity:b,
          imgpath:getProduct('ProductIsSelected').pathImg,
          company: getProduct("ProductIsSelected").company,
          promo: getProduct("ProductIsSelected").promo,
          numrate: getProduct("ProductIsSelected"). numrate,
          detail: getProduct("ProductIsSelected").detail
        }
        list_cart.push(cart)
        SaveProductToLocalstorage("list_cart",list_cart)
        SaveProductToLocalstorage("soluonghangtronggio",numofpro);
      })
      SaveProductToLocalstorage("soluonghangtronggio",numofpro)
  for(var i = 0;i<=getProduct("list_cmt").length;i++){
    var pro = getProduct("list_cmt")[i].product
    if(pro==getProduct("ProductIsSelected").nameProduct){
      var un = getProduct("list_cmt")[i].user_name
      var cnt = getProduct("list_cmt")[i].content
      $('.comments').append('<div class = "name">'+un+'</div><br><div class = "content">'+cnt+'</div>')
    }
  }
})