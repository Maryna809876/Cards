import { allDoctor } from '../config/variable.js';
export function validationForm(form) {


    const errordoctor = crateTagErr('Enter doctor');
    const errorurgency = crateTagErr('Enter urgency');
    const errorfullname = crateTagErr('Enter Surname and Name');
    const errordate = crateTagErr('Invalid Date');
    const errorpressure = crateTagErr('Enter in the range 50-160');
    const errorindex = crateTagErr('Invalid data min 5');
    const errorillnes = crateTagErr('Invalid data');
    const errorage = crateTagErr('Invalid data');


    form.addEventListener('change', (e) => {
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
        if (e.target.classList.contains('form-pressure')) {
            e.target.classList.remove('err-input')
            errorpressure.remove()
        }
        if (e.target.classList.contains('form-index')) {
            e.target.classList.remove('err-input')
            errorindex.remove()
        }
        if (e.target.classList.contains('form-illness')) {
            e.target.classList.remove('err-input')
            errorillnes.remove()
        }
        if (e.target.classList.contains('form-age')) {
            e.target.classList.remove('err-input')
            errorage.remove()
        }
        if (e.target.classList.contains('input-therapist')) {
            e.target.classList.remove('err-input')
            errorage.remove()
        }


    });

    const doctor = form.querySelector('.form-doctor')
    const urgency = form.querySelector('.form-urgency')
    const fullname = form.querySelector('#fullname')
    if (doctor.value !== "0") {

        if (allDoctor[doctor.value] === 'Стоматолог') {
            const lastvisit = form.querySelector('.input-dantist')
            if (urgency.value !== '0' &&
                (fullname.value.trim().split(' ').length >= 2 && fullname.value.length > 2) &&
                (lastvisit.value !== '' && new Date(lastvisit.value) < new Date())) {
                return true
            } else {
                if (urgency.value === "0") {
                    urgency.classList.add('err-input')
                    if (urgency.nextElementSibling === null) {
                        urgency.after(errorurgency)
                    }
                }
                if (fullname.value.length < 2 || fullname.value.trim().split(' ').length < 2) {
                    fullname.classList.add('err-input')
                    if (fullname.nextElementSibling === null) {
                        fullname.after(errorfullname)
                    }

                }
                if (lastvisit.value === '' || new Date(lastvisit.value) > new Date()) {
                    lastvisit.classList.add('err-input')
                    if (lastvisit.nextElementSibling === null) {
                        lastvisit.after(errordate)
                    }

                }
            }
        }

        if (allDoctor[doctor.value] === 'Кардіолог') {
            const pressure = form.querySelector('.form-pressure');
            const index = form.querySelector('.form-index');
            const illness = form.querySelector('.form-illness');
            const age = form.querySelector('.form-age')
            if (urgency.value !== '0' &&
            (fullname.value.trim().split(' ').length >= 2 && fullname.value.length > 2) &&
                (pressure.value !== '' && Number(pressure.value) >= 50 && Number(pressure.value) <= 160) &&
                (index.value !== '' || +index.value > 5) &&
                (illness.value.length > 3) &&
                (age.value !== '' && Number(age.value) > 0)) {
                return true
            } else {
                if (urgency.value === "0") {
                    urgency.classList.add('err-input')
                    if (urgency.nextElementSibling === null) {
                        urgency.after(errorurgency)
                    }
                }
                if (fullname.value.length < 2 || fullname.value.trim().split(' ').length < 2) {
                    fullname.classList.add('err-input')
                    if (fullname.nextElementSibling === null) {
                        fullname.after(errorfullname)
                    }

                }
                if (pressure.value === '' || Number(pressure.value) < 50 || Number(pressure.value > 160)) {
                    pressure.classList.add('err-input')
                    if (pressure.nextElementSibling === null) {
                        pressure.after(errorpressure)
                    }
                }
                if (index.value === '' || +index.value <= 5) {
                    index.classList.add('err-input')
                    if (index.nextElementSibling === null) {
                        index.after(errorindex)
                    }
                }
                if (illness.value.length < 3) {
                    illness.classList.add('err-input')
                    if (illness.nextElementSibling === null) {
                        illness.after(errorillnes)
                    }
                }
                if (age.value === '' || Number(age.value) < 0) {
                    age.classList.add('err-input')
                    if (age.nextElementSibling === null) {
                        age.after(errorage)
                    }
                }
            }
        }

        if (allDoctor[doctor.value] === 'Терапевт') {
            const age = form.querySelector('.input-therapist')
            if (urgency.value !== '0' &&
            (fullname.value.trim().split(' ').length >= 2 && fullname.value.length > 2) &&
                (age.value !== '' && Number(age.value) > 0)) {
                return true
            } else {
                if (urgency.value === "0") {
                    urgency.classList.add('err-input')
                    if (urgency.nextElementSibling === null) {
                        urgency.after(errorurgency)
                    }
                }
                if (fullname.value.length < 2 || fullname.value.trim().split(' ').length < 2) {
                    fullname.classList.add('err-input')
                    if (fullname.nextElementSibling === null) {
                        fullname.after(errorfullname)
                    }

                }
                if (age.value === '' || Number(age.value) < 0) {
                    age.classList.add('err-input')
                    if (age.nextElementSibling === null) {
                        age.after(errorage)
                    }
                }
            }
        }
    } else {
        doctor.classList.add('err-input')
        if (doctor.nextElementSibling.id === 'fields') {
            doctor.after(errordoctor)
        }
        return false
    }
}

function crateTagErr(text) {
    const tag = document.createElement('div')
    tag.classList.add('mt-2', "text-danger", "input-err")
    tag.textContent = text
    return tag
}