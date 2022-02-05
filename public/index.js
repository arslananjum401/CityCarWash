var a = document.getElementsByClassName("btn");
let add_product = document.getElementById("add_product");
let crossBtn = document.getElementsByClassName("cross_btn");
let rjs = document.getElementById("rjs");
let new_product = document.getElementById("new_product");
crossBtn[0].style.transform = "rotate(150deg)"

//hide and show fields
let fields = document.getElementsByClassName("fields");//add product
let remove_product = document.getElementsByClassName("remove-product")[0];//delete options
{

    function HideElement(div) {
        div.classList.add("remove");
    }
    function ShowElement(div) {
        div.classList.remove("remove");
    }

    //delete options
    crossBtn[0].addEventListener("click", () => {
        HideElement(remove_product)
    })

    //add new product
    function hideNewElementfield(zz) {
        HideElement(zz)
        for (let i = 0; i < fields.length; i++) {
            fields[i].value = "";
        }
    }
    crossBtn[1].addEventListener("click", () => {
        hideNewElementfield(new_product)
    })
    add_product.addEventListener("click", () => {
        ShowElement(new_product)
    })
}



// adding new product
{
    var add_btn = document.getElementById("add_btn");
    var tbody = document.querySelector("tbody");

    add_btn.addEventListener("click", () => {
        let img = document.createElement("td");
        img.innerHTML = '<td><img onclick="tick_row(this)" class="crud tick remove" src="images/tick.svg"><img class="crud edit" src="images/edit.svg"><img onclick="remove_row(this)" class="crud del" src="images/delete-button.svg"></td>'
        console.log("done")
        let tr = document.createElement("tr");

        for (let i = 0; i < fields.length; i++) {
            let td = document.createElement("td");
            if (i > 0) {
                td.innerText = fields[i].value + " RS";
            }
            else {
                td.innerText = fields[i].value;
            }
            tr.appendChild(td);
        }

        tr.appendChild(img);
        img.classList.add('editCon');
        tbody.appendChild(tr);
        hideNewElementfield(new_product);
    })
}

// editing the product
function rotate(div) {
    div.style.transform = "rotate(180deg)";
}
var td_r_by_input, tick;

//changing data
function edit_row(edit) {

    var tr = edit.parentElement.parentElement;
    var td_s = tr.querySelectorAll("td");

    //input update
    for (let i = 0; i < td_s.length; i++) {
        if (td_s[i].innerText != "") {

            td_r_by_input = document.createElement("input");
            var td_replaced = td_s[i].innerText.replace('RS', '');
            if (i == 0) {
                td_r_by_input.setAttribute('type', 'text');
            } else {
                td_r_by_input.setAttribute('type', 'number');
                td_r_by_input.setAttribute('min', '0');

            }
            td_r_by_input.classList.add("td_input");

            td_r_by_input.value = td_s[i].innerText;
            if (i > 0) {
                if (td_replaced == "") {
                    td_replaced = "0"
                    console.log(td_replaced)
                }
                td_r_by_input.value = Number(td_replaced)
            }
            td_s[i].innerText = "";
            // td_r_by_input.autofocus;
            td_s[i].appendChild(td_r_by_input);
        }
    }
    edit.classList.add("remove")
    tick = edit.nextElementSibling;
    tick.classList.remove("remove")
    td_r_by_input.autofocus;
}
// saving data
function tick_row(tick) {
    var tr = tick.parentElement.parentElement;
    var td_s = tr.querySelectorAll("td");
    for (let i = 0; i < td_s.length; i++) {
        if (i < td_s.length - 1) {//to be saved from last td element because it contains only img element and no text giving errors
            console.log(td_s[i])
            var input_to_td = td_s[i].querySelectorAll("input")[0].value;

            if (i == 0) {
                td_s[i].innerText = input_to_td
            } else if (i > 0) {
                if (input_to_td == "") {
                    input_to_td = "0"
                }
                td_s[i].innerText = input_to_td + " RS";
            }
        }

    }
    tick.classList.add("remove");
    var cross = tick.previousElementSibling;
    // console.log(cross)
    cross.classList.remove("remove");
}


// deleting the product
{
    var selectedRow;
    var yes = document.getElementsByClassName("Yes")[0];
    var no = document.getElementsByClassName("No")[0];
    function remove_row(td) {
        ShowElement(remove_product)

        yes.addEventListener("click", () => {
            selectedRow = td.parentElement.parentElement;
            selectedRow.remove();
            console.log("clicked")
            console.log("done")
            HideElement(remove_product)
        })
        no.addEventListener("click", () => {
            HideElement(remove_product)
        })

    }
}
var new_product_form = document.getElementById("new_product_form");
new_product_form.addEventListener("submit", (e) => {
    e.preventDefault()
})







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