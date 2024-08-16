import { allDoctor } from '../config/variable.js';

class Visit {
  constructor({ id, reason, description, urgency, name, doctor, status }) {
    this.id = id
    this.reason = reason;
    this.description = description;
    this.urgency = urgency;
    this.name = name;
    this.doctor = doctor;
    this.status = status;
  }

  render() {
    this.butoonsCard = `
        <div class="d-flex justify-content-center gap-3">
        <button class=" btn btn-secondary card_show" type="button">Show more</button>
      </div>
      <div class="btns-edit gap-3 d-flex gap-2 " position-absolute top-1 en-1>
        <button class="btn-edit">
          <svg width="20" height="20" viewBox="0 0 1024 1024" fill="#000000" class="icon" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M574.4 590.4l-3.2 7.2 1.6 8L608 740.8l8 33.6 28-20L760 672l5.6-4 2.4-6.4 220-556.8 8.8-22.4-22.4-8.8-140-55.2-21.6-8-8.8 20.8-229.6 559.2z m244-528l140 55.2-13.6-30.4-220 556.8 8-10.4-116 82.4 36 13.6-33.6-135.2-0.8 15.2 229.6-560-29.6 12.8z"
                fill=""></path>
              <path
                d="M872 301.6l-107.2-40c-7.2-2.4-10.4-10.4-8-17.6l8-20.8c2.4-7.2 10.4-10.4 17.6-8l107.2 40c7.2 2.4 10.4 10.4 8 17.6l-8 20.8c-2.4 7.2-10.4 10.4-17.6 8zM718.4 645.6l-107.2-40c-7.2-2.4-10.4-10.4-8-17.6l8-20.8c2.4-7.2 10.4-10.4 17.6-8l107.2 40c7.2 2.4 10.4 10.4 8 17.6l-8 20.8c-2.4 7.2-10.4 10.4-17.6 8zM900.8 224l-107.2-40c-7.2-2.4-10.4-10.4-8-17.6l8-20.8c2.4-7.2 10.4-10.4 17.6-8l107.2 40c7.2 2.4 10.4 10.4 8 17.6l-8 20.8c-2.4 7.2-10.4 11.2-17.6 8z"
                fill=""></path>
              <path
                d="M930.4 965.6H80c-31.2 0-56-24.8-56-56V290.4c0-31.2 24.8-56 56-56h576c13.6 0 24 10.4 24 24s-10.4 24-24 24H80c-4 0-8 4-8 8v619.2c0 4 4 8 8 8h850.4c4 0 8-4 8-8V320c0-13.6 10.4-24 24-24s24 10.4 24 24v589.6c0 31.2-24.8 56-56 56z"
                fill=""></path>
              <path
                d="M366.4 490.4H201.6c-13.6 0-25.6-11.2-25.6-25.6 0-13.6 11.2-25.6 25.6-25.6h165.6c13.6 0 25.6 11.2 25.6 25.6-0.8 14.4-12 25.6-26.4 25.6zM409.6 584h-208c-13.6 0-25.6-11.2-25.6-25.6 0-13.6 11.2-25.6 25.6-25.6h208c13.6 0 25.6 11.2 25.6 25.6-0.8 14.4-12 25.6-25.6 25.6zM441.6 676.8h-240c-13.6 0-25.6-11.2-25.6-25.6 0-13.6 11.2-25.6 25.6-25.6h240c13.6 0 25.6 11.2 25.6 25.6-0.8 14.4-12 25.6-25.6 25.6z"
                fill=""></path>
            </g>
          </svg>
        </button>
        <button class="btn-remove">
          <svg width="20" height="20" viewBox="0 0 1024 1024" fill="#000000" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z"
                fill=""></path>
              <path
                d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z"
                fill=""></path>
            </g>
          </svg>
        </button>
      </div>
        `
    return this.butoonsCard
  }

  save() {
    localStorage.setItem('visit', JSON.stringify({
      type: this.constructor.name, // Сохраняем имя класса
      data: this
    }));
  }

  // Загрузка данных о визите из localStorage
  static load() {
    const visitData = JSON.parse(localStorage.getItem('visit'));
    if (visitData) {
      const visitClass = eval(visitData.type); // Получаем класс по его имени
      return new visitClass(...Object.values(visitData.data));
    }
    return null;
  }
}

