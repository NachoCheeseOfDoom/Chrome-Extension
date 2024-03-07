let myLeads = []

const inputBtn = document.getElementById('input-btn');
const saveTabBtn = document.getElementById('tab-btn');
const deleteBtn = document.getElementById('delete-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el')

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
// console.log(leadsFromLocalStorage)

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

inputBtn.addEventListener('click', function () {
  if (inputEl.value === "") {
    return
  } else {
    myLeads.push(inputEl.value)
    render(myLeads)
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    inputEl.value = ''
  }
})

saveTabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentTab = tabs[0].url;
    myLeads.push(currentTab)
    render(myLeads)
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
  })
})

deleteBtn.addEventListener('dblclick', function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads)

});

function deleteLocalStorage(index) {
  let leadIndex = JSON.parse(localStorage.getItem(`myLeads`))
  leadIndex.splice(index, 1);
  localStorage.setItem('myLeads', JSON.stringify(leadIndex));
  render(leadIndex)
};

function render(leads) {

  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li> 
      <a href="${leads[i]}" target='_blank'> 
        ${leads[i]}
        </a>
      <a id='trashCanLink' onclick="deleteLocalStorage(${i})">
        <img id='trashCanIcon' src="delete.png" alt="Trash can icon">
      </a>  
    </li>`
  }
  ulEl.innerHTML = listItems
}

