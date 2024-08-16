import { allDoctor } from '../config/variable.js';
export function validationForm(form) {
    const errordoctor = crateTagErr('Enter doctor');
    const errorurgency = crateTagErr('Enter urgency');
    const errorfullname = crateTagErr('Enter Surname and Name')
    const errordate = crateTagErr('Invalid Date')

    form.addEventListener('change', (e) => {
        console.log(e.target);
        if (e.target.classList.contains('form-doctor')) {
            e.target.classList.remove('err-input')
            errordoctor.remove()
        }
        if (e.target.classList.contains('form-urgency')) {
            e.target.classList.remove('err-input')
            errorurgency.remove()

        }
        if (e.target.classList.contains('form-fullname')) {
            e.target.classList.remove('err-input')
            errorfullname.remove()

        }
        if (e.target.classList.contains('input-dantist')) {
            e.target.classList.remove('err-input')
            errordate.remove()
        }
    });

    const doctor = form.querySelector('.form-doctor')
    if (doctor.value !== "0") {

        const urgency = form.querySelector('.form-urgency')
        const fullname = form.querySelector('#fullname')
        const lastvisit = form.querySelector('.input-dantist')

        if (allDoctor[doctor] === 'Стоматолог' &&
            urgency.value !== '0' &&
            fullname.value.includes(' ') &&
            fullname.value.length > 2 &&
            lastvisit.value !== '') {
            console.log('yes!!!!');
            return true
        } else {
            console.log('not all data ');
            console.log('fullname.value.length > 2', fullname.value.length > 2);
            if (urgency.value === "0") {
                urgency.classList.add('err-input')
                if (urgency.nextElementSibling === null) {
                    urgency.after(errorurgency)
                }
            }
            console.log(!fullname.value.includes(' '), 'includes', fullname.value);
            if (fullname.value.length < 2) {
                fullname.classList.add('err-input')
                if (fullname.nextElementSibling === null) {
                    fullname.after(errorfullname)
                }

            }
            if (lastvisit.value === '') {
                lastvisit.classList.add('err-input')
                if (lastvisit.nextElementSibling === null) {
                    lastvisit.after(errordate)
                }

            }
            console.log(lastvisit.value, new Date(lastvisit.value), new Date());
        }

        if (allDoctor[doctor] === 'Кардіолог') { }
        if (allDoctor[doctor] === 'Терапевт') {
        }
        // return true
    } else {
        console.log('doctor.value !== "0"', doctor.value !== "0");
        doctor.classList.add('err-input')
        doctor.after(errordoctor)
        return false
    }
}

function crateTagErr(text) {
    const tag = document.createElement('div')
    tag.classList.add('mt-2', "text-danger", "input-err")
    tag.textContent = text
    return tag
}