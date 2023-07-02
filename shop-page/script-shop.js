
getproductslist();

async function getproductslist() {
    try{
 let response=await fetch('https://fakestoreapi.com/products');
 let result=await response.json();
 console.log(result)
 addtocardsandui(result);
    }
    catch(error) {
        console.log(error)
    }
}

//Adding cards to UI

function addtocardsandui (dataarr) {
    console.log(dataarr[0].image);
    let sizearr=['S','M','L','XL'];
    for(let i=0;i<dataarr.length;i++)
    {
        let randomint = parseInt(Math.random()*3+0);
    let card=document.createElement('div');
    card.className='card';
    card.innerHTML=`<div class="itemimg-div">
    <img src=${dataarr[i].image} style="width:250px;height:260px"alt="img">
    </div>
    <div class="data-div">
        <div class="name"><h4>${dataarr[i].title}</h4></div>
         <div class="costsize-div">
            <div>$${dataarr[i].price}</div>
            <div>${sizearr[randomint]}</div>
         </div>
         <div class="colors"> 
            Colors: <button class="blue-btn"></button>
            <button class="green-btn" ></button>
            <button class="orange-btn" ></button>
         </div>
         <div class="rating">Rating: ${ratingstring(dataarr[i].rating.rate)} </div>
         <div class="addcartbtn-div">
            <button class="addcart-btn">Add To Cart</button>
            <div style="display:none" class="changeitems-div">Items Added:<button class="minusbtn" style="display:inline;padding:0;">➖</button> <span class="itemcount">1</span> <button class="plusbtn" style="display:inline;padding:0;">➕</button> </div>
         </div>
    </div>`;
    let name1=dataarr[i].category.split(' ')[0];
    document.getElementsByClassName(name1)[0].append(card);
    let addcartbtn=document.getElementsByClassName('addcart-btn')[i];
    addcartbtn.addEventListener('click',(event)=>{addcartfunctionality(event,dataarr)})
    }
}

function ratingstring(rating) {
    let string='';
    for(let i=0;i<rating;i++)
    {
        string=string+'⭐';
    }
    if(rating%parseInt(rating)!==0)
    {
        string=string+'✰';
    }
    return string+' '+rating;
}

//Search Bar Below Buttons fucntionality

let allbtn=document.getElementById('all');
let mensbtn=document.getElementById('mens');
let womensbtn=document.getElementById('womens');
let jewelerybtn=document.getElementById('jewellery');
let electronicsbtn=document.getElementById('electronics');

allbtn.addEventListener('click',btnfucntionality);
mensbtn.addEventListener('click',btnfucntionality);
womensbtn.addEventListener('click',btnfucntionality);
jewelerybtn.addEventListener('click',btnfucntionality);
electronicsbtn.addEventListener('click',btnfucntionality);

//Importing the items category divs

let mensdiv=document.getElementsByClassName("men's")[0];
let womensdiv=document.getElementsByClassName("women's")[0];
let jewelrydiv=document.getElementsByClassName("jewelery")[0];
let electronicsdiv=document.getElementsByClassName("electronics")[0];

function btnfucntionality (event) {
    document.getElementsByClassName('category-selected')[0].classList.remove('category-selected');
event.target.classList.add('category-selected');
if(event.target.id==='all'){mensdiv.style.display="grid";womensdiv.style.display="grid";jewelrydiv.style.display="grid";electronicsdiv.style.display="grid"}
else if(event.target.id==='mens') {mensdiv.style.display="grid";womensdiv.style.display="none";jewelrydiv.style.display="none";electronicsdiv.style.display="none"}
else if(event.target.id==='womens') {mensdiv.style.display="none";womensdiv.style.display="grid";jewelrydiv.style.display="none";electronicsdiv.style.display="none"}
else if(event.target.id==='jewellery') {mensdiv.style.display="none";womensdiv.style.display="none";jewelrydiv.style.display="grid";electronicsdiv.style.display="none"}
else if(event.target.id==='electronics') {mensdiv.style.display="none";womensdiv.style.display="none";jewelrydiv.style.display="none";electronicsdiv.style.display="grid"}
}

//Add to cart button fucntion

function addcartfunctionality(event,dataarr) {
try{
    console.log(dataarr)
    let k;
let addcartbtnlist=document.getElementsByClassName('addcart-btn');
let changeitemsdivlist=document.getElementsByClassName('changeitems-div');
for(let j=0;j<addcartbtnlist.length;j++)
{
    if(event.target==addcartbtnlist[j])
    {
        k=j;
    }
}
console.log(k,addcartbtnlist.length);
let changeitemsdiv=changeitemsdivlist[k];
console.log(changeitemsdiv,event.target)
event.target.style.display="none";
changeitemsdiv.style.display="flex";
let currelem=event.target;
let spanelem=document.getElementsByClassName('itemcount')[k];
spanelem.innerText=1;
let itemcount=parseInt(spanelem.innerText);

let minusbtn=document.getElementsByClassName('minusbtn')[k];
let plusbtn=document.getElementsByClassName('plusbtn')[k];

minusbtn.addEventListener('click',(event)=>{itemcount--;  //minusbutton fucntionality
if(itemcount<0) {return}
if(itemcount==0)
{currelem.style.display="block";
changeitemsdiv.style.display="none";}
spanelem.innerText=itemcount;
})

plusbtn.addEventListener('click',(event)=>{itemcount++;   //plusbutton fucntionality
    if(itemcount==0)
    {currelem.style.display="block";
    changeitemsdiv.style.display="none";}
    spanelem.innerText=itemcount;
    })
} 
catch(error) {
    console.log(error);
}
}


