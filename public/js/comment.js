const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentInput = document.querySelector("#comment").value.trim();
  const postID = window.location.pathname.split("/")[2];
  console.log(postID);

  if (commentInput && postID) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ commentInput, postID }),
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
  .querySelector(".comment-button")
  .addEventListener("click", commentFormHandler);
