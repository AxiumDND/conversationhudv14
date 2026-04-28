export function registerIsGmHelper() {
  Handlebars.registerHelper("isGm", () => game.user.isGM);
}
