const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#content").value.trim();
  const id = window.location.pathname.split("/")[3];
  console.log(id);
  console.log(title);
  console.log(content);
  if (title && content) {
    // const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update project");
    }
  }
};

document
  .querySelector(".update-form")
  .addEventListener("submit", updateFormHandler);

//   && event.target.hasAttribute("data-id")
