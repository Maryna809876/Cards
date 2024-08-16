export function filterSearch(e) {

    const list = document.querySelector('.list-card').children;

    [...list].forEach((el) => {

        if (el.textContent.toLowerCase().includes(e.toLowerCase())) {
            el.classList.remove('d-none')
        } else {
            el.classList.add('d-none')
        }
    })

}