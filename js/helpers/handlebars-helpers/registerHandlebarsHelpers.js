import { registerIsGmHelper } from "./registerIsGmHelper.js";
import { registerJsonHelper } from "./registerJsonHelper.js";
import { registerLinkedObjectsHelper } from "./registerLinkedObjectsHelper.js";
import { registerNotEqHelper } from "./registerNotEqHelper.js";
import { registerObjectHelper } from "./registerObjectHelper.js";
import { registerParticipantPortraitHelper } from "./registerParticipantPortraitHelper.js";
import { registerPortraitParamsObjectHelper } from "./registerPortraitParamsObjectHelper.js";
import { registerRenderMinimizeButtonHelper } from "./registerRenderMinimizeButtonHelper.js";
import { registerSwitchHelper } from "./registerSwitchHelper.js";

/**
 * Function that registers all the custom Handlebars helpers which are used inside the templates
 */
export function registerHandlebarsHelpers() {
  // (isGm) helper — used by sidebar templates. Was a Foundry built-in in v13; gone in v14.
  registerIsGmHelper();
  registerJsonHelper();
  registerLinkedObjectsHelper();
  registerNotEqHelper();
  registerObjectHelper();
  registerParticipantPortraitHelper();
  registerPortraitParamsObjectHelper();
  registerRenderMinimizeButtonHelper();
  registerSwitchHelper();
}
