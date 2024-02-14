("use strict");
import { deleteLastComment } from "./js/deleteLastComment.js";
import { fetchPromiseGet } from "./js/api.js";
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
