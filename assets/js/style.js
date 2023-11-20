let changingText=document.querySelector('#change-text')
let typed=new Typed(changingText,{
    strings:['a web developer','an app developer','a machine learning enthusiast'],
    typeSpeed:90,
    backSpeed:50,
    loop:true,
})
let menubar=document.querySelector('.menu-bar');
let mobilenav=document.querySelector('#mobile-navbar')

let i;
let a=0
menubar.addEventListener('click',function(){
    if(i==1)
    {
        mobilenav.style.left='100%';
        i=0;
    }
    else
    {
        mobilenav.style.left=0
        i=1
    }
})

let mobilenavItems=document.querySelectorAll('.mobile-nav-item')
mobilenavItems.forEach((item)=>{
    item.addEventListener('click',()=>{
        mobilenav.style.left='100%'
    })
})