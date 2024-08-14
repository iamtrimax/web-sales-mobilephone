let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
var name="";
var price="";
$(document).ready(function() {
  active_login();
  $('<p class="num"></p>').insertAfter($('#cart'))
  $('.num').html(getProduct('soluonghangtronggio')+"");  
  // xem chi tiết sản phẩm
  $(".image").each(function(i){
    $(this).on("click",function(){
      SaveProductIsSelected(i)
        window.location.href="/FE/chitietsanpham/chitiet.html";
    })
  })
 //sự kiện khi click nút mua
  $('.buy').each(function(i) {
    $(this).click(function(){
      buy(i)
    });
  });
// Xử lý sự kiện khi người dùng nhấn nút tìm kiếm
$('#search_btnHome').on('click',function(){
  $('.title').html('Sản phẩm bạn tìm kiếm')
  // Lấy nội dung nhập liệu từ phần tử nhập liệu  
    $('.phone').empty();
    if( $('#searchHome').val()==""){
      $('.phone').append('<p>Không có sản phẩm nào</p>')
    } // xóa tất cả sản phẩm đã hiển thị trước đó
    else{
      find();
    }
    $('.buy').each(function(i) {
      $(this).click(function(){
        buy2(i)
      });
    }); 
    $(".image").each(function(i){
      $(this).on("click",function(){
        SaveProductIsSelectedWhenFind(i)
          window.location.href="/FE/chitietsanpham/chitiet.html";
      })
    })
  })
});

function getSelectionProduct(){
  data = JSON.parse(localStorage.getItem("productSelection"));
  return data;
}
function active_login(){
  if(JSON.parse(localStorage.getItem("curent_user"))==null || JSON.parse(localStorage.getItem("curent_user")).status==false){
    $('#accmenu').hide();
    $('.history').hide();}
  else{
    if(JSON.parse(localStorage.getItem("curent_user")).status==true){
      $('#accmenu').show()
      $('.history').show();
      $('#login').hide()
    }
  }  
}
function buy(i){
  if(JSON.parse(localStorage.getItem("curent_user"))==null){
    alert("bạn cần phải đăng nhập để mua hàng");
    window.location.href="/FE/account/login_page/login.html"
  }else{
    SaveProductIsSelected(i)    
    window.location.href="/FE/formmuahang/form.html"
  }
}
function buy2(i){
  if(JSON.parse(localStorage.getItem("curent_user"))==null){
    alert("bạn cần phải đăng nhập để mua hàng");
    window.location.href="/FE/account/login_page/login.html"
  }else{
    SaveProductIsSelectedWhenFind(i);
    window.location.href="/FE/formmuahang/form.html"
  }
}
function SaveProductIsSelected(i){
  const productselect = {
    nameProduct: getProduct("list_products")[i].name,
    priceProduct: getProduct("list_products")[i].price,
    company: getProduct("list_products")[i].company,
    promo: getProduct("list_products")[i].promo,
    numrate: getProduct("list_products")[i].rateCount,
    pathImg:getProduct("list_products")[i].img,
    detail: getProduct("list_products")[i].detail
  }
  SaveProductToLocalstorage("ProductIsSelected",productselect);
}
function SaveProductIsSelectedWhenFind(i){
  const productselect = {
    nameProduct: getProduct("list_find")[i].name,
    priceProduct: getProduct("list_find")[i].price,
    company: getProduct("list_find")[i].company,
    promo: getProduct("list_find")[i].promo,
    numrate: getProduct("list_find")[i].rateCount,
    pathImg:getProduct("list_find")[i].img,
    detail: getProduct("list_find")[i].detail
  }
  SaveProductToLocalstorage("ProductIsSelected",productselect);
}
function render(i){
  var product = `
        <div class="card">
            <div class="imgP">
                <img class = "image" src = "`+getProduct("list_products")[i].img+`"> 
            </div>   
            <div class="detail">
                <p>`+ getProduct("list_products")[i].name +`</p><br>
                <p>`+ getProduct("list_products")[i].detail.rom +`</p><br>
                <p>`+ getProduct("list_products")[i].price+`vnđ</p><br>
                <button class ="buy">Mua</button>
            </div>
        </div>
        `
        $('.phone').append(product)
}
function find(){
  var count = 0
  var search_value = $('#searchHome').val()
  var list_find = []
  for(var i = 0;i<getProduct('list_products').length;i++){
      if(getProduct('list_products')[i].name.toUpperCase().includes(search_value.toUpperCase())== true){
         render(i) 
         list_find.push(getProduct('list_products')[i]);
      }
  }
  return count
}