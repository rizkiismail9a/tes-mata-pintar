import { defineRule } from "vee-validate";

export default defineNuxtPlugin(() => {
  defineRule("required", (value, [field]) => {
    if (!value || !value.length) {
      return `${field} tidak boleh kosong`;
    }
    return true;
  });

  defineRule("min", (value, [limit, field]) => {
    if (value.length < limit) {
      return `${field} tidak boleh kurang dari ${limit} karakter`;
    }

    return true;
  });

  defineRule("email", (value) => {
    if (!/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/.test(value)) {
      return "email tidak valid";
    }

    return true;
  });

  defineRule("confirmPass", (value, [pass]) => {
    if (value !== pass) {
      return "konfirmasi kata sandi tidak sama";
    }

    return true;
  });
});
