function ShowAlert() {
    let basket = JSON.parse(localStorage.getItem('products'));

    if (basket.length === 0) {
        document.querySelector('.empty-cart').classList.remove('d-none')
        document.querySelector('.table').classList.add('d-none')
        document.getElementById('Top').classList.add('d-none')
        document.querySelector('.button-empty').classList.remove('d-none')
        document.querySelector('.button-del').classList.add('d-none')



    }
    else {
        document.querySelector('.empty-cart').classList.add('d-none')
        document.querySelector('.table').classList.remove('d-none')
        document.getElementById('Top').classList.remove('d-none')
        document.querySelector('.button-empty').classList.add('d-none')
    }
}
ShowAlert();

function GetList() {
    let basket = JSON.parse(localStorage.getItem('products'));
    let total = document.getElementById('Top')
    let sum = 0;
    let row = '';

    basket.forEach(pr => {
        let int_price = pr.Price.slice(-(pr.Price.length), -4);
        sum += +int_price;
        row += `
        <tr>
        <th scope="row">${pr.Id}</th>
        <td class="img-td">
            <img src=${pr.Image} alt="">
        </td>
        <td>${pr.Name.length > 10 ? pr.Name.slice(0, 20) + "..." : pr.Name}</td>
        <td>
            <input class="counts" type="number" min='1' max='15' onchange='GetPrice()' value=${pr.Count}>
        </td>
        <td>
         <span  class="text-danger fw-bold sum">${int_price * pr.Count} AZN</span>
        </td>
    </tr>
        `
        GetPrice();

    })
    total.innerHTML = `Toplam : ${sum} AZN`
    document.getElementById('tbdy').innerHTML = row;
}
GetList();


function GetPrice() {
    let basket = JSON.parse(localStorage.getItem('products'));
    let sum = document.querySelectorAll('.sum');
    let count = document.querySelectorAll('.counts');
    let total = document.getElementById('Top')
    let total_sum = 0;
    let x = 0;
    let t = 0;
    for (const i of count) {
        if (x < basket.length) {
            int_price = basket[x].Price.slice(-(basket[x].Price.length), -4)
            basket[x].Count = i.value;
            int_price = int_price * i.value;
            total_sum += +int_price;
            if (t < sum.length) {
                sum[t].innerHTML = int_price + " AZN"
            }
            t++


        }
        x++
    }
    total.innerHTML = `Toplam : ${total_sum} AZN`

}
function lsdel(value) {

    var ls_data = JSON.parse(localStorage.getItem('products'));
    var index = ls_data.findIndex(({ id }) => id == value);

    if (index == -1) {

    } else {

        ls_data.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(ls_data));
        document.querySelector('.alert-msg2').classList.remove('d-none')
        setTimeout(() => {
            location.reload()

        }, 2000);
    }
    lsdel();


}



