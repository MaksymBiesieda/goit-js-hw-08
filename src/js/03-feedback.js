import throttle from "lodash.throttle";
const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textAreaEl = document.querySelector('textarea');
const STORAGE_KEY = "feedback-form-state";
const savedData = {};

fillFormFields();

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault(event);
    if (event.target.elements.email.value === "" || event.target.elements.message.value === "") {
        alert('Все поля формы должны быть заполнены!')
        return;
    } else {
        const formDataObj = {};
        formDataObj.email = event.target.elements.email.value;
        formDataObj.message = event.target.elements.message.value;
        console.log(formDataObj);
    }
    localStorage.removeItem(STORAGE_KEY);
    event.currentTarget.reset();
    
}
function onFormInput(event) {
    savedData[event.target.name] = event.target.value;
    const savedDataJson = JSON.stringify(savedData);
    localStorage.setItem(STORAGE_KEY, savedDataJson);
}
function fillFormFields() {
    const savedLocalStorage = localStorage.getItem(STORAGE_KEY);
    const unparsedLS = JSON.parse(savedLocalStorage);
    if (savedLocalStorage) {
        inputEl.value = unparsedLS.email;
        textAreaEl.value = unparsedLS.message;
    }
}

