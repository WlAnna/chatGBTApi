import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

//Loader ...
function loader(element) {
    element.textContent = '' // empty at start

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

//Typing functionality

function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) { // we are still typing
            element.innerHTML += text.charAt(index) // give character at specific index
            index++
        } else { // we reach end of text
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

// Visual colors and icons for us and bot
function chatStripe(isAi, value, uniqueId) { // isAI or us, value of message
    return ( // template strings allow to add enters to the code
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

const handleSubmit = async(e) => {
    e.preventDefault() // for submit form to prevent default behavior of browser

    const data = new FormData(form) // get data from form

    // generate user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt')) // get to display user question

    // to clear the textarea input 
    form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight; // put new message in view when user typing

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    // until this code you cen test
    //creat backend app to make a call to open ai API
    //ctrl + C to stop running terminal > cdd server >  npm init -y to create package.json


}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) { // 13 is enter key
        handleSubmit(e)
    }
})