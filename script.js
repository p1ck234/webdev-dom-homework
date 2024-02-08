("use strict");
import { formatDate } from "./js/formatDate.js";
import { sanitizeHtml } from "./js/sanitizeHtml.js";
import { deleteLastComment } from "./js/deleteLastComment.js";
import { handleEditClick, initEditButton } from "./js/editBtn.js";
import {} from "./js/addBtn.js";

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonElement.click();
  }
}
function updateButtonState() {
  buttonElement.classList.remove("error__button");
  addButton.disabled =
    nameInputElement.value.trim() === "" ||
    commentInputElement.value.trim() === "";
}

const handleSaveClick = (index) => {
  const textareaElement = listElement.querySelector(".comment textarea");
  const editedText = textareaElement.value;

  comments[index].comment = editedText;
  fetchPromisePost(comments[index].comment, comments[index].name);
  renderComments();
};

const initLikeButton = () => {
  const likeButtonsElements = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtonsElements) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButton.dataset.index;
      likeButton.classList.add("-loading-like");

      delay(2000).then(() => {
        if (comments[index].isLike === false) {
          likeButton.classList.add("-active-like");
          comments[index].isLike = true;
          comments[index].likes++;
        } else {
          likeButton.classList.remove("-active-like");
          comments[index].isLike = false;
          comments[index].likes--;
        }
        likeButton.classList.remove("-loading-like");
        const likesCounter =
          likeButton.parentNode.querySelector(".likes-counter");
        likesCounter.textContent = comments[index].likes;
      });
    });
  }
};

 const initReplyButton = () => {
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
const initSaveButton = () => {
  const saveButtonElements = document.querySelectorAll(".save-button");
  saveButtonElements.forEach((saveButton, index) => {
    saveButton.addEventListener("click", (event) => {
      event.stopPropagation();
      handleSaveClick(index);
    });
  });
};

const renderComments = () => {
  const commnetsHTML = comments
    .map((comment, index) => {
      if (comment.isLike === false) {
        return `<li class="comment" data-index="${index}">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text"">
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
        return `<li class="comment" data-index="${index}">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text"">
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
  initSaveButton();
  initEditButton();
  initReplyButton();
};

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
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
      renderComments();
    });
};
const fetchPromisePost = async (textValue, nameValue) => {
  const fetchPromise = await fetch(
    "https://wedev-api.sky.pro/api/v1/danil-vetrov/comments",
    {
      method: "post",
      body: JSON.stringify({
        text: sanitizeHtml(textValue),
        name: sanitizeHtml(nameValue),
        forceError: true,
      }),
    }
  )
    .then((response) => {
      if (response.status === 200) {
        return response;
      } else if (response.status === 400) {
        console.log(response.status);
        throw new Error("Имя и комментарий должны быть не короче 3 символов");
      } else if (response.status === 500) {
        fetchPromisePost(textValue, nameValue);
      }
    })
    .then(() => {
      nameInputElement.value = "";
      commentInputElement.value = "";
    })
    .catch((error) => {
      if (
        error.message === "Имя и комментарий должны быть не короче 3 символов"
      ) {
        alert("Имя и комментарий должны быть не короче 3 символов");
      } else if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
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
