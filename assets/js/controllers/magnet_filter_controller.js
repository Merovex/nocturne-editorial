import { Controller } from "../stimulus.min.js"

export default class extends Controller {
  static targets = ["magnet"]

  connect() {
    const audience = new URLSearchParams(window.location.search).get("audience")
    if (!audience) return
    this.magnetTargets.forEach(el => {
      const tag = el.dataset.audienceTag
      if (tag && tag !== audience) el.style.display = "none"
    })
  }
}