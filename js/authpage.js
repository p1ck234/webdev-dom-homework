import { setToken, fetchPromiseGet, fetchPromiseAuth } from "./api.js";
import { renderReg } from "./regpage.js";
export const renderLogin = (comments) => {
  const appElement = document.getElementById("app");
  const authHtml = ` <div id="add-form-auth" class="auth__form">
    <p class="auth__title">Форма входа</p>
    <input
      id="auth-login"
      class="auth__input"
      type="text"
      placeholder="Введите логин"
    />
    <input
      id="auth-password"
      class="auth__input"
      type="password"
      placeholder="Введите пароль"
    />
    <button id="auth-btn" class="add-form-button">Войти</button>
    <a href="#" id="reg-link" class="auth__link">Зарегистрироваться</a>
  </div>`;
  appElement.innerHTML = authHtml;

  // со страницы регистрации
  const regLinkElement = document.querySelector("#reg-link");
  const regFormElement = document.querySelector("#add-form-reg");

  // со страницы авторизации
  const authBtnElement = document.querySelector("#auth-btn");
  const authLoginElement = document.getElementById("auth-login");
  const authPassElement = document.getElementById("auth-password");
  const formAuthElement = document.querySelector("#add-form-auth");

  //   linkAuthElement.addEventListener("click", () => {
  //     commentsElement.classList.toggle("hidden");
  //     linkAuthTextElement.classList.toggle("hidden");
  //     formAuthElement.classList.remove("hidden");
  //     formAuthElement.classList.add("auth__form");
  //   });
  regLinkElement.addEventListener("click", () => {
    formAuthElement.classList.add("hidden");
    formAuthElement.classList.remove("auth__form");
    renderReg();
    // regFormElement.classList.remove("hidden");
    // regFormElement.classList.add("auth__form");
  });
  authBtnElement.addEventListener("click", () => {
    fetchPromiseAuth(authLoginElement.value, authPassElement.value);
  });
};
