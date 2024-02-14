import { formatDate } from "./formatDate.js";
import { renderComments } from "./renderComments.js";

const sanitizeHtml = (htmlString) => {
  return htmlString
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
};
let token;
export const setToken = (newToken) => {
  token = newToken;
};
export const fetchPromisePost = async (textValue) => {
  const fetchPromise = await fetch(
    "https://wedev-api.sky.pro/api/v2/danil-vetrov/comments",
    {
      method: "post",
      body: JSON.stringify({
        text: sanitizeHtml(textValue),

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }
  )
    .then((response) => {
      if (response.status === 201) {
        return response;
      } else if (response.status === 400) {
        console.log(response.status);
        throw new Error("ошибка 400");
      } else if (response.status === 500) {
        throw new Error("ошибка 500");
      }
    })
    .catch((error) => {
      if (error.message === "ошибка 400") {
        alert("Имя и комментарий должны быть не короче 3 символов");
      } else if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
      } else if (error.message === "ошибка 500") {
        alert("Что-то пошло не так, мы пытаемся переотправить ваш запрос");
        fetchPromisePost(textValue);
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    });
};
export const fetchPromiseGet = (comments) => {
  const fetchPromise = fetch(
    "https://wedev-api.sky.pro/api/v2/danil-vetrov/comments",
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
