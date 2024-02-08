export function deleteLastComment() {
  const listElement = document.getElementById("list");
  const comments = listElement.getElementsByClassName("comment");
  if (comments.length > 0) {
    const lastComment = comments[comments.length - 1];
    return listElement.removeChild(lastComment);
  }
}
