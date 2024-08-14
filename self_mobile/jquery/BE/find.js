$(document).ready(function(){
    var isComplete = false
    function find(){
        var search_value = $('#search').val()
        for(var i = 0;i<getProduct('list_products').length;i++){
            if(getProduct('list_products')[i].name.toUpperCase().includes(search_value.toUpperCase())== true){
               render(i)
            }
        }
    }

    $('#search_btn').click(function(){   
        $('.title').html('Sản phẩm bạn đang tìm kiếm')
        $('.phone').empty(); // xóa tất cả sản phẩm đã hiển thị trước đó
        find();
    })
})