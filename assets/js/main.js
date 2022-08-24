const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
  }
  window.addEventListener('scroll', scrollHeader)

  
  const accordionItems=document.querySelectorAll('.value__accordion-item')
  accordionItems.forEach((item)=>{
        const accordionHeader=item.querySelector('.value__accordion-header')
        accordionHeader.addEventListener('click', ()=>{
          const openItem=document.querySelector('.accordion-open')
          toogleItem(item)
  
          if(openItem && openItem !== item){
            toogleItem(openItem)
          }
  
    })
  })
  
  const toogleItem=(item)=>{
    const accordionContent=item.querySelector('.value__accordion-content')
    if(item.classList.contains('accordion-open')){
      accordionContent.removeAttribute('style')
      item.classList.remove('accordion-open')
    }else{
      accordionContent.style.height=accordionContent.scrollHeight + `px`
      item.classList.add('accordion-open')
  
    }
    
  }
  
  
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
  window.addEventListener('scroll', scrollActive)
  
  
  const scrollUp = () =>{
      const scrollUp = document.getElementById('scroll-up')
      // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
      this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                          : scrollUp.classList.remove('show-scroll')
  }
  window.addEventListener('scroll', scrollUp)
  
  
  
  /*=============== DARK LIGHT THEME ===============*/ 
  const themeButton = document.getElementById('theme-button')
  const darkTheme = 'dark-theme'
  const iconTheme = 'bx-sun'
  
  // Previously selected topic (if user selected)
  const selectedTheme = localStorage.getItem('selected-theme')
  const selectedIcon = localStorage.getItem('selected-icon')
  
  // We obtain the current theme that the interface has by validating the dark-theme class
  const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
  const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'
  
  // We validate if the user previously chose a topic
  if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
  }
  
  
  // Activate / deactivate the theme manually with the button
  themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
  })
  
  const sr = ScrollReveal({
    origin:'top',
    distance:'60px',
    duration:2500,
    delay:400,
    reset:true
  
  })
  
  sr.reveal(`.home__title, .popular__container, .subscribe__container, .footer__container`)
  sr.reveal(`.home__description, .footer__info`, {delay:500})
  sr.reveal(`.home__search`, {delay:600})
  sr.reveal(`.home__value`, {delay:700})
  sr.reveal(`.home__images`, {delay:800, origin:'bottom'})
  sr.reveal(`.logo__img`,{interval:100})
  sr.reveal(`.contact__content`,{origin:'left'})
  sr.reveal(`.value__content, .contact__images`,{origin:'right'})


// COLORS
const mainColorPicker = document.querySelector('#color');
const mainColorValue = document.querySelector('#color-value');







// SLIDERS


const marginSlider = document.querySelector('#margin');
const marginValue = document.querySelector('#margin-value');



const updateMargin = e => {
    const value = e.target.value;
    marginValue.innerText = `${value} px`;
};

const addSliderEventListeners = () => {
    
    marginSlider.addEventListener('change', updateMargin);
};

addSliderEventListeners();

// URL / TEXT / DATA
const dataInput = document.querySelector('#data');
// FORMAT

// BUTTON
const submitButton = document.querySelector('#cta');

const prepareParameters = params => {
    const prepared = {
        data: params.data,
        size: `200x200`,
       
        qzone: params.qZone,
        format: 'png',
    };

    return prepared;
};

const settingsContainer = document.querySelector('#qr-code-settings');
const resultsContainer = document.querySelector('#qr-code-result');
const qrCodeImage = document.querySelector('#qr-code-image');
const download = document.querySelector('.download__button');

const displayQrCode = imgUrl => {
   

    qrCodeImage.setAttribute('src', imgUrl);
};


const downloadQrCode = imgUrl => {
    download.setAttribute('href', imgUrl);
}


const getQrCode = parameters => {
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const urlParams = new URLSearchParams(parameters).toString();

    const fullUrl = `${baseUrl}?${urlParams}`;


    fetch(fullUrl).then(response => {
        if (response.status === 200) {
            displayQrCode(fullUrl);
            console.log(fullUrl)
            downloadQrCode(fullUrl)

            const manipulate = document.querySelector('.qrtitle')
            manipulate.innerHTML = `Your QR Code Is Ready`
        }
    });
};

const showInputError = () => {
    dataInput.classList.add('error');
};

const dataInputEventListener = () => {
    dataInput.addEventListener('change', e => {
        if (e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
            submitButton.style.opacity = `1`
            download.style.opacity = `1`
            

        } else {
            dataInput.classList.add('error');
            submitButton.setAttribute('disabled', true);
        }
    });
};




dataInputEventListener();

const onSubmit = () => {
    const data = dataInput.value;
    if (!data.length) {
        return showInputError();
    }

   
    
    const qZone = marginSlider.value;
    

    const parameters = prepareParameters({ data, qZone});

    getQrCode(parameters);
};

const addSubmitEventListener = () => {
    submitButton.addEventListener('click', onSubmit);
};

addSubmitEventListener();




const wrapper = document.querySelector(".wrapper"),
form = document.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = document.querySelector(".close"),
copyBtn = document.querySelector(".copy");

function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't scan QR Code";
    });
}

fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
  
function happy(){
  Swal.fire({
      title: '<strong><em>Thanking You</em></strong>',
      icon: 'Success',
      html:
        '<b>Keep Smiling It Suits You</b>', 
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,
      confirmButtonText:
        'Close'        
      
    })
}


introJs().start();

