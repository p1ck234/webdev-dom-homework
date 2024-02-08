("use strict");
import { formatDate } from "./js/formatDate.js";
import { deleteLastComment } from "./js/deleteLastComment.js";
import { fetchPromisePost } from "./js/api.js";
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
const fetchPromiseGet = () => {
  const fetchPromise = fetch(
    "https://wedev-api.sky.pro/api/v1/danil-vetrov/comments",
    {
      method: "get",
    }
  );

  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: formatDate(new Date(comment.date)),
          comment: comment.text,
          likes: comment.likes,
          isLike: false,
        };
      });
      comments = appComments;
      renderComments(comments);
    });
};

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
