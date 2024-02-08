("use strict");
import { formatDate } from "./js/formatDate.js";
import { deleteLastComment } from "./js/deleteLastComment.js";
import { fetchPromisePost, fetchPromiseGet } from "./js/api.js";
import { renderComments } from "./js/renderComments.js";
import {} from "./js/addBtn.js";

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonElement.click();
  }
}
function updateButtonState() {
  buttonElement.classList.remove("error__button");
  buttonElement.disabled =
    nameInputElement.value.trim() === "" ||
    commentInputElement.value.trim() === "";
  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");
}

const buttonElement = document.getElementById("add-button");
const likeButton = document.getElementById("like_button");
const listElement = document.getElementById("list");
const formElement = document.querySelector(".add-form");
const formElementComment = document.querySelector("#add-form-loading");
const nameInputElement = document.getElementById("input-name");
const commentInputElement = document.getElementById("comment-input");
const deleteLastButton = document.getElementById("delete-last-button");

let comments = [];
fetchPromiseGet(comments);

document.addEventListener("DOMContentLoaded", async () => {
  listElement.innerHTML = "<p>Загрузка данных...</p>";
  await fetchPromiseGet();
});

nameInputElement.addEventListener("keypress", handleKeyPress);
commentInputElement.addEventListener("keypress", handleKeyPress);
buttonElement.addEventListener("keypress", handleKeyPress);
deleteLastButton.addEventListener("click", deleteLastComment);

buttonElement.addEventListener("click", async () => {
  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");
  buttonElement.classList.remove("error__button");

  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    buttonElement.classList.add("error__button");
    nameInputElement.addEventListener("input", updateButtonState);
    return;
  } else if (commentInputElement.value === "") {
    commentInputElement.classList.add("error");
    buttonElement.classList.add("error__button");
    commentInputElement.addEventListener("input", updateButtonState);
  } else {
    formElement.classList.add("hidden");
    formElementComment.classList.remove("hidden");

    await fetchPromisePost(commentInputElement.value, nameInputElement.value);
    fetchPromiseGet();
    formElement.classList.remove("hidden");
    formElementComment.classList.add("hidden");
  }
});
console.log("It works!");
