import { renderLogin } from "./authpage.js";
import { setToken, fetchPromiseGet } from "./api.js";

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

  const linkAuthTextElement = document.querySelector(".link-text");
  const commentsElement = document.querySelector(".comments");
  const formAuthElement = document.querySelector("#add-form-auth");
  const regLinkElement = document.querySelector("#reg-link");
  const regFormElement = document.querySelector("#add-form-reg");
  const authFormElement = document.querySelector("#link-authfromreg");

  const regBtnElement = document.querySelector("#reg-btn");
  const regLoginElement = document.querySelector("#reg-login");
  const regNameElement = document.querySelector("#reg-name");
  const regPassElement = document.querySelector("#reg-password");

  const formAddElement = document.querySelector("#add-form");

  authFormElement.addEventListener("click", () => {
    regFormElement.classList.add("hidden");
    renderLogin();
    // formAuthElement.classList.remove("hidden");
    // formAuthElement.classList.add("auth__form");
  });

  regBtnElement.addEventListener("click", () => {
    const fetchPromise = fetch("https://wedev-api.sky.pro/api/user", {
      method: "post",
      body: JSON.stringify({
        login: regLoginElement.value,
        name: regNameElement.value,
        password: regPassElement.value,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response;
        } else if (response.status === 400) {
          throw new Error("ошибка 400");
        }
      })
      .then((responseData) => {
        alert("Вы успешно зарегистрировались.");
        regLoginElement.value = "";
        regNameElement.value = "";
        regPassElement.value = "";
        
      })
      .catch((error) => {
        if (error.message === "ошибка 400") {
          alert("Пользователь с такими данными уже есть, попробуйте снова");
        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      });
  });
};
