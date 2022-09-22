const newFormHandler = async (event) => {
  event.preventDefault();
  // Gets values from input
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#content").value.trim();
  // If has both will post to create post
  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Routes user to dashboard if response ok
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};
// Submits for the form handler
document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
