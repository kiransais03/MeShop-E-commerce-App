document.getElementById('submitbtn').addEventListener('click',submitfn);
let commentsdiv= document.getElementsByClassName('comments')[0];

function submitfn(event) {
    event.preventDefault();
    let fname=document.getElementsByName('fname')[0].value;
    let lname=document.getElementsByName('lname')[0].value;
    let email=document.getElementsByName('email')[0].value;
    let password=document.getElementsByName('password')[0].value;
    let confirmpass=document.getElementsByName('confirmpass')[0].value;
    //Validation of data
      let commentsdiv= document.getElementsByClassName('comments')[0];
if(fname && lname && email && password && confirmpass)
 {
      if(password==confirmpass)
   {
      if(!checkuserdetails(email)) 
      {
        if(document.getElementsByClassName('red')[0])
        {
            document.getElementsByClassName('red')[0].remove();
        }
        let div=document.createElement('div');
        div.innerText='Successfully Signed Up!';
        div.classList.add('green');
        div.style.marginBottom='10px';
        
        if(ifusersarrPresentOrNot('users'))
        {
          let usersJson=localStorage.getItem('users');
          let usersarr=JSON.parse(usersJson);
          createuserobj (usersarr,fname,lname,email,password);
        } else {
            let usersarr=[];
            createuserobj (usersarr,fname,lname,email,password);
        }
        
        setTimeout(redirectfunc,2000);
        if(!document.getElementsByClassName('green')[0])
        {
          commentsdiv.append(div);
        }
      } else {
        errormessage("User Account with this email already exists.Please Login");
      }
    } else {
      errormessage("Error: Passwords not matched");
    }
   } else {
      errormessage("Error: All the fields are mandatory");
    }
}

function ifusersarrPresentOrNot (users) {
   return localStorage.getItem(users)!==null;
}

function createuserobj (usersarr,fname,lname,email,password) {  //Creates a new user object and stores in local storage
          let newuserid=usersarr.length+1;
          let dataobj={id:newuserid,fname:fname,lname:lname,email:email,password:password};
          usersarr.push(dataobj);
          let stringarr=JSON.stringify(usersarr);
          localStorage.setItem('users',`${stringarr}`);
}

function checkuserdetails(emailid) {  //Check if the user already registered
  try {
    let usersJson1=localStorage.getItem('users');
      let usersarr1=JSON.parse(usersJson1);
      let bool=0;
      for(let i=0;i<usersarr1.length;i++)
      {
       if (usersarr1[i].email === emailid)
       {
         currentuserobj=usersarr1[i];
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


function errormessage(msg) {  //Error Messages Function
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


function redirectfunc(event) {  //Page redirect function
    let a=document.createElement('a');
    a.href="../login-page/index-login.html"
    a.click();
}

if(localStorage.getItem('accesstoken')) {
    redirectfunc();
}

//Homepage,signup,signin button clicks

let loginbtn = document.getElementsByClassName('login-btn');
let signupbtn = document.getElementsByClassName('signup-btn');
let homepage=document.getElementsByClassName('home');
let mycartbtn=document.getElementsByClassName('cart-btn');
let profilebtn=document.getElementsByClassName('profile-btn');

Array.from(loginbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
  let a=document.createElement('a');
  a.href='../login-page/index-login.html';
  a.click();
    console.log('login button clicked')});
})


Array.from(signupbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
  let a=document.createElement('a');
  a.href='./index-signup.html';
  a.click();
    console.log('signup button clicked')});
})

Array.from(homepage).forEach((element)=>{element.addEventListener('click',(event)=>{
  let a=document.createElement('a');
  a.href='../index.html';
  a.click();
  console.log('homepage button clicked')});
  })

  Array.from(profilebtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    alert('Please Login!')
    let a=document.createElement('a');
    a.href='../profile-page/index-profile.html';
    a.click();
    console.log('Profile button clicked')});
    })



    Array.from(mycartbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
     alert('Please Login!')
   });
   })
  
  