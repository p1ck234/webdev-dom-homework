import { renderComments } from "./renderComments.js";
import { format } from "date-fns";

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
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: sanitizeHtml(textValue),
      }),
    }
  )
    .then((response) => {
      if (response.status === 201) {
        return response;
      } else if (response.status === 400) {
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
          date: format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss"),
          comment: comment.text,
          likes: comment.likes,
          isLike: false,
        };
      });
      comments = appComments;
      renderComments(comments);
    });
};
export const fetchPromiseAuth = (valueLogin, valuePassword) => {
  const commentsElement = document.querySelector(".comments");
  const formAddElement = document.querySelector("#add-form");
  const nameInputElement = document.getElementById("input-name");
  const formAuthElement = document.querySelector("#add-form-auth");

  const fetchPromise = fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "post",
    body: JSON.stringify({
      login: valueLogin,
      password: valuePassword,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response;
      } else if (response.status === 400) {
        throw new Error("ошибка 400");
      }
      console.log(response);
    })
    .then((response) => {
      return response.json();
    })

    .then((responseData) => {
      setToken(responseData.user.token);
      fetchPromiseGet();
      commentsElement.classList.toggle("hidden");
      formAuthElement.classList.remove("auth__form");
      formAuthElement.classList.add("hidden");
      formAddElement.classList.add("add-form");
      formAddElement.classList.remove("hidden");
      nameInputElement.value = responseData.user.name;
      nameInputElement.disabled = true;
    })
    .catch((error) => {
      if (error.message === "ошибка 400") {
        alert("Неправильный логин или пароль");
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    });
};

export const fetchPromiseReg = (name, login, password) => {
  const appElement = document.getElementById("app");
  const regLoginElement = document.querySelector("#reg-login");
  const regNameElement = document.querySelector("#reg-name");
  const regPassElement = document.querySelector("#reg-password");
  const fetchPromise = fetch("https://wedev-api.sky.pro/api/user", {
    method: "post",
    body: JSON.stringify({
      login: login,
      name: name,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response;
      } else if (response.status === 400) {
        throw new Error("ошибка 400");
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      alert("Вы успешно зарегистрировались.");
      regLoginElement.value = "";
      regNameElement.value = "";
      regPassElement.value = "";
    })
    .catch((error) => {
      if (error.message === "ошибка 400") {
        alert("Пользователь с такими данными уже есть, попробуйте снова");
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    });
};
