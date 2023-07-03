let result;
getproductslist();

async function getproductslist() {
    try{
 let response=await fetch('https://fakestoreapi.com/products');
 result=await response.json();
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
        try{
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
    // console.log(name1)
    document.getElementsByClassName(name1)[0].append(card);
    let addcartbtn=card.querySelectorAll('button')[3];
    // console.log(addcartbtn)
    
    addcartbtn.addEventListener('click',(event)=>{addcartfunctionality(event,card,i)});
    // console.log(i);
    }catch(error) {console.log(error);}
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

function addcartfunctionality(event,currentcard,i) {
try{
    console.log(event.target);
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
let changeitemsdiv=changeitemsdivlist[k];

event.target.style.display="none";
changeitemsdiv.style.display="flex";
let currelem=event.target;
let spanelem=document.getElementsByClassName('itemcount')[k];
spanelem.innerText=1;
let itemcount=parseInt(spanelem.innerText);

cartitemstolocalstorage (currentcard,i);

let minusbtn=document.getElementsByClassName('minusbtn')[k];
let plusbtn=document.getElementsByClassName('plusbtn')[k];

minusbtn.addEventListener('click',(event)=>{itemcount--;  //minusbutton fucntionality
if(itemcount<0) {return}
if(itemcount==0)
{currelem.style.display="block";
changeitemsdiv.style.display="none";}
spanelem.innerText=itemcount;
cartitemstolocalstorage (currentcard,i);
})

plusbtn.addEventListener('click',(event)=>{itemcount++;   //plusbutton fucntionality
    if(itemcount==0)
    {currelem.style.display="block";
    changeitemsdiv.style.display="none";}
    spanelem.innerText=itemcount;
    cartitemstolocalstorage (currentcard,i);
    })
} 
catch(error) {
    console.log(error);
}
}

//Adding items to local storage for cart items list

function cartitemstolocalstorage (currentcard,i) {
    if(localStorage.getItem('cartelems'))
   {   
    let updated=0;
    let cartelemsarr=JSON.parse(localStorage.getItem('cartelems'));
    
    for(let index=0;index<cartelemsarr.length;index++)
    {
        if(JSON.parse(cartelemsarr[index]).id===(i+1))
        {  let id2=i+1;
           let obj2={'id':id2,
            'elem':JSON.stringify(currentcard.innerHTML),}
            cartelemsarr[index]=JSON.stringify(obj2)
            updated=1;
            console.log('elem',currentcard.innerHTML)
        }
    }
    if(updated===0){
        let id1=i+1;
         let obj1={'id':id1,
              'elem':JSON.stringify(currentcard.innerHTML)};
    cartelemsarr.push(JSON.stringify(obj1));
    console.log('upd',currentcard.innerHTML)
    console.log(currentcard);
    }
    localStorage.setItem('cartelems',JSON.stringify(cartelemsarr));
  }
else {
    let elemsarr=[];
    // let strcard=JSON.stringify(currentcard);
    let id=i+1;
    let obj={'id':id,
              'elem':JSON.stringify(currentcard.innerHTML)};
    elemsarr.push(JSON.stringify(obj));
    let elemsarrstr=JSON.stringify(elemsarr);
    console.log(elemsarrstr,currentcard)
    localStorage.setItem('cartelems',elemsarrstr);
}
}

// Search functionality

let searchinput=document.getElementById('searchip');
console.log(searchinput)
searchinput.addEventListener('keyup',searchfunction);

function searchfunction(event) {
    try{
        console.log("entered")
    let searchtext=event.target.value.toLowerCase();
    if(searchtext.trim()==='')
    {
        console.log('exit');
        document.getElementsByClassName('items-container')[0].style.display='block';
        document.getElementsByClassName('searchcontainer')[0].style.display='none';
        return;
    }
    console.log(searchtext)
    let searchedarr=result.filter((currelement)=>{
        return currelement.title.toLowerCase().includes(searchtext);
    });
    document.getElementsByClassName('searchcontainer')[0].innerHTML=''
    searchaddcardstoui(searchedarr);
} catch(error) {
    console.log(error);
}

}


    function searchaddcardstoui(searchedarr) {
        // console.log(searchedarr[0].image);
        let sizearr=['S','M','L','XL'];
        for(let i=0;i<searchedarr.length;i++)
        {
            try{
            let randomint = parseInt(Math.random()*3+0);
        let card=document.createElement('div');
        card.className='card';
        card.innerHTML=`<div class="itemimg-div">
        <img src=${searchedarr[i].image} style="width:250px;height:260px"alt="img">
        </div>
        <div class="data-div">
            <div class="name"><h4>${searchedarr[i].title}</h4></div>
             <div class="costsize-div">
                <div>$${searchedarr[i].price}</div>
                <div>${sizearr[randomint]}</div>
             </div>
             <div class="colors"> 
                Colors: <button class="blue-btn"></button>
                <button class="green-btn" ></button>
                <button class="orange-btn" ></button>
             </div>
             <div class="rating">Rating: ${ratingstring(searchedarr[i].rating.rate)} </div>
             <div class="addcartbtn-div">
                <button class="addcart-btn">Add To Cart</button>
                <div style="display:none" class="changeitems-div">Items Added:<button class="minusbtn" style="display:inline;padding:0;">➖</button> <span class="itemcount">1</span> <button class="plusbtn" style="display:inline;padding:0;">➕</button> </div>
             </div>
        </div>`;
        let name1=searchedarr[i].category.split(' ')[0];
        // console.log(name1);
        document.getElementsByClassName('items-container')[0].style.display='none';
        let searchcontainer=document.getElementsByClassName('searchcontainer')[0];
        searchcontainer.style.display='grid';
        searchcontainer.append(card);
        let addcartbtn=card.querySelectorAll('button')[3];
        // console.log(addcartbtn)
        
        addcartbtn.addEventListener('click',(event)=>{addcartfunctionality(event,card,i)});
        // console.log(i);
        }catch(error) {console.log(error);}
        }
    }
