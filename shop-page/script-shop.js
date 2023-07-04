let result;
getproductslist();

async function getproductslist() {
    try{
 let response=await fetch('https://fakestoreapi.com/products');
 let apiresultarr=await response.json();
  result=addcolourandsizetoresult(apiresultarr);
console.log(apiresultarr,result)
 addtocardsandui(result);
    }
    catch(error) {
        console.log(error)
    }
}

function addcolourandsizetoresult (apiresultarr) {
   let colorsarr=['Blue','White','Black','Blue','White','White','White','Red','Black','Red','Blue','Blue','Green','Black','Blue','Black','Blue','White','Red','Blue'];
   let sizesarr=['S','M','XL','M','M','L','S','L','S','S','M','S','L','XL','L','M','L','M','XL','S'];
   console.log(colorsarr.length,sizesarr.length);
   let index=0;
   let apiresultarrmod=JSON.parse(JSON.stringify(apiresultarr));  //deep copy first stringfied the array and passing the string object not  reference to it and finally parsing the array 
   apiresultarrmod.forEach((element)=>{
     element.color=colorsarr[index];
     element.size=sizesarr[index];
     index++;
   })
   return apiresultarrmod;
}

//Adding cards to UI

function addtocardsandui (dataarr) {
    console.log(dataarr[0].image);
    for(let i=0;i<dataarr.length;i++)
    {
       try{
    let card=document.createElement('div');
    card.className='card';
    card.innerHTML=`<div class="itemimg-div">
    <img src=${dataarr[i].image} style="width:250px;height:260px"alt="img">
    </div>
    <div class="data-div">
        <div class="name"><h4>${dataarr[i].title}</h4></div>
         <div class="costsize-div">
            <div>$${dataarr[i].price}</div>
            <div>${dataarr[i].size}</div>
         </div>
         <div class="colors"> 
            Colors: <button class="blue-btn"></button>
            <button class="green-btn" ></button>
            <button class="orange-btn" ></button> - ${dataarr[i].color}
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
    document.getElementsByClassName('items-container')[0].style.display='block';
    document.getElementsByClassName('searchcontainer')[0].style.display='none';
    document.getElementsByClassName('category-selected')[0].classList.remove('category-selected');
event.target.classList.add('category-selected');
if(event.target.id==='all'){mensdiv.style.display="flex";womensdiv.style.display="flex";jewelrydiv.style.display="flex";electronicsdiv.style.display="flex"}
else if(event.target.id==='mens') {mensdiv.style.display="flex";womensdiv.style.display="none";jewelrydiv.style.display="none";electronicsdiv.style.display="none"}
else if(event.target.id==='womens') {mensdiv.style.display="none";womensdiv.style.display="flex";jewelrydiv.style.display="none";electronicsdiv.style.display="none"}
else if(event.target.id==='jewellery') {mensdiv.style.display="none";womensdiv.style.display="none";jewelrydiv.style.display="flex";electronicsdiv.style.display="none"}
else if(event.target.id==='electronics') {mensdiv.style.display="none";womensdiv.style.display="none";jewelrydiv.style.display="none";electronicsdiv.style.display="flex"}
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
    console.log(searchtext);
    console.log(result)
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
        try {
        // console.log(searchedarr[0].image);
        for(let i=0;i<searchedarr.length;i++)
        {
            try{
        let card=document.createElement('div');
        card.className='card';
        card.innerHTML=`<div class="itemimg-div">
        <img src=${searchedarr[i].image} style="width:250px;height:260px"alt="img">
        </div>
        <div class="data-div">
            <div class="name"><h4>${searchedarr[i].title}</h4></div>
             <div class="costsize-div">
                <div>$${searchedarr[i].price}</div>
                <div>${searchedarr[i].size}</div>
             </div>
             <div class="colors"> 
                Colors: <button class="blue-btn"></button>
                <button class="green-btn" ></button>
                <button class="orange-btn" ></button> - ${searchedarr[i].color}
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
    }catch(error) {console.log(error)}
    }


//Page redirects after clicking the buttons 

let loginbtn = document.getElementsByClassName('login-btn');
let signupbtn = document.getElementsByClassName('signup-btn');
let homepage=document.getElementsByClassName('home');
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
a.href='./index-shop.html';
a.click();
console.log('homepage button clicked')});
})

Array.from(profilebtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    let a=document.createElement('a');
    a.href='../profile-page/index-profile.html';
    a.click();
    console.log('Profile button clicked')});
    })
  
if(!localStorage.getItem('accesstoken')) {
  redirectfunc();
}

function redirectfunc(event) {   //Redirect function
    let a=document.createElement('a');
    a.href="../login-page/index-login.html"
    a.click();
}


//color chekboxes importing
let redto=document.getElementById('red');
let blueto =document.getElementById('blue');
let greento=document.getElementById('green');
let blackto=document.getElementById('black');
let whiteto=document.getElementById('white');

