//Homepage,signup,signin button clicks

let loginbtn1 = document.getElementsByClassName('login-btn');
let signupbtn = document.getElementsByClassName('signup-btn');
let homepage=document.getElementsByClassName('home');
let mycartbtn=document.getElementsByClassName('cart-btn');
let profilebtn=document.getElementsByClassName('profile-btn');

Array.from(loginbtn1).forEach((element)=>{element.addEventListener('click',(event)=>{
  if(localStorage.getItem('accesstoken')) {   //If already signedin-alert
    alert('You have already logged in.Please Logout from Profile page to Login from another account!')
} else {
  let a=document.createElement('a');
  a.href='../login-page/index-login.html';
  a.click();
  console.log('login button clicked');
}

});
})


Array.from(signupbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
  if(localStorage.getItem('accesstoken')) {   //If already signedin-alert
    alert('You have already logged in.Please Logout from Profile page to create another account!')
} else {
  let a=document.createElement('a');
  a.href='../signup-page/index-signup.html';
  a.click();
    console.log('signup button clicked');
}
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
    a.href='./index-profile.html';
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

  

    function redirectfunc(event) {   //Redirect function
      let a=document.createElement('a');
      a.href="../login-page/index-login.html"
      a.click();
  }
  
  if(!localStorage.getItem('accesstoken')) {   //If not signed in redirect function  
    redirectfunc();
  }

  let commentsdiv1= document.getElementsByClassName('comments1')[0];
   let commentsdiv2= document.getElementsByClassName('comments2')[0];

  //importing current user details

let loggedinuserobj=JSON.parse(localStorage.getItem('curruser'));

let fname=loggedinuserobj.fname;
let lname=loggedinuserobj.lname;
let email=loggedinuserobj.email;
let password=loggedinuserobj.password;

//importing input elements
let fnameinput=document.getElementById('fname');
let lnameinput=document.getElementById('lname');
let emailinput=document.getElementById('email');
let oldpasswordinput=document.getElementById('oldpassword');
let newpasswordinput=document.getElementById('newpassword');
let confirmnewpasswordinput=document.getElementById('confirmnewpassword');

let ipvaluesobj=   //creating an object for all the input values and updating them using keydownfucntion 
{fnameip:fnameinput.value,
lnameip:lnameinput.value,
emailip:emailinput.value,
oldpasswordip:oldpasswordinput.value,
newpasswordip:newpasswordinput.value,
confirmnewpasswordip:confirmnewpasswordinput.value};

function keydownfunc(event) {   //keydown obj values updation function
  let variable=event.target.id+"ip";
  ipvaluesobj[variable]=event.target.value;
}


let saveinfo=document.getElementsByClassName('savename-btn')[0];

saveinfo.addEventListener('click',saveinfofunc);

function saveinfofunc(event) {  //First name and Last name updation 
  event.preventDefault();
  if(ipvaluesobj.fnameip.trim() && ipvaluesobj.lnameip.trim()) 
  {
   if(ipvaluesobj.fnameip.trim()!==fname || ipvaluesobj.lnameip.trim()!==lname)
   {


    loggedinuserobj.fname=ipvaluesobj.fnameip.trim();
    loggedinuserobj.lname=ipvaluesobj.lnameip.trim();

   localStorage.setItem('curruser',JSON.stringify(loggedinuserobj));
   updateuserpasswordnames(email);

   setTimeout(()=>{location.reload(true);},2000)
   
    
    if(document.getElementsByClassName('red')[0])
    {
    document.getElementsByClassName('red')[0].remove();
    }
    let div=document.createElement('div');
    div.innerText='Name Changed Successfully';
    div.classList.add('green');
    div.style.marginBottom='10px';
    if(!document.getElementsByClassName('green')[0])
        {
            commentsdiv1.append(div);
            setTimeout(() => {
                if(document.getElementsByClassName('green')[0]) 
                document.getElementsByClassName('green')[0].remove();},5000);
        }
   }
   else {
    errormessage("Error: Please Enter New Name",commentsdiv1);
   }
  }
  else {
    errormessage("Error: All the fields are mandatory",commentsdiv1);
  }
}

emailinput.value=email;  //assigning email to input field
fnameinput.placeholder="(First Name) - "+fname;
lnameinput.placeholder="(Last Name) - "+lname;


function errormessage(msg,commentsdiv) {  //Error Messages Function
  let div2=document.createElement('div');
  div2.innerText=msg;
  div2.classList.add('red');
  div2.style.marginBottom='10px';
  if(!document.getElementsByClassName('red')[0])
   {
     commentsdiv.append(div2);
     setTimeout(() => {
     if(document.getElementsByClassName('red')[0]) 
     document.getElementsByClassName('red')[0].remove();},5000);
   }
 
  }



  let savepass=document.getElementsByClassName('savepass-btn')[0];

savepass.addEventListener('click',savepassfunc);

function savepassfunc(event) {  //First name and Last name updation 
  event.preventDefault();
  if(ipvaluesobj.oldpasswordip && ipvaluesobj.newpasswordip && ipvaluesobj.confirmnewpasswordip) 
  {
    if(ipvaluesobj.newpasswordip===ipvaluesobj.confirmnewpasswordip)
    {
   if(ipvaluesobj.oldpasswordip===password)
   {

    loggedinuserobj.password=ipvaluesobj.newpasswordip;

   localStorage.setItem('curruser',JSON.stringify(loggedinuserobj));  //updates password in currobject

   updateuserpasswordnames(email)  //updates password in users object

   setTimeout(()=>{location.reload(true);},2000)
   
    
    if(document.getElementsByClassName('red')[0])
    {
    document.getElementsByClassName('red')[0].remove();
    }
    let div=document.createElement('div');
    div.innerText='Password Changed Successfully';
    div.classList.add('green');
    div.style.marginBottom='10px';
    if(!document.getElementsByClassName('green')[0])
        {
            commentsdiv2.append(div);
            setTimeout(() => {
                if(document.getElementsByClassName('green')[0]) 
                document.getElementsByClassName('green')[0].remove();},5000);
        }
   }
   else {
    errormessage("Error: Please Enter Correct Password",commentsdiv2);
   }
  } else {
    errormessage("Error: Both New Password & Confirm Password should be same",commentsdiv2);
  }
  }
  else {
    errormessage("Error: All the fields are mandatory",commentsdiv2);
  }
}


//seraching the user password and updating in the users localStorage

function updateuserpasswordnames(emailid) {  //Update Names & Password
  try {
    let usersJson1=localStorage.getItem('users');
      let usersarr1=JSON.parse(usersJson1);
      let bool=0;
      for(let i=0;i<usersarr1.length;i++)
      {
        if (usersarr1[i].email === emailid)
        {
        //  let object1=usersarr1[i];
        //  console.log(object1)
        //  object1.password=pass;
         usersarr1[i]=loggedinuserobj;
          let stringarr=JSON.stringify(usersarr1);
          localStorage.setItem('users',`${stringarr}`);
         bool=1;
       
       }
      }
      if(bool===1) {
       return true;
      } else {
      return false; }
 }
 catch(error) {
   console.log(error)
   return false;}
 }

 let logoutbtn=document.getElementsByClassName('logout-btn')[0];

 logoutbtn.addEventListener('click',()=>{
     localStorage.removeItem('accesstoken');
     localStorage.removeItem('curruser');
     let a=document.createElement('a');
     a.href="../index.html"
     a.click();
 })