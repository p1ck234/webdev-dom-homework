import { fetchPromisePost, fetchPromiseGet } from "./api.js";
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("input-name");
const commentInputElement = document.getElementById("comment-input");
function updateButtonState() {
  buttonElement.classList.remove("error__button");
  buttonElement.disabled =
    nameInputElement.value.trim() === "" ||
    commentInputElement.value.trim() === "";
  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");
}
export function addBtn() {
  const formElement = document.querySelector(".add-form");
  const formElementComment = document.querySelector("#add-form-loading");
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

      await fetchPromisePost(
        commentInputElement.value,
        nameInputElement.value
      ).then(() => {
        nameInputElement.value = "";
        commentInputElement.value = "";
      });
      fetchPromiseGet();
      formElement.classList.remove("hidden");
      formElementComment.classList.add("hidden");
    }
  });
}
