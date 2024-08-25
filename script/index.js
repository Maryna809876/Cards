import { isAuthorization } from './function/isAuthorization.js'
import { sendRequestUsers, createCard, getCard, getAllCard, editCard, deleteCard } from "./function/sendRequest.js"
import { ModalLogin } from "./modal/modalLogin.js";
import { ModalVisit } from './modal/modalVisit.js'
import { ModalEditCard } from './modal/modalEditVisit.js'
import { showCard } from './function/showCard.js'
import { filterCard } from './function/filterCard.js'
import { filterSearch } from './function/filterSearch.js'
import { allDoctor } from './config/variable.js';
import { VisitDentist, VisitCardiologist, VisitTherapist } from './сlass/classVisit.js'
import { validationForm } from './function/validationForm.js'

import { makeDraggable } from './function/funDragDrop.js';

let TOKEN = ''; // токен користувача отримується після авторизації 
window.addEventListener('DOMContentLoaded', () => {
    const storedToken = localStorage.getItem('TOKEN');
    if (storedToken) {
        TOKEN = storedToken;

        isAuthorization(TOKEN, ['.intro', '.btn_login'], ['.sect-card', '.btn_visit', '.btn_logout']);


        const cardAll = getAllCard(TOKEN);
        cardAll.then((data) => {
            if (data.length) {
                data.forEach((item) => {
                    if (allDoctor[item.doctor] === 'Стоматолог') {
                        const card = new VisitDentist(item)
                        listCard.append(card.render())
                    }
                    if (allDoctor[item.doctor] === 'Кардіолог') {
                        const card = new VisitCardiologist(item)
                        listCard.append(card.render())
                    }
                    if (allDoctor[item.doctor] === 'Терапевт') {
                        const card = new VisitTherapist(item)
                        listCard.append(card.render())
                    }
                });
            } else {
                listCard.insertAdjacentHTML('afterend', `
                <div class="fw-bold fs-1 text-center mt-5 not_card">No items have been added</div>`)
            }
        }).catch(err => console.log(err));
    }
});
const btnLogin = document.querySelector('.btn_login') // кнопка яка запускатиме модалку для входу 
const btnVisit = document.querySelector('.btn_visit') // кнопка яка запускатиме модалку для створення візиту 
const btnLogout = document.querySelector('.btn_logout') // кнопка яка запускатиме модалку вихід із кабінету 
const listCard = document.querySelector('.list-card') // список карток із візитами 
const cardFilter = document.querySelector('.card_filter') // форма для фільтрування карток із візитами 
// початок подія для авторизації 



