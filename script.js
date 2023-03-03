const header = document.querySelector('.navbar');
console.log(header);
window.onscroll = function() {
    const top = window.scrollY;
    if(top >=1) {
        header.classList.add('navbarDark');
    }
    else {
        header.classList.remove('navbarDark');
    }
}

const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')

navLinks.forEach((l) => {
    l.addEventListener('click', () => { new bootstrap.Collapse(menuToggle).toggle() })
})



const form = document.querySelector("form"),
statusTxt = form.querySelector(".button-area");
form.onsubmit = (e)=>{

  e.preventDefault();


  let xhr = new XMLHttpRequest();
  xhr.open('post','message1.php',true);

  
  xhr.onload = ()=>{
    alert(xhr.status);
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  alert();
  xhr.send(formData);
  alert("sending");
}