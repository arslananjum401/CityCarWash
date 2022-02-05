var add_product = document.getElementById('add_product');
var add_row_ShowHideID = document.getElementById('add_row_ShowHideID');


add_product.addEventListener('click', () => {
    add_row_ShowHideID.classList.remove('remove');

})
var btn = document.getElementsByClassName("cross_btn")[0];

btn.addEventListener('click', () => {
    add_row_ShowHideID.classList.add('remove');
    add_row_ShowHideID.getElementsByClassName('PnameDaily')[0].value = "";

})

//data fetching start
var Data
const data = async () => {
    const Response = await fetch('http://localhost:8000/Productsdata').then((response) => {
        return response.json()
    });
    Data = Response;
}
//data fetching end

// *********** search box result creation start ***********
const total_Price = (tbody) => {
    var SalesTotalRow = document.getElementsByClassName('SalesTotalRow');
    var total = 0;
    for (let i = 0; i < tbody.children.length - 1; i++) {
        var price_string = tbody.children[i].children[3].innerText
        total += Number(price_string);
    }
    SalesTotalRow[1].innerText = total
}



var Adding_Sold_Item
var PnameDaily = document.getElementsByClassName("PnameDaily")[0];

PnameDaily.addEventListener('input', () => {

    data().then(() => {
        var Adding_Sold_Item_Parent = document.createElement("div")
        Adding_Sold_Item_Parent.setAttribute("class", "Adding_Sold_Item_Parent")

        for (let j = 0; j < Data.length; j++) {
            if (PnameDaily.value == "") {
                var add_row_sold_parent = document.getElementsByClassName("add_row_sold_parent")[0].children[1];
                var x = add_row_sold_parent.children
                for (let i = 0; i < x.length; i++) {
                    x[i].remove();
                }
            }
            else if (Data[j].Productname.toLowerCase().indexOf(PnameDaily.value.toLowerCase()) > -1) {

                var ul = document.createElement('ul')
                ul.setAttribute('class', 'Adding_Sold_Item');
                ul.setAttribute('onclick', 'addToReceiptList(this)');
                var li
                for (let i = 0; i < 3; i++) {
                    li = document.createElement('li');

                    if (i == 0) {
                        li.setAttribute('class', 'FirstSoldLi')
                        li.innerText = Data[j].Productname;
                    }
                    else if (i == 1) {
                        li.setAttribute('class', 'SecondtSoldLi')
                        li.innerText = Data[j].BuyingPrice;
                    }
                    else if (i == 2) {
                        li.setAttribute('class', 'ThirdSoldLi')
                        li.innerText = Data[j].RetailPrice;
                    }
                    ul.appendChild(li);
                }
                //*********Below loop removes the element whose index is matched but is repeating due to creating in above loop
                var list = document.getElementsByClassName('FirstSoldLi');
                for (let i = 0; i < list.length; i++) {
                    var x = list[i].parentElement.parentElement
                    const element = list[i];

                    if (list[i].innerText == Data[j].Productname) {
                        x.remove();
                    }
                }
                //********* end
                // Adding_Sold_Item.appendChild(ul);
                Adding_Sold_Item_Parent.appendChild(ul);
                add_row_ShowHideID.appendChild(Adding_Sold_Item_Parent);

            }
            //********* end



            //*********Below loop is removes the product name which does not match the index value when they are created in above if-else condition
            else if (Data[j].Productname.toLowerCase().indexOf(PnameDaily.value.toLowerCase()) == -1) {

                var x = document.getElementsByClassName("Adding_Sold_Item")
                for (let i = 0; i < x.length; i++) {
                    var z = x[i].getElementsByClassName("FirstSoldLi")[0].innerText;
                    // console.log(PnameDaily.value);
                    if (z == Data[j].Productname) {
                        x[i].remove();
                    }
                }

            }
            //********* end
        }

    })

})
// *********** search box result creation end ***********

function addToReceiptList(product) {
    var tbody = document.getElementsByTagName('tbody')[0];
    var tr = document.createElement("tr");
    for (let i = 0; i < 4; i++) {
        var td = document.createElement('td');
        for (let j = 0; j < tbody.children.length - 1; j++) {
            var productInnerText = tbody.children[j].children[1].innerText
            if (productInnerText == product.children[0].innerText) {
                var productquantity = tbody.children[j].children[0];//Product Quantity in recipt list

                var productPriceInReceipt = tbody.children[j].children[3];//Product Price in receipt list

                var productPrice = product.children[1];//Product Price in Searched list

                var ProductQuantityNumbered = Number(productquantity.innerText);

                var productPriceNumbered = Number(productPrice.innerText);

                ProductQuantityNumbered += 1;

                productquantity.innerText = ProductQuantityNumbered;

                productPriceInReceipt.innerText = (ProductQuantityNumbered * productPriceNumbered);
                total_Price(tbody)
                return
            }

        }

        tr.appendChild(td);
        if (i == 0) {
            td.innerText = 1;
        }
        else if (i > 0) {
            var index = i - 1;
            if (i > 1) {

                index = 1
            }
            td.innerText = product.children[index].innerText;

        }
        if (i == 3 && tbody.children.length == 1) {
            // {{Parent Element}}.insertBefore({{Element to be added}}, {{position of element to be added}});
            tbody.insertBefore(tr, tbody.children[0]);
        }
        else if (i == 3 && tbody.children.length > 1) {

            tbody.insertBefore(tr, tbody.children[tbody.children.length - 1]);
        }
        Data.map((value, index, arr) => {
            if (Data[index].Productname == td.innerText) {
                console.log(Data[index].BuyingPrice + "   " + Data[index].Productname)
            }
        })

        total_Price(tbody)
    }
}