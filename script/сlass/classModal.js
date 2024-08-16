export class Modal {
    // загальний клас модалок 
    constructor(title, body) {
        this.title = title;
        this.body = body;
    }
    render() {
        // метод який формує шарку модалки 
        this.headerModal = document.createElement('div');
        this.headerModal.classList.add('modal');
        this.headerModal.setAttribute('id', "loginModal");
        this.headerModal.setAttribute('tabindex', "-1");
        this.headerModal.setAttribute('role', "dialog");
        this.headerModal.setAttribute('aria-labelledby', "loginModalLabel");
        this.headerModal.setAttribute('aria-hidden', "true");
        this.headerModal.style.display = 'block';
        this.headerModal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="loginModalLabel">${this.title}</h5>
                  <button type="button" class="btn-close btn_close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                 ${this.body}
                </div>
                 <p class="error">Incorrect username or password</p>
                </div>
            </div>
        `
        this.closeModalEvent()
        this.renderBackdroup()
        return this.headerModal
    }

    closeModal() {
        // метод який видаляє форму входу і блок фона backdrop
        this.headerModal.remove();
        this.backdrop.remove();
    }

    renderBackdroup() {
        // метод  який формує блок backdrop
        this.backdrop = document.createElement('div');
        this.backdrop.classList.add('modal-backdrop', 'opacity-25');
        document.querySelector('.main').after(this.backdrop)
    }

    closeModalEvent() {
        document.body.addEventListener('click', (e) => {
            const modal = e.target.classList.contains("modal");
            const close = e.target.classList.contains("btn_close");
            if (modal || close) {
                this.closeModal()
            }
        })
    }
}

