const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector("#comment").value.trim();
  const post_id = window.location.pathname.split("/")[2];
  // console.log(postID);

  if (comment) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
