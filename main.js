/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header')
                        : header.classList.remove('bg-header')
}
window.addEventListener('scroll',scrollHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll',scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if(selectedTheme){
    document.body.classList[selectedTheme === ' dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () =>{
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme',getCurrentTheme())
    localStorage.setItem('selected-icon',getCurrentIcon())
})
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 200,
})

sr.reveal('.home__img, .newsletter__container, .footer__logo,.footer__description, .footer__content, footer__info')
sr.reveal('.home__data',{origin: 'bottom'})
sr.reveal('.about__data, .recently__data',{origin: 'left'})
sr.reveal('.about__img, .recently__img',{origin: 'right'})
sr.reveal('.popular__card',{interval: 100})

document.getElementById("show-subscribe").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior (navigation)
    // Add your custom code here (e.g., show a popup, perform an action, etc.)
});
document.querySelector("#show-subscribe").addEventListener("click",function(){
    document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup").classList.remove("active");
});

document.querySelector(".popup .form button").addEventListener("click", function() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var genderInputMale = document.getElementById("male");
    var genderInputFemale = document.getElementById("female");
    var gender = "";
    var dob = document.getElementById("dob").value;

    if (genderInputMale.checked) {
        gender = "Male";
    } else if (genderInputFemale.checked) {
        gender = "Female";
    }
    
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phonePattern = /^(01\d{8,10})$/;
    
    if (!name || !email || !phone || !gender || !dob) {
        alert("Please fill in all fields before subscribing.");
        return;
    } else if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    } else if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
    } else {
        var url = "http://localhost:8000/subscribe"; // Replace with your server's URL
        
        var formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        formData.append("dob", dob);
        
        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Subscription successful. Have a nice day!");
            } else {
                alert("An error occurred: " + data.message);
            }
        })
        .catch(error => {
            console.error(error);
            alert("An error occurred. Please try again later.");
        });
    }
});


// document.querySelector(".popup .form button").addEventListener("click", function() {
//     var name = document.getElementById("name").value;
//     var email = document.getElementById("email").value;
//     var phone = document.getElementById("phone").value;
//     var gender = document.querySelector("input[name='gender']:checked").value;
    
//     var url = "https://script.google.com/macros/s/AKfycbwLf0YjfWFFCjxhraSYoRA96BHOqWZ51wT-79SK68j8c_Vma16flLqexviCzEpuI9HA/exec"; // Replace with your Apps Script URL
    
//     var formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("phone", phone);
//     formData.append("gender", gender);
    
//     fetch(url, {
//       method: "POST",
//       body: formData
//     }).then(response => {
//       // Handle response here
//     }).catch(error => {
//       // Handle error here
//     });
//   });


  
  
