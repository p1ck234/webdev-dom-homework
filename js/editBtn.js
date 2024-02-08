export const handleEditClick = (index) => {
  const listElement = document.getElementById("list");

  const editButtonElements = document.querySelectorAll(".edit-button");
  const saveButtonElements = document.querySelectorAll(".save-button");
  editButtonElements[index].style.display = "none";
  saveButtonElements[index].style.display = "inline-block";

  const commentTextElement =
    listElement.getElementsByClassName("comment-text")[index];
  const currentText = commentTextElement.textContent.trim();
  const textareaElement = document.createElement("textarea");
  textareaElement.value = currentText;
  commentTextElement.innerHTML = "";
  commentTextElement.appendChild(textareaElement);
};

export const initEditButton = () => {
  const editButtonElements = document.querySelectorAll(".edit-button");
  editButtonElements.forEach((editButton, index) => {
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      handleEditClick(index);
    });
  });
};
