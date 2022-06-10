import { toggleHelp } from "./help.js";

function loadNavbar(params) {
  const actions = [
    { content: "?", onClick: toggleHelp },
    { content: "L", onClick: params.onSubmit },
  ];

  for (const action of actions) {
    const button = createActionButton(action.content, action.onClick);
    params.navbar.appendChild(button);
  }
}

function createActionButton(text, onClick) {
  const button = document.createElement("button");
  button.classList.add("navbar_button");

  button.innerText = text;
  button.addEventListener("click", onClick);

  return button;
}

export { loadNavbar };
