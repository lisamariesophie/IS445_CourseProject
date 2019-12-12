const createName = document.getElementById('createName');
const createEmail = document.getElementById('createEmail');
const createPhone = document.getElementById('createPhone');
const editName = document.getElementById('editName');
const editEmail = document.getElementById('editEmail');
const editPhone = document.getElementById('editPhone');
let isValidCreateEmail;
let isValidCreateName;
let isValidCreatePhone;
let isValidEditEmail = true;
let isValidEditName = true;
let isValidEditPhone = true;

//Input Validation for CreateContacts Form
createName.addEventListener('keyup', () => {
    isValidCreateName = createName.checkValidity();
    createInputsValid();
});

createEmail.addEventListener('keyup', () => {
    isValidCreateEmail = createEmail.checkValidity();
    createInputsValid();
});

createPhone.addEventListener('keyup', () => {
    isValidCreatePhone = createPhone.checkValidity();
    createInputsValid();
});

function createInputsValid() {
    if (isValidCreateName && isValidCreateEmail && isValidCreatePhone) {
        createBtn.disabled = false;
    }
    else {
        createBtn.disabled = true;
    }
}

//Input Validation for EditContacts Form
editName.addEventListener('keyup', () => {
    isValidEditName = editName.checkValidity();
    editInputsValid();
});

editEmail.addEventListener('keyup', () => {
    isValidEditEmail = editEmail.checkValidity();
    editInputsValid();
});

editPhone.addEventListener('keyup', () => {
    isValidEditPhone = editPhone.checkValidity();
    editInputsValid();
});

function editInputsValid() {
    if (isValidEditName && isValidEditEmail && isValidEditPhone) {
        updateBtn.disabled = false;
    }
    else {
        updateBtn.disabled = true;
    }
}

