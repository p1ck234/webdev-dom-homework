import { fetchPromisePost } from "./api.js";
import { renderComments } from "./renderComments.js";

const handleSaveClick = (index, comments) => {
  const listElement = document.getElementById("list");

  const textareaElement = listElement.querySelector(".comment textarea");
  const editedText = textareaElement.value;

  comments[index].comment = editedText;
  renderComments(comments);
};

export const initSaveButton = (comments) => {
  const saveButtonElements = document.querySelectorAll(".save-button");
  saveButtonElements.forEach((saveButton, index) => {
    saveButton.addEventListener("click", (event) => {
      event.stopPropagation();
      handleSaveClick(index, comments);
    });
  });
};
