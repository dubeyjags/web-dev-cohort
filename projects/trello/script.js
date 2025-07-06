function addTask(id){
    const input = document.getElementById(`${id}-input`);
    const list = document.getElementById(`${id}-list`); 
    if(input.value === ''){
        return;
    }  
    const item = createItem(input.value)    
    list.appendChild(item)
    input.value=''    
}

function createItem(text){
    const item = document.createElement('div')
    item.classList.add('item')
    item.innerText = text;
    const dateDiv = document.createElement('div')
    dateDiv.classList.add('date')
    const d = new Date();
    dateDiv.innerText = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()} : ${d.getMinutes()}`;
    item.appendChild(dateDiv)
    item.draggable=true
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
    return item;
}
function dragStart(){
    this.classList.add('dragging')
}
function dragEnd(){
    this.classList.remove('dragging')
}

const section = document.querySelectorAll('.list')
section.forEach((item) => {
    item.addEventListener('dragover', ()=>{
        const draggingElement = document.querySelector('.dragging');
        item.appendChild(draggingElement)        
    })
})