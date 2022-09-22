const updateFormHandler = async (event) => {
  event.preventDefault();
  // Gets values from input
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#content").value.trim();
  // Gets the id via window for posts
  const id = window.location.pathname.split("/")[3];
  // If has title and content and then update
  if (title && content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Returns to dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post");
    }
  }
};
// Submit button for handler
document
  .querySelector(".update-form")
  .addEventListener("submit", updateFormHandler);
