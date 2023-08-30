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

const slideshowData = [
    {
      title: "Super Spicy Karaage Rice",
      description: "Take a look at what's new. And do not deprive yourself of a good meal, enjoy and be happy.",
      image: "assets/img/recently-add.png"
    },
    {
      title: "Delicious Set Lunch",
      description: "Indulge in our delightful set lunch, carefully crafted with a variety of flavors to satisfy your palate.",
      image: "assets/img/Set-Lunch.png"
    },
    {
        title: "Tempting Snack Time",
        description: "Elevate your snack time with our exquisite snacks, perfect for a quick and delicious pick-me-up.",
        image: "assets/img/Snack-Time.png"
      },
    // Add more slide data objects as needed
  ];
  
  let currentSlideIndex = 0;
  
  function changeSlide() {
    const recentlyTitle = document.getElementById("recentlyTitle");
    const recentlyDescription = document.getElementById("recentlyDescription");
    const recentlyDataImg = document.querySelector(".recently__img");
  
    recentlyTitle.textContent = slideshowData[currentSlideIndex].title;
    recentlyDescription.textContent = slideshowData[currentSlideIndex].description;
    recentlyDataImg.src = slideshowData[currentSlideIndex].image;
  
    currentSlideIndex = (currentSlideIndex + 1) % slideshowData.length;
  }
  
  // Change slide every 5 seconds (5000 milliseconds)
  setInterval(changeSlide, 5000);
  




  
  
