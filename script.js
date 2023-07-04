if(localStorage.getItem('accesstoken')) {
    redirectfunc();
}

function redirectfunc(event) {   //Redirect function
let a=document.createElement('a');
a.href="./shop-page/index-shop.html"
a.click();
}


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
    a.href='./login-page/index-login.html';
    a.click();
    console.log('login button clicked');}
});
})


Array.from(signupbtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    if(localStorage.getItem('accesstoken')) {   //If already login-alert
        alert('You have already logged in.Please Logout from Profile page to create another account!')
    } else {
    let a=document.createElement('a');
    a.href='./signup-page/index-signup.html';
    a.click();
    console.log('signup button clicked');}
});
})

Array.from(homepage).forEach((element)=>{element.addEventListener('click',(event)=>{
let a=document.createElement('a');
a.href='./index.html';
a.click();
console.log('homepage button clicked')});
})

Array.from(profilebtn).forEach((element)=>{element.addEventListener('click',(event)=>{
    let a=document.createElement('a');
    a.href='./profile-page/index-profile.html';
    a.click();
    console.log('Profile button clicked')});
    })
  
