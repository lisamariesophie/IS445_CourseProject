const createBtn = document.getElementById('createBtn');
const updateBtn = document.getElementById('updateBtn');
const db = firebase.firestore();
const contacts = db.collection('contacts');
let counter;

createBtn.addEventListener('click', createContact);

//get Contacts from Firebase and render Table
function getContacts() {
  const table = document.getElementById('tbody');
  contacts.onSnapshot(docs => {
    table.innerHTML = "";
    counter = 1;
    docs.forEach(doc => {
      table.innerHTML +=
        `<tr>
      <th scope="row">${counter}</th>
      <td>${doc.data().name}</td>
      <td>${doc.data().email}</td>
      <td>${doc.data().phone}</td>
      <td><button class="btn btn-outline-primary" onclick="showDetails('${doc.id}', '${doc.data().name}', '${doc.data().email}', '${doc.data().phone}')">Details</button></td>
      <td><button class="btn btn-outline-warning" onclick="editContact('${doc.id}', '${doc.data().name}', '${doc.data().email}', '${doc.data().phone}')">Edit</button></td>
      <td><button class="btn btn-outline-danger" onclick="deleteContact('${doc.id}')">Delete</button></td>
      </tr>`;
      counter++;
    });
  });
}

//create new Contact in Firebase
function createContact() {
  const createForm = document.getElementById('createForm');
  contacts
    .add({
      name: createForm.name.value,
      email: createForm.email.value,
      phone: createForm.phone.value
    })
    .then(function (docRef) {
      showDetails(docRef.id, createForm.name.value, createForm.email.value, createForm.phone.value);
      createForm.name.value = '';
      createForm.email.value = '';
      createForm.phone.value = '';
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
}

//edit Contact
function editContact(id, name, email, phone) {
  const editForm = document.getElementById('editForm');
  $('#editContact').modal('show');
  editForm.name.value = name;
  editForm.email.value = email;
  editForm.phone.value = phone;
  updateBtn.onclick = function () {
    $('#editContact').modal('toggle');
    updateContact(id, editForm.name.value, editForm.email.value, editForm.phone.value);
  };
}

//update Contact in Firebase
function updateContact(id, name, email, phone) {
  return contacts.doc(id)
    .update(
      {
        name: name,
        email: email,
        phone: phone
      }
    ).then(() => {
      console.log('UPDATED', id);
    }).catch(function (error) {
      console.error('Error editing document: ', error);
    });
}

//delete Contact from Firebase
function deleteContact(id) {
  let confirmation = confirm("Are you sure?");
  if (confirmation === true) {
    contacts
      .doc(id)
      .delete()
      .then(() => {
        console.log("DELETED", id);
      }).catch(
        function (error) {
          console.error("Error removing document: ", error);
        });
  }
}

//show Details and Options in Modal
function showDetails(id, name, email, phone) {
  const editBtn = document.getElementById("editBtn");
  $('#detailsContact').modal('show');
  const dName = document.getElementById("dName");
  const dEmail = document.getElementById("dEmail");
  const dPhone = document.getElementById("dPhone");
  dName.innerHTML = `Name: <span>${name}</span>`;
  dEmail.innerHTML = `Email: <span>${email}</span>`;
  dPhone.innerHTML = `Phone: <span>${phone}</span>`;
  deleteBtn.onclick = function () {
    $('#detailsContact').modal('toggle');
    deleteContact(id);
  };
  editBtn.onclick = function () {
    $('#detailsContact').modal('toggle');
    editContact(id, name, email, phone);
  };
}

getContacts();
