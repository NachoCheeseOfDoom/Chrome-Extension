const inputBtn = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el')

let myLeads = []

inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value)
  renderLead()
  inputEl.value = ''
})

function renderLead() {

  let listItem = ` 
  <li> 
    <a href="${inputEl.value}" target='_blank'> 
      ${inputEl.value}  
    </a>
    <a id='trashCanLink'>
    <img id='trashCanIcon' src="delete.png" alt="Trash can icon">
    </a>  
  </li>`
  if (inputEl.value === '') {
    return
  } else {
    ulEl.innerHTML += listItem
  }
}


// function renderLeads() {
//     let listItems = ""
//     for (let i = 0; i < myLeads.length; i++) {
//         listItems += "<li>" + myLeads[i] + "</li>"
//     }
//     ulEl.innerHTML = listItems
// }