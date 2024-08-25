import { editCard, getCard } from "./sendRequest.js";

export function showCard(objHtml, TOKEN) {
    const cardBody = objHtml.querySelector('.card_body')
    const cardHideBody = objHtml.querySelector('.card_hide')

    document.querySelector('.main').insertAdjacentHTML('afterend', `
       <div class="card-open">
                ${cardBody.innerHTML}
                ${cardHideBody.innerHTML}
            <div class="d-flex justify-content-center gap-3">
                <button type="button" class="btn btn-light  card-close">Х</button>
                <button class=" btn btn-danger card_done" type="button">Done</button>
            </div>
        </div>
        <div class="card-backdrop opacity-25"></div>`);

    if (objHtml.dataset.status === 'done') {
        document.querySelector('.card-open').classList.add('card-done')
    }

    document.querySelector('.card-open').addEventListener('click', (e) => {
        if (e.target.classList.contains('card-close')) {
            e.target.closest('.card-open').remove()
            document.querySelector('.card-backdrop').remove()
        }
        if (e.target.classList.contains('card_done')) {
            e.target.closest('.card-open').classList.add('card-done')
            if (objHtml.dataset.status === 'open') {
                const id = objHtml.dataset.id
                const cardAddDone = getCard(id, TOKEN)
                cardAddDone.then((data) => {
                    data.status = 'done'
                    const cardEdit = editCard(id, TOKEN, data)
                    cardEdit.then((data) => {
                        if (data.status === 'done') {
                            objHtml.dataset.status = 'done'
                        }
                    })
                })



            }
        }


    })
} 