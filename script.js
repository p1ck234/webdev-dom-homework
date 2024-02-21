("use strict");
import { deleteLastComment } from "./js/deleteLastComment.js";
import { fetchPromiseGet } from "./js/api.js";
import { renderComments } from "./js/renderComments.js";
import { addBtn } from "./js/addBtn.js";
import { renderLogin } from "./js/authpage.js";

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


let comments = [];

linkAuthElement.addEventListener("click", () => {
  listElement.classList.add('hidden');
  linkAuthTextElement.classList.add("hidden");
  renderLogin();
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
