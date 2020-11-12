const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    console.log('testing!')
    messageOne.textContent = "Loading... Message"
    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                console.log(data.location);
                console.log(data.forecast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;                
            }
    });
})
})

