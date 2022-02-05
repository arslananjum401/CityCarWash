// ***************** deleting the product Start *****************
var selectedRow;
const delete_row_backend = async (name) => {
    selectedRow = name.parentElement.parentElement.parentElement;
    var delete_element_text = selectedRow.children[1].innerText;
    console.log(delete_element_text);
    selectedRow.remove();
    fetch(`/ProductList/${delete_element_text}`, {
        method: "delete",
    }).then((response) => {
        response.json()
    }).then((response) => {
        console.log(response);
    }).catch(err => console.log(err));
}
var cross_btn = document.getElementsByClassName("cross_btn")[1];

var del=document.getElementsByClassName('del');
var remove_product = document.getElementsByClassName("remove-product")[0];
var yes = document.getElementsByClassName("Yes")[0];

var no = document.getElementsByClassName("No")[0];
cross_btn.addEventListener("click", () => {
   
    remove_product.classList.add("remove")
})

function deleteelement(name) {
    remove_product.classList.remove ("remove");
    // yes.click()
    yes.addEventListener("click", () =>{
        delete_row_backend(name)
        remove_product.classList.add ("remove");
    })
   
    no.addEventListener("click", () =>{
        remove_product.classList.add ("remove");
    })
}





// ***************** deleting the product End *****************