import { allDoctor, listArgency } from "../config/variable.js"
import { Modal } from "../сlass/classModal.js"

const listDoctor = Object.keys(allDoctor)


export class ModalVisit extends Modal {
    constructor(title = 'Оберіть лікаря') {
        super(title)
        this.body = `
        <form name="modal" class="form-visit">
            <select id="doctorSelect" class="form-select form-doctor" aria-label="Default select example" name='doctor'>
                <option selected disabled value="0">Оберіть лікаря</option>
                <option value="${listDoctor[0]}">${allDoctor[listDoctor[0]]}</option>
                <option value="${listDoctor[1]}">${allDoctor[listDoctor[1]]}</option>
                <option value="${listDoctor[2]}">${allDoctor[listDoctor[2]]}</option>
            </select>
            <div id="fields"></div>
            <div class="d-flex justify-content-center gap-3 mt-2">
                <button type="submit" class="btn btn-primary" id="submit-btn">Створити</button>
                <button type="button" class="btn btn-danger close_btn" id="close-btn">Закрити</button>
            </div>
        </form>
        `
    }
    renderVisit() {
        this.formModalVisit = super.render()
        this.showFields()
        return this.formModalVisit
    }

    showFields() {
        this.form = this.formModalVisit.querySelector('.form-visit')
        this.fields = this.formModalVisit.querySelector('#fields')
        this.btnClose = this.form.querySelector('.close_btn')
        this.btnClose.addEventListener('click', () => {
            super.closeModal()
        })
        const itemsUrgency = Object.keys(listArgency)
        this.form.addEventListener('change', (e) => {
            const doctor = e.target.value
            //    додав контент для коректної модалки + bootstrap
            const commonFields = `
                <div class="mt-3 text-center fs-5 fw-bold ">Запис до: ${allDoctor[doctor]}a</div>
                    <div class="form-group mt-2">
                        <label for="use" class="form-group-label mb-1 ">Мета візиту</label>
                        <input type="text" id="use"  class="form-control" placeholder="Мета Візиту" name="reason">
                    </div>
                    <div class="form-group mt-2">
                        <label for="description" class="form-group-label mb-1">Короткий опис візиту</label>
                        <input type="text" placeholder="Короткий опис візиту" class="form-control" name="description" id="description">
                    </div>
                    <div class="form-group mt-2">
                        <select name="urgency" class="form-select form-urgency" aria-label="Default select example ">
                            <option selected disabled value="0">Терміновість</option>
                            <option value="${itemsUrgency[0]}">${listArgency[itemsUrgency[0]]}</option>
                            <option value="${itemsUrgency[1]}">${listArgency[itemsUrgency[1]]}</option>
                            <option value="${itemsUrgency[2]}">${listArgency[itemsUrgency[2]]}</option>
                        </select>
                    </div>
                    <div class="form-group mt-2">
                        <label for="fullname" class="form-group-label mb-1 form-fullname">Прізвище Ім'я</label>
                        <input type="text"  class="form-control form-fullname" id="fullname" placeholder="Прізвище Ім'я" name="name">
                    </div>
                        `
            if (allDoctor[doctor] === "Кардіолог") {
                this.fields.innerHTML = commonFields + `
                <div class="form-group mt-2">
                    <label for="pressure" class="form-group-label mb-1">Звичайний тиск</label>
                    <input type="number" class="form-control form-pressure"  id="pressure" placeholder="Звичайний тиск" name="pressure">
                </div>
                <div class="form-group mt-2">
                    <label for="index-body" class="form-group-label mb-1">Індекс маси тіла</label>
                    <input type="number"  id="index-body" class="form-control form-index" placeholder="Індекс маси тіла" name="index">
                </div>
                <div class="form-group mt-2">
                    <label for="illness" class="form-group-label mb-1">Перенесені захворювання серцево-судинної системи</label>
                    <input type="text"  id="illness" class="form-control form-illness" placeholder="Перенесені захворювання серцево-судинної системи" name="illness">
                </div>
                <div class="form-group mt-2">
                    <label for="age" class="form-group-label mb-1">Вік</label>
                    <input type="number"  id='age' class="form-control form-age" placeholder="Вік" name="age">
                </div> 
                `
            }
            else if (allDoctor[doctor] === "Стоматолог") {
                this.fields.innerHTML = commonFields + `
                   <div class="form-group mt-3">
                        <label for="date-last" class="form-group-label mb-1">Дата останнього відвідування</label>
                        <input type="date" id='date-last' class="form-control input-dantist" placeholder="Дата останнього відвідування" name="date">
                    </div> 
                    `
            }
            else if (allDoctor[doctor] === "Терапевт") {
                this.fields.innerHTML = commonFields + `
                    <div class="form-group mt-3">
                        <label for="age" class="form-group-label mb-1">Вік</label>
                        <input type="number"  id='age' class="form-control input-therapist " placeholder="Вік" name="age">
                    </div> 
                    `
            }
        })
    }

}