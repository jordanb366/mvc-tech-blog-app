const deleteHandler = async (event) => {
  event.preventDefault();
  // Looks for data attribute with the post id to delete
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    // Send posts id to route and delete
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    // If response is ok send user back to dashboard else, failed to delete post
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};
// event for click on class new delete
document.querySelector(".new-delete").addEventListener("click", deleteHandler);
