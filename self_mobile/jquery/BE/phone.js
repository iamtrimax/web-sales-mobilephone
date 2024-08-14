function addlistsp(num,classadd,classimg,classbtn){
    for(var i =0;i<num;i++){
        var product = `
        <div class="col-md-3 mt-5">
            <img class = "`+classimg+`" src = "`+getProduct("list_products")[i].img+`" width = "230px"> 
            <div class = "detail">
                <div class="row">
                    <p class = "">`+ getProduct("list_products")[i].name +`</p><br>
                </div>
                <div class="row">
                    <p class = "">`+ getProduct("list_products")[i].detail.rom +`</p><br>
                </div>
                <div class="row">
                    <p class = "">`+ getProduct("list_products")[i].price +`</p><br>
                </div>  
            </div>
                <button class="`+classbtn+` btn btn-outline-secondary">Mua</button>
        </div>`
        $(classadd).append(product)
    }
}
$(document).ready(function() {
    active_login();
    $('<p class="num"></p>').insertAfter($('#cart'))
    $('.num').html(getProduct('soluonghangtronggio')+"");  
    // xem chi tiết sản phẩm
  
   //sự kiện khi click nút mua

  });
  function eventbtn(classbtn){
    $(classbtn).each(function(i) {
      $(this).on("click",function(){
        if(JSON.parse(localStorage.getItem("curent_user"))==null){
            alert("bạn cần phải đăng nhập để mua hàng");
            window.location.href="/FE/account/login_page/login.html"
          }else{
            SaveProductIsSelected(i);
            window.location.href="/FE/formmuahang/form.html"
          }
      });
    });
   }
  function eventImg(classimg){
    $(classimg).each(function(i){
        $(this).on("click",function(){
          SaveProductIsSelected(i)
            window.location.href="/FE/chitietsanpham/chitiet.html";
        })
      })
}

