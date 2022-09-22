const commentFormHandler = async (event) => {
  event.preventDefault();
  // Comment values
  const comment = document.querySelector("#comment").value.trim();
  // Gets post id from window
  const post_id = window.location.pathname.split("/")[2];
  // If has comment
  if (comment) {
    // Will send post request to comment route
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
      headers: { "Content-Type": "application/json" },
    });
    // Sends back to post that is commented on else display error message
    if (response.ok) {
      document.location.replace(`/posts/${post_id}`);
    } else {
      alert(response.statusText);
    }
  }
};
// Event listener for new comment form on submit
document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
