//Homepage,signup,signin button clicks

let loginbtn1 = document.getElementsByClassName('login-btn');
let signupbtn = document.getElementsByClassName('signup-btn');
let homepage=document.getElementsByClassName('home');
let profilebtn=document.getElementsByClassName('profile-btn');

Array.from(loginbtn1).forEach((element)=>{element.addEventListener('click',(event)=>{
  let a=document.createElement('a');
  a.href='../login-page/index-login.html';
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
    let a=document.createElement('a');
    a.href='./index-profile.html';
    a.click();
    console.log('Profile button clicked')});
    })
  