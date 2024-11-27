// import { email } from "@vee-validate/rules";
import { email } from "@vee-validate/rules";
import { defineRule } from "vee-validate";

export default defineNuxtPlugin(() => {
  defineRule("required", (value, [field]) => {
    if (!value || !value.length) {
      return `${field} tidak boleh kosong`;
    }
    return true;
  });

  defineRule("email", email);
});
