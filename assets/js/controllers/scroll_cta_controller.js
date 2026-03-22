import { Controller } from "../stimulus.min.js"

export default class extends Controller {
  static targets = ["bar"]

  connect() {
    this.dismissed = false
    this.shown = false
    this.scrollHandler = () => this.checkScroll()
    window.addEventListener("scroll", this.scrollHandler, { passive: true })
  }

  disconnect() {
    window.removeEventListener("scroll", this.scrollHandler)
  }

  checkScroll() {
    if (this.dismissed || this.shown) return

    const scrolled = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const percent = docHeight > 0 ? scrolled / docHeight : 0

    if (percent >= 0.6) {
      this.show()
    }
  }

  show() {
    if (!this.hasBarTarget) return
    this.shown = true
    this.barTarget.classList.remove("hidden")
    this.barTarget.classList.add("flex")
  }

  dismiss() {
    if (!this.hasBarTarget) return
    this.dismissed = true
    this.barTarget.classList.add("hidden")
    this.barTarget.classList.remove("flex")
  }
}
