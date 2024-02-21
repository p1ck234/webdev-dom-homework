import { renderLogin } from "./authpage.js";
import { fetchPromiseReg } from "./api.js";

export const renderReg = () => {
  const appElement = document.getElementById("app");
  const regHtml = `<div id="add-form-reg" class="auth__form">
    <p class="auth__title">Форма регистрации</p>
    <input
      id="reg-name"
      class="auth__input"
      type="text"
      placeholder="Введите имя"
    />
    <input
      id="reg-login"
      class="auth__input"
      type="text"
      placeholder="Введите логин"
    />
    <input
      id="reg-password"
      class="auth__input"
      type="password"
      placeholder="Введите пароль"
    />
    <button id="reg-btn" class="add-form-button">Зарегистрироваться</button>
    <a href="#" id="link-authfromreg" class="auth__link">Войти</a>
  </div>`;

  appElement.innerHTML = regHtml;

  const regFormElement = document.querySelector("#add-form-reg");
  const authFormElement = document.querySelector("#link-authfromreg");
  const regBtnElement = document.querySelector("#reg-btn");
  const regLoginElement = document.querySelector("#reg-login");
  const regNameElement = document.querySelector("#reg-name");
  const regPassElement = document.querySelector("#reg-password");

  authFormElement.addEventListener("click", () => {
    regFormElement.classList.add("hidden");
    renderLogin();
  });

  regBtnElement.addEventListener("click", () => {
    fetchPromiseReg(
      regNameElement.value,
      regLoginElement.value,
      regPassElement.value
    );
  });
};