class VisitDentist extends Visit {
  constructor({ id, reason, description, urgency, name, doctor, status, date }) {
    super({ id, reason, description, urgency, name, doctor, status })
    this.date = date;
  }
  render() {
    this.li = document.createElement('li')
    this.li.classList.add('item-card', 'item_card','draggable')
    this.li.setAttribute('data-id', `${this.id}`)
    this.li.setAttribute('data-urgency', `${this.urgency}`)
    this.li.setAttribute('data-status', `${(this.status) ? this.status : 'open'}`)
    this.li.innerHTML = `
          <div class="card_body card-body card_body ">
          <div class="row card-name">
            <p class="col">Name</p>
            <p class=" col fw-bold">${this.name}</p>
          </div>
          <div class="row card-doctor">
            <p class="col">Doctor</p>
            <p class="col fw-bold">${allDoctor[this.doctor]}</p>
          </div>
          <div class="card_hide d-none">
            <div class="row ">
              <p class="col">Urgency</p>
              <p class="col fw-bold">${this.urgency}</p>
            </div>
            <div class="row ">
              <p class="col">Дата останнього відвідування</p>
              <p class="col fw-bold">${this.date}</p>
            </div>
            <div class="row ">
              <p class="col">Meta visit</p>
              <p class="col">${this.reason}</p>
            </div>
            <div class="row ">
              <p class="col">Descripton</p>
              <p class="col card-desc ">${this.description}</p>
            </div>
          </div>
        </div>
        ${super.render()}
    `
    return this.li
  }
}

class VisitCardiologist extends Visit {
  constructor({ id, reason, description, urgency, name, doctor, status, pressure, index, illness, age }) {
    super({ id, reason, description, urgency, name, doctor, status })
    this.pressure = pressure;
    this.index = index;
    this.illness = illness;
    this.age = age;
  }
  render() {
    this.li = document.createElement('li')
    this.li.classList.add('item-card', 'item_card','draggable')
    this.li.setAttribute('data-id', `${this.id}`)
    this.li.setAttribute('data-urgency', `${this.urgency}`)
    this.li.setAttribute('data-status', `${(this.status) ? this.status : 'open'}`)
    this.li.innerHTML = `  <div class="card_body card-body card_body ">
          <div class="row card-name">
            <p class="col">Name</p>
            <p class=" col fw-bold">${this.name}</p>
          </div>
          <div class="row card-doctor">
            <p class="col">Doctor</p>
            <p class="col fw-bold">${allDoctor[this.doctor]}</p>
          </div>
          <div class="card_hide d-none">
            <div class="row ">
              <p class="col">${this.urgency}</p>
              <p class="col fw-bold">Low</p>
            </div>
            <div class="row ">
              <p class="col">Звичайний тиск</p>
              <p class="col fw-bold">${this.pressure}</p>
            </div>
            <div class="row ">
              <p class="col">Індекс маси тіла</p>
              <p class="col fw-bold">${this.index}</p>
            </div>
            <div class="row ">
              <p class="col">Перенесені захворювання серцево-судинної системи</p>
              <p class="col fw-bold">${this.illness}</p>
            </div>
            <div class="row ">
              <p class="col">Age</p>
              <p class="col fw-bold">${this.age}</p>
            </div>
            <div class="row ">
              <p class="col">Meta visit</p>
              <p class="col">${this.reason}</p>
            </div>
            <div class="row ">
              <p class="col">Descripton</p>
              <p class="col card-desc ">${this.description}</p>
            </div>
          </div>
        </div>
        ${super.render()}
      </li>
        `
    return this.li
  }
}

class VisitTherapist extends Visit {
  constructor({ id, reason, description, urgency, name, doctor, status, age }) {
    super({ id, reason, description, urgency, name, doctor, status })
    this.age = age;
  }
  render() {

    this.li = document.createElement('li')
    this.li.classList.add('item-card', 'item_card','draggable')
    this.li.setAttribute('data-id', `${this.id}`)
    this.li.setAttribute('data-urgency', `${this.urgency}`)
    this.li.setAttribute('data-status', `${(this.status) ? this.status : 'open'}`)
    this.li.innerHTML = `
      <div class="card_body card-body card_body">
          <div class="row card-name">
            <p class="col">Name</p>
            <p class=" col fw-bold">${this.name}</p>
          </div>
          <div class="row card-doctor">
            <p class="col">Doctor</p>
            <p class="col fw-bold">${allDoctor[this.doctor]}</p>
          </div>
          <div class="card_hide d-none">
            <div class="row ">
              <p class="col">Urgency</p>
              <p class="col fw-bold">${this.urgency}</p>
            </div>
            <div class="row ">
              <p class="col">Age</p>
              <p class="col fw-bold">${this.age}</p>
            </div>
            <div class="row ">
              <p class="col">Meta visit</p>
              <p class="col">${this.reason}</p>
            </div>
            <div class="row ">
              <p class="col">Descripton</p>
              <p class="col card-desc ">${this.description}</p>
            </div>
          </div>
        </div>
        ${super.render()}
      </li>
        `
    return this.li
  }
}


export { VisitDentist, VisitCardiologist, VisitTherapist }