var Data
const data = async () => {
    const response = await fetch('http://localhost:8000/Productsdata').then((response) => {
        return response
    });
    Data = await response.json();
    // console.log(Data);
    return await Data;
}

var tbody = document.querySelector('tbody');
const createDataTable = async () => {

    for (let i = 0; i < Data.length; i++) {
        var tr = document.createElement('tr');
        for (let i = 0; i < 4; i++) {
            var td = document.createElement('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        var trChild = tr.querySelectorAll('td');

        if (Data[i].Quantity==undefined) {
            Data[i].Quantity=0;
        }
        trChild[0].innerText = Data[i].Quantity;
        let slashedName=Data[i].Productname.replace('_','/');

        trChild[1].innerText = slashedName;
        trChild[2].innerText = Data[i].BuyingPrice + ' RS';
        trChild[3].innerText = Data[i].RetailPrice + ' RS';
        let ImgTd = document.createElement('td')
        ImgTd.innerHTML =
            '<td>' +
            '<div>' +
            '<img onclick="edit_row(this)" class="crud edit" src="images/edit.svg">' +
            '<button href="#" type="submit"  onclick="tick_row(this)" class="tickBtn remove">' +
            '<img  class="crud tick " src="images/tick.svg">' +
            '</button>' +
            '<img onclick="deleteelement(this)" class="crud del" src="images/delete-button.svg">' +
            '</div>' +
            '</td>';
        tr.appendChild(ImgTd);
        ImgTd.classList.add('editLastTabelColoumn');
        tr.appendChild(ImgTd);
        if (Data[i].Quantity==0) {
            tr.style.backgroundColor='##cc2121ab';
        }
    }

}
data().then((response) => {
    createDataTable()
})
