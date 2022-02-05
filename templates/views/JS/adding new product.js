let fields = document.getElementsByClassName("fields");//add product
let form_add_btn = document.getElementById("form_add_btn");
var add_row_ShowHideID = document.getElementById("add_row_ShowHideID");
var tbody = document.querySelector("tbody");
var add_btn = document.getElementById("add_btn");
function AddProduct() {
    let imgtd = document.createElement("td");
    imgtd.innerHTML =
        '<td>' +
        '<div>' +
        '<img onclick="edit_row(this)" class="crud edit" src="images/edit.svg">' +
        '<button href="#" type="submit"  onclick="tick_row(this)"  class="tickBtn remove"' +
        '<img  class="crud tick " src="images/tick.svg">' +
        '</button>' +
        '<img onclick="deleteelement(this)" class="crud del" src="images/delete-button.svg">' +
        '</div>' +
        '</td>';
    let tr = document.createElement("tr");

    for (let i = 0; i < fields.length; i++) {
        let td = document.createElement("td");

        if (i > 1) {
            td.innerText = fields[i].value + " RS";
            if (fields[i].value == "") {
                td.innerText = 0 + " RS"
            }
        }
        else {
            td.innerText = fields[i].value;
        }
        tr.appendChild(td);
    }
    tr.appendChild(imgtd);
    imgtd.classList.add('editLastTabelColoumn');
    tbody.appendChild(tr);
    HideElement(add_row_ShowHideID)
};
form_add_btn.addEventListener('click', AddProduct)

let add_product = document.getElementById("add_product")

add_product.addEventListener("click", () => {
    for (let i = 0; i < fields.length; i++) {
        fields[i].value = "";
    }
    add_row_ShowHideID.classList.remove("remove");// this would show the new product form
})
