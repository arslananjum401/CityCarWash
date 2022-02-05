
//***************** editing the product Start *****************
var UpdatePnameSentBackend;
{    //changing data
    function edit_row(edit) {

        var tr = edit.parentElement.parentElement.parentElement;
        // var td_input_form = document.createElement('form');
        // td_input_form.setAttribute('action', 'submit');
        // td_input_form.setAttribute('method', 'post');
        // tr.appendChild(td_input_form);
        var NewTds = tr.querySelectorAll("td");
        UpdatePnameSentBackend = NewTds[1].innerText;

        //input update
        for (let i = 0; i < NewTds.length - 1; i++) {


            var td_to_input = document.createElement("input");
            var input_num_value = NewTds[i].innerText.replace(" RS", "");
            if (i == 1) {
                td_to_input.setAttribute("type", "text");
                td_to_input.value = NewTds[i].innerText;
            } else {
                td_to_input.setAttribute("type", "number");
                td_to_input.setAttribute("min", "0");
                td_to_input.value = input_num_value;
            }

            NewTds[i].innerText = "";
            NewTds[i].appendChild(td_to_input);
            td_to_input.classList.add('td_to_input');
        }

        HideElement(edit);
        var tick = edit.nextElementSibling
        ShowElement(tick);
        tick.classList.add('tickBtn');

    }
}
//***************** editing the product End *****************

// ***************** saving data Start ****************
var UpdatedDataSentBackend = {

};
function tick_row(tick) {


    var input_to_td;
    var tr = tick.parentElement.parentElement.parentElement;
    var NewTds = tr.querySelectorAll("td");
    for (let i = 0; i < NewTds.length; i++) {
        if (i < NewTds.length - 1) {//to be saved from last td element because it contains only img element and no text giving errors
            input_to_td = NewTds[i].querySelectorAll("input")[0].value; //input tag values inside td tag
            console.log(input_to_td)
            if (i == 0) {

                NewTds[i].innerText = input_to_td;
                UpdatedDataSentBackend.PQuantity = NewTds[i].innerText;
            }
            else if (i == 1) {
                NewTds[i].innerText = input_to_td
                UpdatedDataSentBackend.Pname = NewTds[i].innerText;
                var SRUpdatedPname=UpdatedDataSentBackend.Pname.replace('/', '_');
                UpdatedDataSentBackend.Pname=SRUpdatedPname;
               
            } else if (i > 0) {
                if (i == 2) {
                    UpdatedDataSentBackend.BPrice = input_to_td;
                }
                else if (i == 3) {
                    UpdatedDataSentBackend.RPrice = input_to_td;
                }

                if (input_to_td == "") {
                    input_to_td = "0"
                }
                NewTds[i].innerText = input_to_td + " RS";
            }
        }

    }
    console.log(UpdatedDataSentBackend);

    console.log(UpdatedDataSentBackend);
    var SlashRemovedPname=UpdatePnameSentBackend.replace('/', '_');
    console.log(SlashRemovedPname);
    fetch(`/ProductList/${SlashRemovedPname}`, {
        method: 'put',
        body: JSON.stringify({ UpdatedDataSentBackend }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
    tick.classList.add("remove");
    var edit = tick.previousElementSibling;
    edit.classList.remove("remove");
}
// ***************** saving data End ****************