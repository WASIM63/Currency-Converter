let input1 = document.querySelector(".input1");
let input2 = document.querySelector(".input2");
let msg = document.querySelector(".msg");
let country_code1 = document.querySelector("#country_code1");
let country_code2 = document.querySelector("#country_code2");
let fromCountryName = document.querySelector(".fromCountryName");
let toCountryName = document.querySelector(".toCountryName");
let flag1 = document.querySelector(".flag1");
let flag2 = document.querySelector(".flag2");
let arrow = document.querySelector(".arrow");
let container1 = document.querySelector(".container1");
let container2 = document.querySelector(".container2");
let inputarea1, inputarea2;
var ans = 0;


// 🟠🟠🟠 currency converter api
async function currency(from, to, amount) {
    const url = `https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${from}&to=${to}&amount=${amount}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'adc1b42245msh4906e98d089216ep193730jsn2aff5af9b11c',
            'x-rapidapi-host': 'currency-converter18.p.rapidapi.com'
        }
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    ans = result.result.convertedAmount;
    msg.innerText = `${amount} ${from} = ${ans} ${to}`
    fromCountryName.innerText = countryName[country_code1.value];
    toCountryName.innerText = countryName[country_code2.value];
}


// 🟠🟠🟠 dropdown menu
let dropdown = document.querySelectorAll(".dropdown");
let option;
for (let i of dropdown) {
    for (let code in countryList) {
        option = document.createElement("option");
        i.append(option);
        option.innerText = countryList[code];
        option.value = code;
    }
}

// 🟠🟠🟠 Exchange btn
function ExchangeBtn() {
    let fromselect = container1.querySelector(".dropdown");
    let toselect = container2.querySelector(".dropdown");
    let frominput = container1.querySelector("input");
    let output = container2.querySelector("input");
    let tt = currency(countryList[fromselect.value], countryList[toselect.value], frominput.value);
    tt.then(() => {
        output.value = ans;
    })
    flags();
}
let btn = document.querySelector("#btn");
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    ExchangeBtn();
})

// 🟠🟠🟠 onchange
container1.querySelector(".dropdown").addEventListener("change",()=>{
    ExchangeBtn();
})
container2.querySelector(".dropdown").addEventListener("change",()=>{
    ExchangeBtn();
})
let timeoutId;
container1.querySelector("input").addEventListener("input",()=>{
    clearTimeout(timeoutId);
    timeoutId=setTimeout(()=>{
        ExchangeBtn();
    },800);
})
container2.querySelector("input").addEventListener("input",()=>{
    clearTimeout(timeoutId);
    timeoutId=setTimeout(()=>{
        ExchangeBtn();
    },800);
})


// 🟠🟠🟠 flag image
function flags() {
    flag1.src = flagImg[country_code1.value];
    flag2.src = flagImg[country_code2.value];
}
flags();

// 🟠🟠🟠 arrow btn
function arrowbtn() {
    inputarea1 = container1.querySelector(".inputarea");
    inputarea2 = container2.querySelector(".inputarea");
    let p1 = container1.querySelector(".para");
    let p2 = container2.querySelector(".para");

    container1.appendChild(inputarea2);
    container1.appendChild(p2);
    container2.appendChild(inputarea1);
    container2.appendChild(p1);
}
arrow.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log("clicked");
    arrowbtn();
})



