let cartitemslist=document.getElementsByClassName('cartitems-list')[0];

let cartelemsarr=JSON.parse(localStorage.getItem('cartelems'));

if(cartelemsarr.length!==0) {
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

if(cartelemsarr.length!==0) {setTimeout(ordersummary,1000);}

function ordersummary() {
let itemnamelist=document.getElementsByClassName('name');
let itempricelist=document.getElementsByClassName('itemcost');
let itemcountlist=document.getElementsByClassName('itemcount');
let pricelistdiv=document.getElementsByClassName('price-list')[0];


// let cardslist=Document.getElementsByClassName('card');
let grandtotal=0;
for(let i=0;i<cartelemsarr.length;i++)
{
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
                            <div>$${grandtotal}</div>
                            </div>`
    pricelistdiv.append(totaldiv);

  let chekoutbtn=document.createElement('button');
  chekoutbtn.innerText='Proceed To Checkout';
  chekoutbtn.classList.add('checkout-btn');
  pricelistdiv.append(chekoutbtn);

  chekoutbtn.addEventListener('click',btnclickeffect);

}

function btnclickeffect(event) {
    event.target.classList.add('proceedbtn');
    setTimeout(()=>{event.target.classList.remove('proceedbtn')},500);
}


