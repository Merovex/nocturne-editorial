import { Controller } from "../stimulus.min.js"

export default class extends Controller {
  static targets = ["email", "success", "tag", "metadataSource"]
  static values = {
    audienceTag: String,
    sourceTag: String,
    allowedAudienceTags: { type: Array, default: [] },
    allowedSourceTags: { type: Array, default: [] }
  }

  connect() {
    this.applyTags()
    this.element.addEventListener("submit", this.pruneEmpty.bind(this))
    if (localStorage.getItem("newsletter_subscribed")) {
      this.showSuccess()
    }
  }

  applyTags() {
    if (!this.hasTagTarget) return
    const params = new URLSearchParams(window.location.search)

    const audience = this.pick(params.get("audience"), this.allowedAudienceTagsValue, this.audienceTagValue)
    const source = this.pick(params.get("source"), this.allowedSourceTagsValue, this.sourceTagValue)

    this.tagTarget.value = [audience, source].filter(Boolean).join(",")

    const urlSource = params.get("source")
    if (this.hasMetadataSourceTarget && urlSource && this.valid(urlSource, this.allowedSourceTagsValue)) {
      this.metadataSourceTarget.value = `url:${urlSource}`
    }
  }

  pick(urlValue, allowlist, fallback) {
    return this.valid(urlValue, allowlist) ? urlValue : (fallback || "")
  }

  valid(value, allowlist) {
    if (!value) return false
    return allowlist.length === 0 || allowlist.includes(value)
  }

  pruneEmpty() {
    for (const input of this.element.querySelectorAll('input[type="hidden"]')) {
      if (input.value === "") input.disabled = true
    }
  }

  submit() {
    setTimeout(() => {
      localStorage.setItem("newsletter_subscribed", "true")
      this.showSuccess()
    }, 1000)
  }

  showSuccess() {
    if (this.hasSuccessTarget) {
      this.successTarget.style.display = "block"
      this.element.querySelector("form").style.display = "none"
    }
  }
}