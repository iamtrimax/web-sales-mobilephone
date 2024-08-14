 function addsp(classadd,classbtn,classimg,i){
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
function addspTitle(title,classbtn,classimg,classadd){
    var list = []
    for(var i = 0;i<getProduct("list_products").length;i++){
        if(getProduct('list_products')[i].promo.name==title){
           // SaveProductToLocalstorage("list_new")
            addsp(classadd,classbtn,classimg,i);
            list.push(getProduct('list_products')[i])
        }
        SaveProductToLocalstorage(title,list);
    };
}
$(document).ready(function(){
    addspTitle("mới ra mắt","buy","image",".phoneNew")
    eventImgtitle("mới ra mắt",".image")
    eventbtntitle("mới ra mắt",".buy")
    addspTitle("giá rẻ online","buy2","img2",".phonecheapOnline")
    eventImgtitle("giá rẻ online",".img2")
    eventbtntitle("giá rẻ online",".buy2")
    addspTitle("giảm giá","buy3","img3",".phonecheap")
    eventImgtitle("giảm giá",".img3")
    eventbtntitle("giảm giá",".buy3")
    addspTitle("trả góp","buy4","img4",".phonepay")
    eventImgtitle("trả góp",".img4")
    eventbtntitle("trả góp",".buy4")
    $('#searchbtn').click(function(){
        
    })
})
function eventImgtitle(title,classimg){
    $(classimg).each(function(i){
        $(this).on("click",function(){
            SaveProductIsSelectedtiltle(title,i)
            window.location.href="/FE/chitietsanpham/chitiet.html";
        })
      })
}
function eventbtntitle(title,classbtn){
  $(classbtn).each(function(i) {
    $(this).on("click",function(){
      if(JSON.parse(localStorage.getItem("curent_user"))==null){
          alert("bạn cần phải đăng nhập để mua hàng");
          window.location.href="/FE/account/login_page/login.html"
        }else{
            SaveProductIsSelectedtiltle(title,i)
          window.location.href="/FE/formmuahang/form.html"
        }
    });
  });
 }
function SaveProductIsSelectedtiltle(title,i){
    const productselect = {
        nameProduct: getProduct(title)[i].name,
        priceProduct: getProduct(title)[i].price,
        company: getProduct(title)[i].company,
        promo: getProduct(title)[i].promo,
        numrate: getProduct(title)[i].rateCount,
        pathImg:getProduct(title)[i].img,
        detail: getProduct(title)[i].detail
      }
      SaveProductToLocalstorage("ProductIsSelected",productselect);
}