$(document).ready(function(){
        for(var i= 0;  i<getProduct("inforCus").length;i++){
                var name = getProduct("inforCus")[i].fullname;
                var birthday = getProduct("inforCus")[i].birthday;
                var cccd = getProduct("inforCus")[i].identifine;
                var gt = getProduct("inforCus")[i].gender;
                var addr = getProduct("inforCus")[i].address;
                var sdt = getProduct("inforCus")[i].phone;
                var email = getProduct("inforCus")[i].email;
                var pay = getProduct("inforCus")[i].pay;
                var product = getProduct("inforCus")[i].nameProduct;
                var quanty = getProduct("inforCus")[i].quanty;
                var price = getProduct("inforCus")[i].price;
                var daybuy = getProduct("inforCus")[i].dateBuy;
                var them = "<tr><td>"+(i+1)+"</td><td>"+name+"</td><td>"+birthday+"</td><td>"+cccd+"</td><td>"+gt+"</td><td>"+addr+"</td><td>"+sdt+"</td><td>"+email+"</td><td>"+pay+"</td><td>"+product+"</td><td>"+quanty+"</td><td>"+price+"</td><td>"+daybuy+"</tr></td>";
                $("table tbody").append(them);
        }
        console.log(getProduct("inforCus").length);
})
    