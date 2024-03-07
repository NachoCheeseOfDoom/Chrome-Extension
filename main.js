let myLeads = []

const inputBtn = document.getElementById('input-btn');
const saveTabBtn = document.getElementById('tab-btn');
const deleteBtn = document.getElementById('delete-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el')

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)

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
  myLeads.splice(index, 1);
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads)
};

function render(leads) {
  ulEl.innerHTML = '';
  for (let i = 0; i < leads.length; i++) {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = leads[i];
    link.target = '_blank';
    link.textContent = leads[i];

    const trashCanLink = document.createElement('a');
    trashCanLink.id = 'trashCanLink';
    trashCanLink.addEventListener('click', function () {
      deleteLocalStorage(i);
    });

    const trashCanIcon = document.createElement('img');
    trashCanIcon.id = 'trashCanIcon';
    trashCanIcon.src = 'delete.png';
    trashCanIcon.alt = 'Trash can icon';

    trashCanLink.appendChild(trashCanIcon);

    listItem.appendChild(link);
    listItem.appendChild(trashCanLink);
    ulEl.appendChild(listItem);
  }
}

