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
                ul.setAttribute('class', 'Adding_Sold_Item')
                ul.setAttribute('onclick', 'addToReceiptList(this)')
                var li
                for (let i = 0; i < 2; i++) {
                    li = document.createElement('li');

                    if (i == 0) {
                        li.setAttribute('class', 'FirstSoldLi')
                        li.innerText = Data[j].Productname;
                        li.style.width = "65%";
                    }

                    else if (i == 1) {
                        li.setAttribute('class', 'SecondtSoldLi')
                        li.innerText = Data[j].RetailPrice;
                        li.style.width = "25%";
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


const total_Price = (product) => {
    var SalesTotalRow = document.getElementsByClassName('SalesTotalRow');
    var total = 0;
    for (let i = 0; i < product.children.length - 1; i++) {
        var price_string = product.children[i].children[3].innerText
        total += Number(price_string);
    }
    SalesTotalRow[1].innerText = total
}
let SalesData = {
    User: {

        products:
            []

    },
};
let IsNewReceipt = true;
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
function addToReceiptList(product) {


    var tbody = document.getElementsByTagName('tbody')[0];

    var tr = document.createElement("tr");

    /********** Sales data start **********/
    /********** Sales data start **********/
    /********** Sales data start **********/
    if (SalesData.User.id == undefined) {

        SalesData.User.id = uuidv4();

    }

    if (SalesData.User.products.find(value => value.Name == product.children[0].innerText) == undefined) {
        console.log(SalesData.User.products);
        console.log(product.children[0].innerText);
        if (IsNewReceipt) {
            IsNewReceipt = false;
        }

        let Sname, Rprice, Bprice;
        for (let index = 0; index < Data.length; index++) {
            if (product.children[0].innerText == Data[index].Productname) {
                Sname = Data[index].Productname;
                Rprice = Data[index].RetailPrice;
                Bprice = Data[index].BuyingPrice;
            }
        }

        SalesData.User.products.push({
            quantity: 1,
            Name: Sname,
            RetailPrice: Rprice,
            BuyingPrice: Bprice,
        });

    }
    else if (SalesData.User.products.find(value => value.Name == product.children[0].innerText) != undefined) {
        // console.log(SalesData)
        for (let index = 0; index < SalesData.User.products.length; index++) {
            if (SalesData.User.products[index].Name == product.children[0].innerText) {

                SalesData.User.products[index].quantity++;
                console.log(SalesData.User.products[index].quantity);
                break;

            }
        }
    }
    /********** Sales data End **********/
    /********** Sales data End **********/
    /********** Sales data End **********/

    for (let i = 0; i < 4; i++) {
        var td = document.createElement('td');
        for (let j = 0; j < tbody.children.length - 1; j++) {
            var productInnerText = tbody.children[j].children[1].innerText;

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
                // console.log(Data[index].BuyingPrice + "   " + Data[index].Productname)
            }
        })

        total_Price(tbody);
    }
}
let Make_Receipt = document.getElementById('Make_Receipt');
const sendDailySales = async (url) => {
    url = '/makeReceipt';
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(SalesData) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

Make_Receipt.addEventListener('click', sendDailySales);
// search box result creation end