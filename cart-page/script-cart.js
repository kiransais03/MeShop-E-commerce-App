let cartitemslist=document.getElementsByClassName('cartitems-list')[0];

let cartelemsarr=JSON.parse(localStorage.getItem('cartelems'));

if(cartelemsarr) {
for(let i=0;i<cartelemsarr.length;i++)
{
    let currentobj=JSON.parse(cartelemsarr[i]);
    let div=document.createElement('div');
    div.classList.add('card')
    div.innerHTML=JSON.parse(currentobj.elem);
    cartitemslist.append(div);
}
}


//Page redirects after clicking the buttons 

let loginbtn = document.getElementsByClassName('login-btn');
let signupbtn = document.getElementsByClassName('signup-btn');
let homepage=document.getElementsByClassName('home');
let mycartbtn=document.getElementsByClassName('cart-btn');
let profilebtn=document.getElementsByClassName('profile-btn');
console.log(homepage)

Array.from(loginbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    if(localStorage.getItem('accesstoken')) {   //If already signedin-alert
        alert('You have already logged in.Please Logout from Profile page to Login from another account!')
    } else {
    let a=document.createElement('a');
    a.href='../login-page/index-login.html';
    a.click();
    console.log('login button clicked');}
});
})


Array.from(signupbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    if(localStorage.getItem('accesstoken')) {   //If already login-alert
        alert('You have already logged in.Please Logout from Profile page to create another account!')
    } else {
    let a=document.createElement('a');
    a.href='../signup-page/index-signup.html';
    a.click();
    console.log('signup button clicked');}
});
})

Array.from(homepage).forEach((element)=>{element.addEventListener('click',(event)=>{
let a=document.createElement('a');
a.href='../index.html';
a.click();
console.log('homepage button clicked')});
})

Array.from(profilebtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    let a=document.createElement('a');
    a.href='../profile-page/index-profile.html';
    a.click();
    console.log('Profile button clicked')});
    })

Array.from(mycartbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
            let a=document.createElement('a');
            a.href='../cart-page/index-cart.html';
            a.click();
            console.log('cart button clicked');
        });
    })


  
if(!localStorage.getItem('accesstoken')) {
  redirectfunc();
}

function redirectfunc(event) {   //Redirect function
    let a=document.createElement('a');
    a.href="../login-page/index-login.html"
    a.click();
}
let grandtotal=0;

if(cartelemsarr) {setTimeout(ordersummary,1000);}

function ordersummary() {
let itemnamelist=document.getElementsByClassName('name');
let itempricelist=document.getElementsByClassName('itemcost');
let itemcountlist=document.getElementsByClassName('itemcount');
let pricelistdiv=document.getElementsByClassName('price-list')[0];


// let cardslist=Document.getElementsByClassName('card');

for(let i=0;i<cartelemsarr.length;i++)
{
  console.log(itempricelist[i]);
    let priceint=parseFloat(itempricelist[i].innerText.substring(1));
   let itemsummarydiv=document.createElement('div');
   let costofitems=priceint*parseInt(itemcountlist[i].innerText);
   grandtotal=grandtotal+costofitems;
   itemsummarydiv.classList.add('itemsummary');
   itemsummarydiv.innerHTML=`<div class="left-item">
                            <div>${i+1}. ${itemnamelist[i].innerText}</div>
                            <div>Each Price:${itempricelist[i].innerText}</div>
                            </div>
                            <div class="middle-item">
                              <div>-</div>
                              <div>-</div>
                            </div>
                            <div class="right-item">
                            <div>Qty:${itemcountlist[i].innerText}</div>
                            <div>Cost:$${costofitems}</div>
                            </div>`
   pricelistdiv.append(itemsummarydiv);
}
let totaldiv=document.createElement('div');
totaldiv.classList.add('totalprice');

totaldiv.innerHTML=`<div class="left-item">
                            <div>Grand Total </div>
                            </div>
                            <div class="middle-item">
                              <div>-</div>
                            </div>
                            <div class="right-item">
                            <div>$${grandtotal.toFixed(2)}</div>
                            </div>`
    pricelistdiv.append(totaldiv);

  let chekoutbtn=document.createElement('button');
  chekoutbtn.innerText='Proceed To Checkout';
  chekoutbtn.className='checkout-btn btn btn-primary';
  pricelistdiv.append(chekoutbtn);

  chekoutbtn.addEventListener('click',btnclickeffect);

}

function btnclickeffect(event) {
    try {
    // event.target.classList.add('proceedbtn');
    let inrPayment=parseInt(grandtotal*82.16);
    // console.log('fsfadsfasdadf')
    // setTimeout(()=>{event.target.classList.remove('proceedbtn')},500);
    event.preventDefault();
    var options = {
      key: "rzp_test_xV39ZNbgU1Du4V", // Enter the Key ID generated from the Dashboard
      amount: inrPayment * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "MeShop. Checkout",
      description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      theme: {
        color: "#122620",
      },
      image: "https://cdn-icons-png.flaticon.com/128/891/891419.png",
      handler: function () {
        localStorage.removeItem("cartelems");
        alert('Payment Successfull.Order has been placed,please forget your money!!!')
        location.href = "./index-cart.html";
      },
      options: {
        checkout: {
          method: {
            netbanking: 0,
            card: 0,
            upi: 1,
            wallet: 0,
          },
        },
      },
    };
  
    // console.log('fsadf')
    var rzpy1 = new Razorpay(options);
    rzpy1.open();

}catch (error) {console.log(error)}
}


// let payBtn = document.querySelector("#payBtn");
// payBtn.addEventListener("click", (event) => {

// });