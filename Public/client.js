const socket = io()

let name;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message_area')
do{
    name= prompt('please enter your name')
}while(!name)

textarea.addEventListener('keyup' , (e)=>{
     if(e.key=='Enter'){
        sendMessage(e.target.value)
     }
})

function sendMessage(message){
    let msg={
        user:name ,
        message:message.trim()
    }

    appendMessage(msg,'outgoing')

    socket.emit('message' , msg)
}


function appendMessage(msg , type){
   let mainDiv=document.createElement('div')
   let className=type
   mainDiv.classList.add(className , 'message')

   let markup = `
      <h3>${msg.user}</h4>
      <p>${msg.message}</p>
   `

    mainDiv.innerText = markup
    messageArea.appendChild(mainDiv)
}

socket.on('message' , ()=>{
    appendMessage(msg , 'incoming')

})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}