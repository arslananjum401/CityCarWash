var a=   document.getElementById("date");
     

var date = new Date();
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var Month;
for (var i = 0; i < month.length; i++) {
    if (date.getMonth() == i) {
        Month = month[i]
    }
}

var date_now = date.getDate() + " " + Month + "/" + date.getFullYear();
console.log(date_now)
date_now
a.innerText="Dated : " + date_now;
a.style.textDecoration="underline";