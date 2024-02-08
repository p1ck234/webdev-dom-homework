import { initLikeButton } from "./LikeBtn.js";
import { handleSaveClick, initSaveButton } from "./saveBtn.js";
import { handleEditClick, initEditButton } from "./editBtn.js";
import { initReplyButton } from "./replyBtn.js";


export const renderComments = (comments) => {
  const listElement = document.getElementById("list");

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
  initLikeButton(comments);
  initSaveButton(comments);
  initEditButton();
  initReplyButton(comments);
};
