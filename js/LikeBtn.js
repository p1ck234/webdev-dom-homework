function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}
export const initLikeButton = (comments) => {
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
