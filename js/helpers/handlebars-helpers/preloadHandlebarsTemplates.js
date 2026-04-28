/**
 * Function that registers all the custom Handlebars helpers which are used inside the templates
 */
export function preloadHandlebarsTemplates() {
  const templates = [
    // TODO: Re-order modules to be arranged in the order they are presented by the system file-viewer
    "modules/conversationhudv14/templates/sheets/conversation-sheet/content/gm-controlled-sheet-content.hbs",

    "modules/conversationhudv14/templates/forms/content/collective-conversation-creation-form-content.hbs",
    "modules/conversationhudv14/templates/forms/content/gm-controlled-conversation-creation-form-content.hbs",

    "modules/conversationhudv14/templates/sidebar/participant.hbs",

    "modules/conversationhudv14/templates/fragments/conversation-participant-data.hbs",
    "modules/conversationhudv14/templates/fragments/conversation-participants-list.hbs",
    "modules/conversationhudv14/templates/fragments/faction-data.hbs",
    "modules/conversationhudv14/templates/fragments/active-participant-content.hbs",

    "modules/conversationhudv14/templates/fragments/participating-users-list.hbs",

    "modules/conversationhudv14/templates/fragments/selectable-participant-entry.hbs",
    "modules/conversationhudv14/templates/fragments/gm-controlled-conversation/active-conversation-participant-list-entry.hbs",

    "modules/conversationhudv14/templates/fragments/faction-banner-shape.hbs",
    "modules/conversationhudv14/templates/fragments/faction-banner.hbs",

    "modules/conversationhudv14/templates/banner-shapes/shape-1.hbs",
    "modules/conversationhudv14/templates/banner-shapes/shape-2.hbs",
    "modules/conversationhudv14/templates/banner-shapes/shape-3.hbs",
    "modules/conversationhudv14/templates/banner-shapes/shape-4.hbs",
    "modules/conversationhudv14/templates/banner-shapes/shape-5.hbs",
    "modules/conversationhudv14/templates/banner-shapes/shape-6.hbs",
  ];

  return foundry.applications.handlebars.loadTemplates(templates);
}
