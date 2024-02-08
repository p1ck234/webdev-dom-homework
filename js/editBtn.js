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

export const initReplyButton = () => {
  const commentsElements = document.querySelectorAll(".comment");
  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", (event) => {
      const indexComment = commentElement.dataset.index;
      const curruntComment = comments[indexComment].comment;
      const curruntName = comments[indexComment].name;
      commentInputElement.value = `${curruntComment}\n${curruntName} - `;
    });
  }
};
