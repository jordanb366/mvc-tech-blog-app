const deleteHandler = async (event) => {
  event.preventDefault();
  console.log("test");
  // const id = event.target.hasAttribute("data-id");
  // console.log(id);
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete project");
    }
  }
};

document.querySelector(".new-delete").addEventListener("click", deleteHandler);
