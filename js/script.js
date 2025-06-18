
const scriptURL = 'https://script.google.com/macros/s/AKfycbz-MwFiIdRVke5u4yXn0LZAh9u96woRoSEcdcp6eEQyZ1Rq-owaYtyyGVDAKb9uQ25k/exec'

const form = document.forms['form-data'];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get the reCAPTCHA response token
  const recaptchaToken = grecaptcha.getResponse();

  if (!recaptchaToken) {
    alert("Please complete the CAPTCHA verification.");
    return;
  }

  // Append the CAPTCHA response to form data
  const formData = new FormData(form);
  formData.append('g-recaptcha-response', recaptchaToken);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => alert("Success!!"))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message));
});
