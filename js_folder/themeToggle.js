// let's get the dark mode btn
const darkModeBtn = document.getElementById("dark_mode_btn");

// check localstorage when page loads
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
  darkModeBtn.innerHTML = `<i class="fa-regular fa-sun"></i> Light Mode`;
}
// use classlist toggle to add or remove class depending on its current state
darkModeBtn.addEventListener("click", () => {
  // console.log("btn clicked");
  document.body.classList.toggle("dark");
  // check if body now has dark class, change the btn to light mode
  if (document.body.classList.contains("dark")) {
    darkModeBtn.innerHTML = `<i class="fa-regular fa-sun"></i> Light Mode`;
    // need to save to localStorage that darkMode is enabled
    localStorage.setItem("darkMode", "enabled");
  } else {
    // switch back to moon icon + Dark mode
    darkModeBtn.innerHTML = `<i class="fa-regular fa-moon"></i> Dark Mode`;
    localStorage.removeItem("darkMode");
  }
});
