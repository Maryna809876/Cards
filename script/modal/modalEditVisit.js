import { Modal } from '../сlass/classModal.js'
import { allDoctor, listArgency } from "../config/variable.js"
const listDoctor = Object.keys(allDoctor)
export class ModalEditCard extends Modal {
    constructor(cardData, title = 'Edit card',) {
        super(title);
        this.cardData = cardData;
        console.log(this.cardData);
        this.body = `
        <form  name="modal" class='form-edit-visit'>
        <select id="doctorSelect" class="form-select" aria-label="Default select example" name='doctor'>
            <option selected disabled value="0">Оберіть лікаря</option>
            <option value="${listDoctor[0]}">${allDoctor[listDoctor[0]]}</option>
            <option value="${listDoctor[1]}">${allDoctor[listDoctor[1]]}</option>
            <option value="${listDoctor[2]}">${allDoctor[listDoctor[2]]}</option>
        </select>
        <div id="fields"></div>
        <div class="d-flex justify-content-center gap-3 mt-2">
            <button type="submit" class="btn btn-primary"  id="submit-btn">Зберегти зміни</button>
            <button type="button"  class="btn btn-danger close_btn" id="close-btn">Закрити</button>
        </div>
    </form>`
    }

    createModal() {
        // Заполнение формы данными из существующей карточки
        this.formEditVisit = super.render();
        this.populateFields();
        return this.formEditVisit;
    }

    populateFields() {
        this.form = this.formEditVisit.querySelector(".form-edit-visit");
        this.fields = this.formEditVisit.querySelector("#fields");
        this.doctorSelect = this.formEditVisit.querySelector("#doctorSelect");
        this.doctorSelect.value = this.cardData.doctor;
        this.btnClose = this.form.querySelector('.close_btn')
        this.btnClose.addEventListener('click', () => {
            super.closeModal()
        })
        this.showFields(allDoctor[this.doctorSelect.value]);
        this.cardUrgency = this.formEditVisit.querySelector('.card_urgency')
        this.cardUrgency.value = this.cardData.urgency

        this.form.addEventListener('change', (e) => {
            const doctor = e.target.value
            this.showFields(allDoctor[doctor])
        })
    }

    showFields(doctor) {
        const itemsUrgency = Object.keys(listArgency)
        const commonFields = `
        <div class="mt-3 text-center fs-5 fw-bold">Запис до: ${doctor}a</div>
        <div class="form-group mt-2">
            <label for="use" class="form-group-label mb-1">Мета візиту</label>
            <input type="text" id="use"  class="form-control" placeholder="Мета Візиту" name="reason" value = "${this.cardData.reason || ''}">
        </div>
        <div class="form-group mt-2">
            <label for="description" class="form-group-label mb-1">Короткий опис візиту</label>
            <input type="text" placeholder="Короткий опис візиту" class="form-control" name="description" id="description" value="${this.cardData.description || ''}">
        </div>
        <div class="form-group mt-2">
            <select name="urgency"  class="form-select card_urgency" aria-label="Default select example">
                <option selected disabled value="0">Терміновість</option>
                <option value="${itemsUrgency[0]}">${listArgency[itemsUrgency[0]]}</option>
                <option value="${itemsUrgency[1]}">${listArgency[itemsUrgency[1]]}</option>
                <option value="${itemsUrgency[2]}">${listArgency[itemsUrgency[2]]}</option>
            </select>
        </div>
        <div class="form-group mt-2">
            <label for="fullname" class="form-group-label mb-1">Прізвище Ім'я</label>
            <input type="text"  class="form-control" id="fullname" placeholder="Прізвище Ім'я" name="name" value="${this.cardData.name || ''}">
        </div>`

        if (doctor === "Кардіолог") {
            this.fields.innerHTML = commonFields + `
        <div class="form-group mt-2">
            <label for="pressure" class="form-group-label mb-1">Звичайний тиск</label>
            <input type="number" class="form-control"  id="pressure" placeholder="Звичайний тиск" name="pressure" value="${this.cardData.pressure || ''}">
        </div>
        <div class="form-group mt-2">
            <label for="index-body" class="form-group-label mb-1">Індекс маси тіла</label>
            <input type="number"  id="index-body" class="form-control" placeholder="Індекс маси тіла" name="index" value="${this.cardData.index || ''}">
        </div>
        <div class="form-group mt-2">
            <label for="illness" class="form-group-label mb-1">Перенесені захворювання серцево-судинної системи</label>
            <input type="text"  id="illness" class="form-control" placeholder="Перенесені захворювання серцево-судинної системи" name="illness" value="${this.cardData.illness || ''}">
        </div>
        <div class="form-group mt-2">
            <label for="age" class="form-group-label mb-1">Вік</label>
            <input type="number"  id='age' class="form-control" placeholder="Вік" name="age" "${this.cardData.age || ''}">
        </div>`
        } else if (doctor === "Стоматолог") {
            this.fields.innerHTML = commonFields + `

            <div class="form-group mt-3">
                <label for="date-last" class="form-group-label mb-1">Дата останнього відвідування</label>
                <input type="date" id='date-last' class="form-control" placeholder="Дата останнього відвідування" name="date" value="${this.cardData.date || ''}">
            </div>`
        } else if (doctor === "Терапевт") {
            this.fields.innerHTML = commonFields + `
        <div class="form-group mt-3">
            <label for="age" class="form-group-label mb-1">Вік</label>
            <input type="number"  id='age' class="form-control" placeholder="Вік" name="age" value="${this.cardData.age || ''}">
        </div>`
        }
    }
}