btnLogin.addEventListener('click', () => {
    const formAuth = new ModalLogin() // клас модалка авторизація
    const form = formAuth.renderAuth();
    document.querySelector('.main').after(form)

    // подія на контент модалки 
    document.querySelector('#loginForm').addEventListener('submit', (e) => {
        e.preventDefault()
        const email = e.target.querySelector('#email').value;
        const password = e.target.querySelector('#password').value;
        const msgError = e.target.closest('.modal-content').querySelector('.error');
        const listCard = document.querySelector('.list-card')

        const data = sendRequestUsers({ email: email, password: password });
        // перевіряємо що повертає функція
        data.then(res => {
            if (!res) {
                msgError.style.display = 'block'
            } else {
                TOKEN = res;
                localStorage.setItem('TOKEN', TOKEN);
                formAuth.closeModal()
                isAuthorization(res, ['.intro', '.btn_login'], ['.sect-card', '.btn_visit', '.btn_logout',])
                const cardAll = getAllCard(TOKEN)
                cardAll.then((data) => {
                    if (data.length) {
                        data.forEach((item) => {
                            if (allDoctor[item.doctor] === 'Стоматолог') {
                                const card = new VisitDentist(item)
                                listCard.append(card.render())
                            }
                            if (allDoctor[item.doctor] === 'Кардіолог') {
                                const card = new VisitCardiologist(item)
                                listCard.append(card.render())
                            }
                            if (allDoctor[item.doctor] === 'Терапевт') {
                                const card = new VisitTherapist(item)
                                listCard.append(card.render())
                            }
                        });
                    } else {
                        listCard.insertAdjacentHTML('afterend', `
                        <div class="fw-bold fs-1 text-center mt-5 not_card">No items have been added</div>`)
                    }
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    })

})
// кнопка виходу із акаунта 
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('TOKEN');
    TOKEN = ""
    isAuthorization(true, [".sect-card", ".btn_visit", ".btn_logout"], ['.intro', '.btn_login'])
    listCard.innerHTML = ''
    document.querySelector('.not_card').remove()
})

//  кнопка створення візиту 

btnVisit.addEventListener('click', () => {
    const modal = new ModalVisit()
    const formVisit = modal.renderVisit()
    document.querySelector('.main').after(formVisit)
    const form = formVisit.querySelector('.form-visit')


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (validationForm(form)) {
            const data = {}; // обєкт який буде вказуватися в запит 
            const formObj = new FormData(form)
            for (const [key, value] of formObj) {
                data[key] = value
            }
            const responce = createCard(TOKEN, data)
            responce.then((data) => {
                if (allDoctor[data.doctor] === 'Стоматолог') {
                    const card = new VisitDentist(data)
                    listCard.append(card.render())
                    modal.closeModal()
                }
                if (allDoctor[data.doctor] === 'Кардіолог') {
                    const card = new VisitCardiologist(data)
                    listCard.append(card.render())
                    modal.closeModal()
                }
                if (allDoctor[data.doctor] === 'Терапевт') {
                    const card = new VisitTherapist(data)
                    listCard.append(card.render())
                    modal.closeModal()
                }
            }).catch(err => console.log(err))
            if (listCard.children.length) {
                document.querySelector('.not_card').remove()
            }
        }

    })
})
listCard.addEventListener('click', (e) => {
    if (e.target.closest('.btn-edit')) {
        const id = e.target.closest('.item_card').dataset.id
        const item = e.target.closest('.item_card')
        const responceCardId = getCard(id, TOKEN)
        responceCardId.then((data) => {
            const cardEdit = new ModalEditCard(data)
            document.querySelector('.main').after(cardEdit.createModal())
            const formEdit = document.querySelector('.form-edit-visit')

            formEdit.addEventListener('submit', (e) => {
                e.preventDefault()
                if (validationForm(formEdit)) {
                    const datainForm = {};
                    const formObj = new FormData(formEdit)
                    for (const [key, value] of formObj) {
                        datainForm[key] = value
                    }
                    const cardupdate = editCard(id, TOKEN, datainForm)
                    cardupdate.then((data) => {
                        if (allDoctor[data.doctor] === 'Стоматолог') {
                            const card = new VisitDentist(data);
                            item.innerHTML = card.render().innerHTML;
                            cardEdit.closeModal();
                        }
                        if (allDoctor[data.doctor] === 'Кардіолог') {
                            const card = new VisitCardiologist(data);
                            item.innerHTML = card.render().innerHTML;
                            cardEdit.closeModal();
                        }
                        if (allDoctor[data.doctor] === 'Терапевт') {
                            const card = new VisitTherapist(data);
                            item.innerHTML = card.render().innerHTML;
                            cardEdit.closeModal();

                        }
                    }).catch(err => console.log(err))
                }
            })
        }).catch(err => console.log(err))
    }

    if (e.target.closest('.btn-remove')) {
        const cardElement = e.target.closest('.item_card')
        const id = cardElement.dataset.id;
        const responce = deleteCard(id, TOKEN)
        if (responce) {
            e.target.closest('.item_card').remove()
        }
        if (!listCard.children.length) {
            listCard.insertAdjacentHTML('afterend', `
                        <div class="fw-bold fs-1 text-center mt-5 not_card">No items have been added</div>`)
        }
        //!  знайти ID і запит delete, при успішному видалити карту 
    }




    if (e.target.closest('.card_show')) {
        // відкриває вікно із повним описом даної картки 
        const item = e.target.closest('.item-card')
        showCard(item, TOKEN)
    }
})
cardFilter.addEventListener('input', (e) => {
    filterCard()
    if (e.target.classList.contains('form_search')) {
        if (e.target.value.length > 0) {
            filterSearch(e.target.value)
        }
    }
})

cardFilter.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-clean-filter')) {
        e.target.previousElementSibling.value = "0"
        filterCard()

    }
})


makeDraggable();



