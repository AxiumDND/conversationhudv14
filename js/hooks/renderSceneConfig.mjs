import { MODULE_NAME } from "../constants/index.js";
import { ModuleSettings } from "../settings.js";

/**
  [TODO: Add JSDoc]
**/
export const registerHook = () => {
  // Hook that injects CHUD fields into the scene configuration sheet
  Hooks.on("renderSceneConfig", async (app, html, data) => {
    if (game.settings.get(MODULE_NAME, ModuleSettings.enableSceneConversations)) {
      // TODO: Use proper sheet class from constants
      const conversations = game.journal.filter(
        (entry) => foundry.utils.getProperty(entry, "flags.conversationhudv14.type") === "conversation-sheet"
      );

      const linkedConversation = data.document["flags"]["conversationhudv14"]?.sceneConversation;
      const sceneConversationVisibilityOff = data.document["flags"]["conversationhudv14"]?.sceneConversationVisibilityOff;

      const renderedHtml = await foundry.applications.handlebars.renderTemplate(
        "modules/conversationhudv14/templates/fragments/scene-conversation-data.hbs",
        {
          conversations: conversations,
          linkedConversation: linkedConversation,
          sceneConversationVisibilityOff: sceneConversationVisibilityOff,
        }
      );

      const target = html.querySelector('div[data-tab="ambience"] > div[data-tab="basic"] > fieldset:last-of-type');
      if (target) {
        target.insertAdjacentHTML("afterend", renderedHtml);
      }

      app.setPosition({ height: "auto" });
    }
  });
};
