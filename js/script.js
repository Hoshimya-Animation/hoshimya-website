const scriptURL = 'https://script.google.com/macros/s/AKfycbzJF6_Pip6PHhbZU_8S6AoD65pGDTi_ESBR36OSZgJnLCBcG7hKBlAgEwswMXo7Kr47/exec'

const form = document.forms['form-data']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert("Success!!"))
    .then(() =>{window.location.reload();})
    .catch(error => console.error('Error!', error.message))
})