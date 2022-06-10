import { loadGrid, paintLine } from "./grid.js";

function loadExempleGrid(params) {
  const grid = document.createElement("div");
  grid.classList.add("help_info_grid");

  loadGrid({
    rows: 1,
    columns: 3,
    grid,
  });

  paintLine({
    currentRow: 0,
    columns: 3,
    fields: grid.children,
    colors: ["green", "yellow", "black"],
  });

  params.parent.appendChild(grid);
}

function loadGridLegend(params) {
  const list = document.createElement("ul");

  list.classList.add("help_info_legend");

  const legends = [
    "Verde - A letra está na posição correta.",
    "Amarelo - A letra está na posição errada.",
    "Preto - A letra não existe na palavra.",
  ];

  for (let i = 0; i < legends.length; i++) {
    const item = document.createElement("li");

    item.classList.add("help_info_legend_item");
    item.innerText = legends[i];

    list.appendChild(item);
  }

  params.parent.appendChild(list);
}

function loadHelp(params) {
  loadExempleGrid({
    parent: params.help.firstElementChild,
  });

  loadGridLegend({
    parent: params.help.firstElementChild,
  });

  const list = document.createElement("ol");

  list.classList.add("help_info_instructions");

  const instructions = [
    "Use o teclado para inserir as letras.",
    "Pressione a tecla 'Backspace' para apagar as letras.",
    "Pressione as teclas 'Shift' para selecionar mais que um campo.",
    "Presione as teclas de seta para selecionar o campo anterior ou próximo.",
    "Pressione a tecla 'Enter' para enviar a palavra.",
  ];

  for (let i = 0; i < instructions.length; i++) {
    const item = document.createElement("li");

    item.classList.add("help_info_instructions_item");
    item.innerText = instructions[i];

    list.appendChild(item);
  }

  params.help.addEventListener("click", toggleHelp);

  params.help.firstElementChild.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  params.help.firstElementChild.appendChild(list);
}

function toggleHelp() {
  const help = document.getElementById("help");
  help.classList.toggle("hidden");
}

export { loadHelp, toggleHelp };
