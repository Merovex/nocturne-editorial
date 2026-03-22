import { Controller } from "../stimulus.min.js"

export default class extends Controller {
  static targets = ["mobile", "hamburger"]

  toggle() {
    const isOpen = document.body.classList.toggle("nav-open")
    if (this.hasHamburgerTarget) {
      this.hamburgerTarget.setAttribute("aria-expanded", isOpen)
    }
  }

  close() {
    document.body.classList.remove("nav-open")
    if (this.hasHamburgerTarget) {
      this.hamburgerTarget.setAttribute("aria-expanded", "false")
    }
  }
}