//size chekboxes importing
let sto=document.getElementById('s');
let mto =document.getElementById('m');
let lto=document.getElementById('l');
let xlto=document.getElementById('xl');

//Filter Buttons fucntionality
let ratinginput=document.getElementById('ratingip');

//price range chekboxes importing
let zeroto=document.getElementById('zero');
let twentyfiveto =document.getElementById('twentyfive');
let fiftyto=document.getElementById('fifty');
let hundredto=document.getElementById('hundred');

let filterbutton=document.getElementById('filterbtn');

filterbutton.addEventListener('click',filterfunction1);

function filterfunction1(event) {
    try {
  let filteredarr=result.filter((element)=>{
        let ratingval=ratinginput.value;
            if(ratingelemboolean(ratingval,element) && elempricecheckingboolean(zeroto,twentyfiveto,fiftyto,hundredto,element)
            && elemcolorcheckingboolean (redto,blueto,greento,blackto,whiteto,element) && elemsizecheckingboolean (sto,mto,lto,xlto,element) )
        {
            // console.log("ans",element);
            return true;
        } else {
            // console.log('false',element)
            return false;
        }
    });
    console.log(filteredarr);
    if(filteredarr.length===0)
    {
        alert('No Item matches with the filters');
        console.log('exit');
        document.getElementsByClassName('items-container')[0].style.display='block';
        document.getElementsByClassName('searchcontainer')[0].style.display='none';
        return;
    }
document.getElementsByClassName('searchcontainer')[0].innerHTML=''
document.getElementsByClassName('category-selected')[0].classList.remove('category-selected');
allbtn.classList.add('category-selected');
searchaddcardstoui(filteredarr);
console.log("reached121")
    }catch(error) {console.log(error)}
}



//Colors check of the element 
function elemcolorcheckingboolean (redto,blueto,greento,blackto,whiteto,currelement) {
    try {
    let redtoval=redto.checked;
    let bluetoval=blueto.checked;
    let greentoval=greento.checked;
    let blacktoval=blackto.checked;
    let whitetoval=whiteto.checked;
    let validation='pending'
    if(redtoval){ if(currelement.color==='Red') {validation=true}  else{console.log('red');return false;} }
    if(bluetoval){ if(currelement.color==='Blue') {validation=true} else{return false;} }
    if(greentoval){ if(currelement.color==='Green') {validation=true} else{return false;} }
    if(blacktoval){ if(currelement.color==='Black') {validation=true} else{return false;} }
    if(whitetoval){ if(currelement.color==='White') {validation=true} else{return false;} }

    if(validation='pending')
    {
      return true;
    }

    if(validation===true)
    {
        return true;
    }
}catch(error) {console.log(error)}
  }

//Size check of the element
function elemsizecheckingboolean (sto,mto,lto,xlto,currelement) {
    try {
    let stoval=sto.checked;
    let mtoval=mto.checked;
    let ltoval=lto.checked;
    let xltoval=xlto.checked;
    let validation='pending'
    if(stoval){ if(currelement.size==='S') {validation=true}  else{return false;} }
    if(mtoval){ if(currelement.size==='M') {validation=true} else{return false;} }
    if(ltoval){ if(currelement.size==='L') {validation=true} else{return false;} }
    if(xltoval){ if(currelement.size==='XL') {validation=true} else{return false;} }

    if(validation='pending')
    {
      return true;
    }

    if(validation===true)
    {
        return true;
    }
}catch(error) {console.log(error)}
  }


//Price check of the element in range or not
function elempricecheckingboolean (zeroto,twentyfiveto,fiftyto,hundredto,currelement) {
    try {
  let zerotoval=zeroto.checked;
  let twentyfivetoval=twentyfiveto.checked;
  let fiftytoval=fiftyto.checked;
  let hundredtoval=hundredto.checked;
  let validation='pending'
  if(zerotoval){ if(currelement.price>=0 && currelement.price<=25) {validation=true} else{return false;} }
  if(twentyfivetoval){ if(currelement.price>=25 && currelement.price<=50) {validation=true} else{return false;} }
  if(fiftytoval){ if(currelement.price>=50 && currelement.price<=100) {validation=true} else{return false;} }
  if(hundredtoval){ if(currelement.price>=100) {validation=true} else{return false;} }

  if(validation='pending')
  {
    return true;
  }

  if(validation===true)
    {
        return true;
    }
}catch(error) {console.log(error)}
}


//Rating check for the element in range or not
function ratingelemboolean (ratingval,currelement){
    try {
   let ratingnum=parseInt(ratingval);
   if(currelement.rating.rate<=ratingnum)
   {
    // console.log('truerating',ratingnum,currelement.rating.rate)
    return true;
   }
   else {
    // console.log('falserating',ratingnum,currelement.rating.rate)
    return false;
   }
}catch(error) {console.log(error)}
}

// console.log(hundredto.value)

// let inter=setInterval(()=>{console.log(typeof ratinginput.value)},3000);

// // clearInterval(inter)


