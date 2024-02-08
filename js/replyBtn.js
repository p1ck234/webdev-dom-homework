export const initReplyButton = (comments) => {
  const commentsElements = document.querySelectorAll(".comment");
  const commentInputElement = document.getElementById("comment-input");
  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", (event) => {
      const indexComment = commentElement.dataset.index;
      const curruntComment = comments[indexComment].comment;
      const curruntName = comments[indexComment].name;
      commentInputElement.value = `${curruntComment}\n${curruntName} - `;
    });
  }
};
