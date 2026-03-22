import { Controller } from "../stimulus.min.js"

export default class extends Controller {
  connect() {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    this.setTheme(savedTheme)
  }

  toggle(event) {
    const newTheme = event.target.checked ? 'light' : 'dark'
    this.setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  setTheme(theme) {
    document.documentElement.dataset.theme = theme
    const toggleInput = document.querySelector('.theme-toggle-input')
    if (toggleInput) {
      toggleInput.checked = theme === 'light'
    }
  }
}
