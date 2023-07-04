
let loginbtn = document.getElementById('submit-btn');
let commentsdiv= document.getElementsByClassName('comments')[0];
let currentuserobj;

//Login button clicked
loginbtn.addEventListener('click',loginfunction);


function loginfunction(event) {
    event.preventDefault();
    let email=document.getElementsByName('email')[0].value;
    let password=document.getElementsByName('password')[0].value;

    //Validations if else
    if(email.trim() && password.trim()) { //inputs check
      if(checkuserdetails(email)) {  //signup check
        if(password===JSON.parse(currentuserobj).password){  //password check
           localStorage.setItem('curruser',currentuserobj);
            if(document.getElementsByClassName('red')[0])
            {
            document.getElementsByClassName('red')[0].remove();
            }
        let div=document.createElement('div');
        div.innerText='Login Successfull';
        div.classList.add('green');
        div.style.marginBottom='10px';
       
        let str="abcjgef";
        let randomnum=(Math.random()*126+33);
        let token=str+String.fromCharCode(randomnum);
        localStorage.setItem('accesstoken',token);
        if(!document.getElementsByClassName('green')[0])
        {
            commentsdiv.append(div);
            setTimeout(() => {
                if(document.getElementsByClassName('green')[0]) 
                document.getElementsByClassName('green')[0].remove();},5000);
        }

        setTimeout(redirectfunc,1000);
    } 
      else {  //password check fail
        errormessage("Error: Password doesn't match.Try Again");
        }
    }
      else { //signup check fail
        errormessage("Error: Your Email Id doesn't exist.Please Sign Up!");
      }
    }
    else { //input values check fail
       errormessage("Error: All the fields are mandatory");
    }

}



function ifusersarrPresentOrNot (users) {
  return localStorage.getItem(users)!==null;
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
        currentuserobj=JSON.stringify(usersarr1[i]);
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



 function redirectfunc(event) {   //Redirect function
    let a=document.createElement('a');
    a.href="../shop-page/index-shop.html"
    a.click();
}

if(localStorage.getItem('accesstoken')) {    //If already signed in redirect function
    redirectfunc();
}


//Homepage,signup,signin button clicks

let loginbtn1 = document.getElementsByClassName('login-btn');
let signupbtn = document.getElementsByClassName('signup-btn');
let homepage=document.getElementsByClassName('home');
let profilebtn=document.getElementsByClassName('profile-btn');

Array.from(loginbtn1).forEach((element)=>{element.addEventListener('click',(event)=>{
  let a=document.createElement('a');
  a.href='./index-login.html';
  a.click();
  console.log('login button clicked');
});
})


Array.from(signupbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
  let a=document.createElement('a');
  a.href='../signup-page/index-signup.html';
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
    });

    let mycartbtn=document.getElementsByClassName('cart-btn');

    Array.from(mycartbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
     alert('Please Login!')
   });
   })