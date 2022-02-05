
//***************** hide and show fields Elements *****************
let crossBtn = document.getElementsByClassName("cross_btn");
let removeNew_product = document.getElementsByClassName("remove-product")[0];//delete options

var add_row_ShowHideID=document.getElementById("add_row_ShowHideID");
function HideElement(element) {
    element.classList.add("remove");
}
function ShowElement(element) {
    element.classList.remove("remove");
}

//Hide options
crossBtn[0].addEventListener("click", () => {
    HideElement(removeNew_product)
})


//Show new product options

crossBtn[0].addEventListener("click", () => {
    HideElement(add_row_ShowHideID)
})

//***************** hide and show fields Elements *****************














// let edit = Array.prototype.slice.call(document.getElementsByClassName("edit"));
// // get index of clicked element
// for (let i = 0; i < edit.length; i++) {
//     (function (index) {
//         edit[i].addEventListener("click", myScript);
//         function myScript() {
//             return index
//         }
//         var a = myScript()
//     })(i);
// }