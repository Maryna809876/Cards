// функція яка фільтрує список карток 
export function filterCard() {
    const urgency = document.querySelector('.filter-visit').value
    const status = document.querySelector('.filter-status').value

    const listCard = document.querySelectorAll('.item_card')

    if (status === '0' && urgency !== '0') {
        listCard.forEach((el) => {
            if (el.dataset.urgency === urgency) {
                el.classList.remove('d-none')
            } else {
                el.classList.add('d-none')
            }
        })
    } else if (urgency === '0' && status !== '0') {
        listCard.forEach((el) => {
            if (el.dataset.status === status) {
                el.classList.remove('d-none')
            } else {
                el.classList.add('d-none')
            }
        })
    } else if (status !== '0' && urgency !== '0') {
        listCard.forEach((el) => {
            if (el.dataset.urgency === urgency && el.dataset.status === status) {
                el.classList.remove('d-none')
            } else {
                el.classList.add('d-none')
            }
        })
    } else if (status === '0' && urgency === '0') {
        listCard.forEach((el) => el.classList.remove('d-none'))
    }

}

