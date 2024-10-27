// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
  const startIcon = document.getElementById("start");

  startIcon.addEventListener("click", () => {
    // Create a new div element for the Start menu
    const startDiv = document.createElement("div");
    startDiv.style.position = "absolute"; // Positioning
    startDiv.style.height = "400px";
    startDiv.style.width = "300px";

    startDiv.style.bottom = "90px"; // Position it above the taskbar
    startDiv.style.left = "280px"; // You can adjust this for horizontal placement
    startDiv.style.width = "200px"; // Width of the Start menu
    startDiv.style.backgroundColor = " rgba(198, 42, 255, 0.7);"; // Background color
    startDiv.style.borderRadius = "5px"; // Rounded corners
    startDiv.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)"; // Shadow for depth
    startDiv.style.padding = "10px"; // Padding
    startDiv.style.zIndex = "4000"
    startDiv.innerHTML = `<h3 class="inner_text">Start Menu</h3>
                              <p class="inner_text">Option 1</p>
                              <p class="inner_text">Option 2</p>
                              <p class="inner_text">Option 3</p>`;

    // Append the new div to the body
    document.body.appendChild(startDiv);

    // Optional: Close the Start menu when clicking anywhere else
    document.addEventListener("click", (event) => {
      if (!startDiv.contains(event.target) && event.target !== startIcon) {
        startDiv.remove(); // Remove the Start menu
      }
    });
  });
});

const minimizeBtn = document.querySelector("#minimize");
const resizeBtn = document.querySelector("#resize");
const CloseBtn = document.querySelector("#close");
const setting_container = document.querySelector("#setting_window");
const setting_icon = document.querySelector("#settings");
const mouse_right_click = document.querySelector(".mouse_right_click");
const new_folder_icon = document.querySelector("#new_folder_icon");

const new_newfolder_text = document.querySelector(
  "#new_folder_will_be_created"
);
const newfolder = document.querySelector("#new_folder");

CloseBtn.addEventListener("click", () => {
  setting_container.style.display = "none";
});

setting_icon.addEventListener("click", () => {
  setting_container.style.display = "block";
});

let isFullscreen = false;

// Toggle fullscreen on resize button click
resizeBtn.addEventListener("click", () => {
  if (!isFullscreen) {
    setting_container.classList.add("fullscreen"); // Enter fullscreen
  } else {
    setting_container.classList.remove("fullscreen"); // Exit fullscreen
  }
  isFullscreen = !isFullscreen; // Toggle the fullscreen state
});

let isDragging = false;
let offsetX = 0; // Store horizontal offset
let offsetY = 0; // Store vertical offset

// When mouse button is pressed down on the container
setting_container.addEventListener("mousedown", (e) => {
  isDragging = true; // Start dragging
  offsetX = e.clientX - setting_container.getBoundingClientRect().left; // Calculate offset
  offsetY = e.clientY - setting_container.getBoundingClientRect().top; // Calculate offset
  setting_container.style.cursor = "grabbing"; // Change cursor to grabbing
});

// When mouse is moved
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    // Calculate new position
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Get the dimensions of the container
    const containerRect = setting_container.getBoundingClientRect();

    // Boundary checks
    if (newX < 0) newX = 0; // Prevent moving off the left edge
    if (newY < 0) newY = 0; // Prevent moving off the top edge
    if (newX + containerRect.width > window.innerWidth) {
      newX = window.innerWidth - containerRect.width; // Prevent moving off the right edge
    }
    if (newY + containerRect.height > window.innerHeight) {
      newY = window.innerHeight - containerRect.height; // Prevent moving off the bottom edge
    }

    // Update the position
    setting_container.style.left = `${newX}px`;
    setting_container.style.top = `${newY}px`;
  }
});

// When mouse button is released
document.addEventListener("mouseup", () => {
  isDragging = false; // Stop dragging
  setting_container.style.cursor = "default"; // Reset cursor
});

const mouseRightClickMenu = document.querySelector(".mouse_right_click");

// Show the custom context menu on right-click anywhere in the body
document.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // Prevent the default context menu from appearing
  const { clientX: mouseX, clientY: mouseY } = e; // Get the mouse coordinates

  mouseRightClickMenu.style.left = `${mouseX}px`; // Position the menu based on mouse's X coordinate
  mouseRightClickMenu.style.top = `${mouseY}px`; // Position the menu based on mouse's Y coordinate
  mouseRightClickMenu.style.display = "block"; // Show the custom menu
});

// Hide the custom context menu when clicking anywhere else
document.addEventListener("click", () => {
  mouseRightClickMenu.style.display = "none"; // Hide the menu
});

// Optional: Add click events to menu items
const menuItems = document.querySelectorAll(".mouse_right_click_h3_text");
menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(`${e.target.innerText} clicked`); // Log the clicked item to the console
    mouseRightClickMenu.style.display = "none"; // Hide the menu after an action
  });
});

new_newfolder_text.addEventListener("click", () => {
  newfolder.style.display = "block";
});

const new_folder_container = document.querySelector("#new_folder_container");

isFullscreen = false;
isDragging = false;
offsetX = 0; // Store horizontal offset
offsetY = 0; // Store vertical offset;

// Close the new folder container
CloseBtn.addEventListener("click", () => {
  new_folder_container.style.display = "none";
});

// Open the new folder container
document
  .querySelector("#new_folder_will_be_created")
  .addEventListener("click", () => {
    new_folder_container.style.display = "block";
  });

// Toggle fullscreen on resize button click
resizeBtn.addEventListener("click", () => {
  if (!isFullscreen) {
    new_folder_container.classList.add('new_folder_container'); // Enter fullscreen
  } else {
    new_folder_container.classList.remove('new_folder_container'); // Exit fullscreen
  }
  isFullscreen = !isFullscreen; // Toggle the fullscreen state
});

// Start dragging the container
new_folder_container.addEventListener("mousedown", (e) => {
  isDragging = true; // Enable dragging
  offsetX = e.clientX - new_folder_container.getBoundingClientRect().left;
  offsetY = e.clientY - new_folder_container.getBoundingClientRect().top;
  new_folder_container.style.cursor = "grabbing"; // Change cursor to grabbing
});

// Drag the container as the mouse moves
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    const containerRect = new_folder_container.getBoundingClientRect();

    // Prevent the container from moving out of bounds
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + containerRect.width > window.innerWidth) {
      newX = window.innerWidth - containerRect.width;
    }
    if (newY + containerRect.height > window.innerHeight) {
      newY = window.innerHeight - containerRect.height;
    }

    // Apply the new position
    new_folder_container.style.left = `${newX}px`;
    new_folder_container.style.top = `${newY}px`;
  }
});

// Stop dragging when the mouse button is released
document.addEventListener("mouseup", () => {
  isDragging = false; // Stop dragging
  new_folder_container.style.cursor = "default"; // Reset cursor
});

// code error figure out this weekend plus complete the project asap so you can keep improving everything.