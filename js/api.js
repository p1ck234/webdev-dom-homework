import { formatDate } from "./formatDate.js";
import { renderComments } from "./renderComments.js";

const sanitizeHtml = (htmlString) => {
  return htmlString
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
};
export const fetchPromisePost = async (textValue, nameValue) => {
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
      if (response.status === 201) {
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
export const fetchPromiseGet = (comments) => {
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
