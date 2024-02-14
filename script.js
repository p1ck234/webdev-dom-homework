("use strict");
import { deleteLastComment } from "./js/deleteLastComment.js";
import { fetchPromiseGet, setToken } from "./js/api.js";
import { renderComments } from "./js/renderComments.js";
import { addBtn } from "./js/addBtn.js";

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonElement.click();
  }
}

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("input-name");
const commentInputElement = document.getElementById("comment-input");
const deleteLastButton = document.getElementById("delete-last-button");
const linkAuthElement = document.querySelector(".link-auth");
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
const authBtnElement = document.querySelector("#auth-btn");
const authLoginElement = document.getElementById("auth-login");
const authPassElement = document.getElementById("auth-password");

const formAddElement = document.querySelector("#add-form");

let comments = [];

linkAuthElement.addEventListener("click", () => {
  commentsElement.classList.toggle("hidden");
  linkAuthTextElement.classList.toggle("hidden");
  formAuthElement.classList.remove("hidden");
  formAuthElement.classList.add("auth__form");

  regLinkElement.addEventListener("click", () => {
    formAuthElement.classList.add("hidden");
    formAuthElement.classList.remove("auth__form");
    regFormElement.classList.remove("hidden");
    regFormElement.classList.add("auth__form");
  });
  authFormElement.addEventListener("click", () => {
    regFormElement.classList.add("hidden");
    regFormElement.classList.remove("auth__form");
    formAuthElement.classList.remove("hidden");
    formAuthElement.classList.add("auth__form");
  });
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

fetchPromiseGet(comments);
renderComments(comments);

document.addEventListener("DOMContentLoaded", async () => {
  listElement.innerHTML = "<p>Загрузка данных...</p>";
  await fetchPromiseGet();
});

nameInputElement.addEventListener("keypress", handleKeyPress);
commentInputElement.addEventListener("keypress", handleKeyPress);
buttonElement.addEventListener("keypress", handleKeyPress);
deleteLastButton.addEventListener("click", deleteLastComment);

addBtn();
console.log("It works!");
