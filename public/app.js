
const createBtns = document.getElementsByClassName('createBtn');
const editBtns = document.getElementsByClassName('editBtn');
const deleteBtns = document.getElementsByClassName('deleteBtn');
const detailsModal = document.getElementById('detailsModal');
const db = firebase.firestore();
const contacts = db.collection('users');
let counter = 1;

function getContacts() {
  contacts.onSnapshot(docs => {
    docs.forEach(doc => {
      renderContacts(doc)
    })
  })
};

function renderContacts(doc) {
  const tbody = document.getElementById('tbody');
  let row = document.createElement('tr');
  let tdNumber = document.createElement('td');
  let tdName = document.createElement('td');
  let tdEmail = document.createElement('td');
  let tdPhone = document.createElement('td');
  let detailsBtn = document.createElement('button');
  let editBtn = document.createElement('button');
  let deleteBtn = document.createElement('button');
  detailsBtn.className = "btn btn-outline-primary";
  detailsBtn.textContent = "Details";
  detailsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    showDetails(id);
  });
  editBtn.className = "editBtn btn btn-outline-warning";
  editBtn.textContent = "Edit";
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    editContact(id);
  });
  deleteBtn.className = "btn btn-outline-danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    confirmDelete(id);
  });
  row.setAttribute('data-id', doc.id);
  tdNumber.textContent = counter;
  tdName.textContent = doc.data().name;
  tdEmail.textContent = doc.data().email;
  tdPhone.textContent = doc.data().phone;
  row.appendChild(tdNumber);
  row.appendChild(tdName);
  row.appendChild(tdEmail);
  row.appendChild(tdPhone);
  row.appendChild(detailsBtn);
  row.appendChild(editBtn);
  row.appendChild(deleteBtn);
  tbody.appendChild(row);
  counter++;
}

async function getContact(id) {
  const contact = await contacts.doc(id).get().then(function (documentSnapshot) {
    if (documentSnapshot.exists) {
      let data = documentSnapshot.data();
      return data;
    } else {
      console.log('document not found');
    }
  });
  return contact;
}

function createContact() {
  const form = document.getElementById('createForm');
  db.collection('users')
    .add({
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id)
      setId(docRef.id);
      form.name.value = '';
      form.email.value = '';
      form.phone.value = '';
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
}

function updateContact(id, contact) {
  const form = document.getElementById('updateForm');
  db.collection("users")
    .doc(id)
    .update(
      {
        name: contact.name,
        email: contact.email,
        phone: contact.phone
      },
    );
}

function setId(newId) {
  db.collection('users').doc(newId).update({
    id: newId
  }).then(() => {
    console.log('ID SET', newId)
  });
}

function deleteContact(id) {
  db.collection("users")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    }).catch(
      function (error) {
        console.error("Error removing document: ", error);
      });
}

function confirmDelete(id) {
  let confirmation = confirm("Are you sure?");
  if (confirmation == true) {
    deleteContact(id);
  }
}

async function showDetails(id) {
  $('#detailsContact').modal('show');
  let deleteBtn = document.getElementById('deleteBtn');
  let editBtn = document.getElementById('editBtn');
  const contact = await getContact(id);
  const dName = document.getElementById("dName");
  const dEmail = document.getElementById("dEmail");
  const dPhone = document.getElementById("dPhone");
  dName.innerHTML = `Name: <span>${contact.name}</span>`;
  dEmail.innerHTML = `Email: <span>${contact.email}</span>`;
  dPhone.innerHTML = `Phone: <span>${contact.phone}</span>`;
  deleteBtn.addEventListener('click', (e) => {
    $('#detailsContact').hide();
    e.stopPropagation();
    confirmDelete(id);
  });
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    editContact(id);
  });
}

async function editContact(id) {
  console.log(id);
  $('#editContact').modal('show');
  const updateBtn = document.getElementById('updateBtn');
  const form = document.getElementById('editForm');
  const contact = await getContact(id);
  form.name.value = contact.name;
  form.email.value = contact.email;
  form.phone.value = contact.phone;
  updateBtn.addEventListener('click', (e) => {
  $('#editContact').hide();
    e.stopPropagation();
    contact.name = form.name.value;
    contact.email = form.email.value;
    contact.phone = form.phone.value;
    updateContact(id, contact);
  });
}


getContacts();
