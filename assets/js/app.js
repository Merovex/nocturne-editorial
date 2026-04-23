import { Application } from '/assets/js/stimulus.min.js';
import ThemeController from '/assets/js/controllers/theme_controller.js';
import NavController from '/assets/js/controllers/nav_controller.js';
import NewsletterController from '/assets/js/controllers/newsletter_controller.js';
import ScrollCtaController from '/assets/js/controllers/scroll_cta_controller.js';
import MagnetFilterController from '/assets/js/controllers/magnet_filter_controller.js';

window.Stimulus = Application.start();

window.Stimulus.register("theme", ThemeController);
window.Stimulus.register("nav", NavController);
window.Stimulus.register("newsletter", NewsletterController);
window.Stimulus.register("scroll-cta", ScrollCtaController);
window.Stimulus.register("magnet-filter", MagnetFilterController);