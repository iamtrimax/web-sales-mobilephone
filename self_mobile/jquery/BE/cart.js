var selected
$(document).ready(function(){
    for(var i =0;i<getProduct('list_cart').length;i++){
        var phone = getProduct('list_cart')[i].name
        var path = getProduct('list_cart')[i].imgpath
        var ramp = getProduct('list_cart')[i].ram
        var romp = getProduct('list_cart')[i].rom
        var cost = getProduct('list_cart')[i].cost
        var quanty = getProduct('list_cart')[i].quantity
        var object=`<div class="row mt-5  border-secondary border-bottom">
        <div class="col-md-1">
            <input type="radio" name="select" id="" value =`+i+` >
        </div>
        <div class="col-md-3">
            <div class="row">
                <img class="anh img-thumbnail mr-3" width="120px" src="`+path+`" alt="">
                <div class="col mt-3">
                    <p>`+phone+`</p>
                    <p>`+ramp+`</p>
                    <p>`+romp+`</p>
                </div>
            </div>
        </div>
        <div class="col-md-3 mt-5">
        <p>`+cost+`</p>
        </div>
        <div class="col-md-3 mt-5">
        <p>`+quanty+`</p>
        </div>
        <div class="col-md-2 mt-5">
        <p>`+parseInt(cost.replace(/\./g, ""))*parseInt(quanty)+`</p>
        </div>
    </div>`
    $('.card').append(object)
    }
    $(".anh").each(function(i){
        $(this).on("click",function(){
            const productselect = {
                nameProduct: getProduct("list_cart")[i].name,
                priceProduct: getProduct("list_cart")[i].cost,
                company: getProduct("list_cart")[i].company,
                promo: getProduct("list_cart")[i].promo,
                numrate: getProduct("list_cart")[i]. numrate,
                pathImg:getProduct("list_cart")[i].imgpath,
                detail: getProduct("list_cart")[i].detail
              }
              SaveProductToLocalstorage("ProductIsSelected",productselect);
            window.location.href="/FE/chitietsanpham/chitiet.html";
        })
    })

    $('input[name=select]').change(function(){
        selected = $(this).val()
    })
    $('#buy').click(function(){
        const cart_buy={
            nameProduct:getProduct("list_cart")[selected].name,
            priceProduct:getProduct("list_cart")[selected].cost,
            quanty: getProduct('list_cart')[selected].quantity
        }
        SaveProductToLocalstorage("ProductIsSelected",cart_buy);
        SaveProductToLocalstorage("pos_buy",selected)
        window.location.href="/FE/formmuahang/form.html"
    })
})