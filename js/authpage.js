import { setToken, fetchPromiseGet } from "./api.js";
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
  const linkAuthElement = document.querySelector(".link-auth");
  const commentsElement = document.querySelector(".comments");
  const linkAuthTextElement = document.querySelector(".link-text");
  const formAddElement = document.querySelector("#add-form");
  const nameInputElement = document.getElementById("input-name");

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
    const fetchPromise = fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "post",
      body: JSON.stringify({
        login: authLoginElement.value,
        password: authPassElement.value,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setToken(responseData.user.token);
        fetchPromiseGet(comments);
        commentsElement.classList.toggle("hidden");
        formAuthElement.classList.remove("auth__form");
        formAuthElement.classList.add("hidden");
        formAddElement.classList.add("add-form");
        formAddElement.classList.remove("hidden");
        nameInputElement.value = responseData.user.name;
        nameInputElement.disabled = true;
      });
  });
};
