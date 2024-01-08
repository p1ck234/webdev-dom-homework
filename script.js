"use strict";
function formatDate(date) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear().toString().slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const formattedDate =
    day + "." + month + "." + year + " " + hours + ":" + minutes;

  return formattedDate;
}

function updateButtonState() {
  buttonElement.classList.remove("error__button");
  addButton.disabled =
    nameInputElement.value.trim() === "" ||
    commentInputElement.value.trim() === "";
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();

    buttonElement.click();
  }
}

function deleteLastComment() {
  const comments = listElement.getElementsByClassName("comment");

  // Проверяем, есть ли комментарии для удаления
  if (comments.length > 0) {
    // Удаляем последний комментарий
    const lastComment = comments[comments.length - 1];
    listElement.removeChild(lastComment);
  }
}

const renderComments = () => {
  const commnetsHTML = comments
    .map((comment, index) => {
      if (comment.isLike === false) {
        return `<li class="comment">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${comment.comment}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button id="like_button" data-index="${index}" class="like-button"></button>
              </div>
            </div>
            <button id="edit_button" data-index="${index}" class="add-form-button edit-button">Редактировать</button>
            <button id="save_button" data-index="${index}" class="add-form-button save-button">Сохранить</button>
          </li>`;
      } else {
        return `<li class="comment">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${comment.comment}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button id="like_button" data-index="${index}" class="like-button -active-like"></button>
              </div>
            </div>
            <button id="edit_button" data-index="${index}" class="add-form-button edit-button">Редактировать</button>
            <button id="save_button" data-index="${index}" class="add-form-button save-button">Сохранить</button>
            </li>`;
      }
    })
    .join("");
  listElement.innerHTML = commnetsHTML;
  initLikeButton();
};

const initLikeButton = () => {
  const likeButtonsElements = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtonsElements) {
    likeButton.addEventListener("click", () => {
      const index = likeButton.dataset.index;
      if (comments[index].isLike === false) {
        comments[index].isLike = true;
        comments[index].likes++;
        likeButton.classList.add("-active-like");
      } else {
        comments[index].isLike = false;
        likeButton.classList.remove("-active-like");
        comments[index].likes--;
      }
      const likesCounter =
        likeButton.parentNode.querySelector(".likes-counter");
      likesCounter.textContent = comments[index].likes;
    });
  }
};
const buttonElement = document.getElementById("add-button");
const likeButton = document.getElementById("like_button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("input-name");
const commentInputElement = document.getElementById("comment-input");
const deleteLastButton = document.getElementById("delete-last-button"); // Новая кнопка
let date = new Date();
let today = formatDate(date);

let comments = [
  {
    name: "Глеб Фокин",
    comment: "Это будет первый комментарий на этой странице",
    likes: 3,
    isLike: true,
    date: "12.02.22 12:18",
  },
  {
    name: "Варвара Н.",
    comment: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    isLike: false,
    date: "13.02.22 19:22",
  },
];
renderComments();

document.getElementsByClassName("add-form-text");
nameInputElement.addEventListener("keypress", handleKeyPress);
commentInputElement.addEventListener("keypress", handleKeyPress);
buttonElement.addEventListener("keypress", handleKeyPress);
deleteLastButton.addEventListener("click", deleteLastComment);

const editButtonElements = document.querySelectorAll(".edit-button");
const saveButtonElements = document.querySelectorAll(".save-button");

const handleEditClick = (index) => {
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

const handleSaveClick = (index) => {
  const textareaElement = listElement.querySelector(".comment textarea");
  const editedText = textareaElement.value;

  comments[index].comment = editedText;

  renderComments();
};

editButtonElements.forEach((editButton, index) => {
  editButton.addEventListener("click", () => handleEditClick(index));
});

saveButtonElements.forEach((saveButton, index) => {
  saveButton.addEventListener("click", () => handleSaveClick(index));
});

buttonElement.addEventListener("click", () => {
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
    comments.push({
      name: nameInputElement.value,
      comment: commentInputElement.value,
      likes: 0,
      isLike: false,
      date: today,
    });
    nameInputElement.value = "";
    commentInputElement.value = "";
    renderComments();
  }
});
console.log("It works!");