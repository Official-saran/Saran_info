/*=============== EMAIL JS ===============*/

const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

// EmailJS Public Key, Service ID, Template ID
const PUBLIC_KEY = 'Qrdfvv_uhhvGoIk1w'; // Replace with your real EmailJS Public Key
const SERVICE_ID = 'service_p1aridk';    // Replace with your real EmailJS Service ID
const TEMPLATE_ID = 'template_qayril8';  // Replace with your real EmailJS Template ID

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

const sendEmail = (e) => {
  e.preventDefault();

  // Show "Sending..." message
  contactMessage.textContent = 'Sending message... ⏳';
  contactMessage.style.color = 'orange';
  contactMessage.style.display = 'block';

  // Send form using EmailJS
  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm, PUBLIC_KEY)
    .then(() => {
      contactMessage.textContent = 'Message sent successfully ✅';
      contactMessage.style.color = 'green';

      setTimeout(() => {
        contactMessage.textContent = '';
        contactMessage.style.display = 'none';
      }, 5000);

      contactForm.reset();
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      contactMessage.textContent = `Failed to send message ❌`;
      contactMessage.style.color = 'red';

      setTimeout(() => {
        contactMessage.textContent = '';
        contactMessage.style.display = 'none';
      }, 7000);
    });
};

// Attach form listener
if (contactForm) {
  contactForm.addEventListener('submit', sendEmail);
} else {
  console.error('Contact form element not found!');
}





/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll',scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__list a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr=ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay:400,
    reset:true, //animation repeat
})

sr.reveal('.perfil')
sr.reveal('.info',{origin:'left', delay:800})
sr.reveal('.skills',{origin:'left',delay:1000})
sr.reveal('.about',{origin:'right',delay:1200})
sr.reveal('.projects__card, .services__card, .experience__card', {interval:100})

document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".skills__item");

    skills.forEach((skill) => {
        const progress = skill.getAttribute("data-progress");
        const circle = skill.querySelector(".fg");
        const percentageText = skill.querySelector(".percentage");

        // Calculate stroke-dashoffset
        const offset = 283 - (progress / 100) * 283;
        skill.style.setProperty("--progress-offset", offset);

        skill.addEventListener("mouseenter", () => {
            // Reset animation to start from 0
            circle.style.strokeDashoffset = "283";
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 50);
            percentageText.innerText = `${progress}%`;
        });
    });
});


var options = {
    strings: ["","_Data Analyst","_AI Engineer.", "_Python Developer.", "_Web Designer.", "_ML Enthusiast."],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true
};

console.log("Strings:", options.strings); // Log the strings

var typed = new Typed("#typed-text", options);

//wave effect for perfil__name//

document.addEventListener('DOMContentLoaded', function() {
    const perfilName = document.querySelector('.perfil__name');
    let text = perfilName.innerHTML;
    perfilName.innerHTML = ''; // Clear the original text

    let spanText = '';
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '<') { // Handle <br> tags
            perfilName.innerHTML += spanText + text.substring(i, text.indexOf('>', i) + 1);
            i = text.indexOf('>', i); // Move the index past the closing tag
            spanText = ''; // Reset spanText
        } else if (text[i] !== ' ' && text[i] !== '\n') { // Ignore spaces and newlines
            spanText += '<span>' + text[i] + '</span>';
        } else if (text[i] === ' ') {
            perfilName.innerHTML += spanText + ' '; // Add single space
            spanText = ''; // Reset spanText
        }
    }
    perfilName.innerHTML += spanText; // Add any remaining spanText
});




//image- slider 
document.querySelectorAll('.card-image-slider').forEach((slider) => {
  const sliderImages = slider.querySelector('.slider-images');
  const dots = slider.querySelectorAll('.dot');
  const imagesCount = sliderImages.children.length;
  let currentIndex = 0;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let isDragging = false;

  const getPositionX = (event) => {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  };

  const setSliderPosition = () => {
    sliderImages.style.transform = `translateX(${currentTranslate}px)`;
  };

  const updateDots = (index) => {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  };

  const animation = () => {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  };

  const touchStart = (index) => (event) => {
    currentIndex = index;
    startX = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    sliderImages.style.transition = 'none';
  };

  const touchMove = (event) => {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startX;
    currentTranslate = prevTranslate + diff;
  };

  const touchEnd = () => {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;
    const imageWidth = sliderImages.children[0].offsetWidth;

    if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;
    else if (movedBy < -50 && currentIndex < imagesCount - 1) currentIndex += 1;

    currentTranslate = currentIndex * -imageWidth;
    prevTranslate = currentTranslate;

    sliderImages.style.transition = 'transform 0.4s ease';
    setSliderPosition();
    updateDots(currentIndex);
  };

  // Dot click event
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = Number(e.target.dataset.index);
      currentIndex = index;
      const imageWidth = sliderImages.children[0].offsetWidth;
      currentTranslate = currentIndex * -imageWidth;
      prevTranslate = currentTranslate;
      sliderImages.style.transition = 'transform 0.4s ease';
      setSliderPosition();
      updateDots(currentIndex);
    });
  });

  // Touch and mouse event bindings
  sliderImages.addEventListener('touchstart', touchStart(currentIndex));
  sliderImages.addEventListener('touchmove', touchMove);
  sliderImages.addEventListener('touchend', touchEnd);

  sliderImages.addEventListener('mousedown', touchStart(currentIndex));
  sliderImages.addEventListener('mousemove', touchMove);
  sliderImages.addEventListener('mouseup', touchEnd);
  sliderImages.addEventListener('mouseleave', () => {
    if (isDragging) touchEnd();
  });

  sliderImages.querySelectorAll('img').forEach((img) => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });

  // Automatic sliding
  setInterval(() => {
    currentIndex = (currentIndex + 1) % imagesCount;
    const imageWidth = sliderImages.children[0].offsetWidth;
    currentTranslate = currentIndex * -imageWidth;
    prevTranslate = currentTranslate;
    sliderImages.style.transition = 'transform 0.5s ease';
    setSliderPosition();
    updateDots(currentIndex);
  }, 3000); // 4 seconds

  // Init first dot active
  updateDots(currentIndex);
});

