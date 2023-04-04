import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form') // The querySelector() method is used to select an element from the DOM the variable form will refer to the HTML element with the tag 'form
const chatContainer = document.querySelector('#chat_container') // Select element with an id of 'chat_container' and assigning it to the variable chatContainer.

let loadInterval

function loader(element) {
    //Clear the Text content property of element to an empty string
    //Clear before mag loading 
    element.textContent = ''
    // setInterval() method. This method is used to call a function
    // repeatedly at a specified interval, in this case, every 300 milliseconds.
    // Iya E Update ang textContent property of the Element 
    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        // Updates the text content of the property "element"
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        // If the loading indicator has reached three periods,
        // The textContent property of the element is reset to an empty string, 
        // which restarts the loading indicator cycle.
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300); //Mili seconds
}

/* The function checks if the index of the text string is less than the length of the text string. If it is, 
it adds the character at that index to the innerHTML of the element and increments the index by one. If not, 
it clears the interval. This allows for a type-writer effect on an HTML element with a given text string.
*/ 
function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

/*
function that handles a form submission and sends the data to an API endpoint. The function takes an event object as an argument,
which is used to prevent the default action of the form submission (e.preventDefault()). It then creates a FormData object from 
the event target, which is used to create an object from the form entries (Object.fromEntries()).The function then uses the fetch API 
to send a POST request to the API endpoint with the data as JSON in the body of the request, and sets the content type header to application/json.
If the response is successful, it redirects to a dashboard page, otherwise it throws an error and logs it in the console "Something went wrong".
*/

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    // to clear the textarea input 
    form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)
/*
making a POST request to the URL 'https://codigo.onrender.com/' with a body containing a JSON object. The JSON object
contains a key-value pair, with the key being 'prompt' and the value being the data from the 'data' variable
*/
    const response = await fetch('https://codigo.onrender.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })
/* 
Clears the interval that was set up to load the message. The second line clears any existing messages in the messageDiv element. 
The if statement checks if the response from the bot was successful. If it was, it parses the data from the response and trims 
any trailing spaces or new lines. It then calls a typeText function which types out the parsed data in the messageDiv element. 
If there was an error with the response, it sets an error message in the messageDiv element and displays an alert "Something went wrong"
*/
    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

        typeText(messageDiv, parsedData)
    } else {
        const err = await response.text()

        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}
/*
adds an event listener to a form element. The first line adds an event listener for the 'submit' event, 
which will call the function handleSubmit when the form is submitted. The second line adds an event 
listener for the 'keyup' event, which will call the function handleSubmit when the enter key is pressed. 
This allows users to submit the form by pressing enter instead of clicking a submit button.
*/
form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})
