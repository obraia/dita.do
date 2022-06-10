function loadHelp(params) {
  const instructions = [
    "Use the keyboard to enter words.",
    "Press the spacebar to submit a word.",
    "Press the backspace key to delete a letter.",
    "Press the arrow keys to move the cursor.",
    "Press the question mark key to open the help menu.",
    "Press the letter keys to select a letter.",
  ];

  const list = document.createElement("ul");
  list.classList.add("help_info_instructions");

  for (let i = 0; i < instructions.length; i++) {
    const item = document.createElement("li");

    item.classList.add("help_info_instructions_item");
    item.innerText = `${i + 1} - ${instructions[i]}`;

  }

  // params.help.firstElementChild.appendChild(list);
}

function toggleHelp() {
  const help = document.getElementById("help");
  help.classList.toggle("hidden");
}

export { loadHelp, toggleHelp };
