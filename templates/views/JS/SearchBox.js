var Search_box_input = document.getElementById("Search_box_input");
var tbody = document.querySelectorAll("tbody")[0];

Search_box_input.addEventListener('keyup', () => {
    var Search_box_input_value = Search_box_input.value.toLowerCase();
    var tr = tbody.querySelectorAll("tr")
    for (let i = 0; i < tr.length; i++) {
        var td = tr[i].querySelectorAll("td")[1].innerText;
        if (td.toLowerCase().indexOf(Search_box_input_value) > -1) {
            tr[i].style.display = ""
        }
        else if(Search_box_input_value=="") {
            tr[i].style.display = ""
        }
        else {
            tr[i].style.display = "none";
        }
    }
})