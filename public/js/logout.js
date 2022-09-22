const logout = async () => {
  // Sends to logout route
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  // Sends to homepage if response ok
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};
// Listens for click id
document.querySelector("#logout").addEventListener("click", logout);
