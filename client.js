const socket= io();

const form=document.getElementById('Send containear');
const messageInput= document.getElementById('MassageImp');
const messageconta=document.querySelector(".message__area")
const append=(message,position)=>{
const messageelement=document.createElement('div');
messageelement.innerText=message;
messageelement.classList.add('message')
messageelement.classList.add(position);
messageconta.append(messageelement);
}
form.addEventListener('submit',(e)=>{
e.preventDefault();
const message=messageInput.value;
append(`YOU : ${message}`,`incomming`)
socket.emit('send', message);
messageInput.value='';
})

let name;
do{
    name=prompt("ENTER YOUR NAME")
}while(!name)
socket.emit('new-user-joined',name)

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,`outgoing`);
    
})
socket.on('recive', data=>{
    append(`${data.name}:  ${data.message}`,`outgoing`);
    
    
})
socket.on('LEFT', name=>{
    append(`${name} Left The Chat `,`outgoing`);
    
})