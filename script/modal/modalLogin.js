import { Modal } from '../сlass/classModal.js'

export class ModalLogin extends Modal {
  constructor(title = "Authorization") {
    super(title)
    this.body = `
      <form id="loginForm">
        <div class="form-group">
          <label for="email" class="form-group-label">Email</label>
          <input type="email" class="form-control" id="email" placeholder="Введите email">
        </div>
        <div class="form-group">
          <label for="password" class="form-group-label">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Введите пароль">
        </div>
          <button type="submit" class="btn btn-primary" id="Authorization">Log in</button>
      </form>
       `
  }
  renderAuth() {
    this.formModalAuth = super.render()
    return this.formModalAuth
  }
}