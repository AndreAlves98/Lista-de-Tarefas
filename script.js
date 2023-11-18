const form = document.querySelector("form");
const listaCompleta = document.querySelector(".list-tasks");

let minhaListaDeItens = [];

function adicionarNovaTarefa(event) {
  const input = event.target.querySelector(".input-task");

  if (input.value === "") {
    alert("Você precisa digitar uma tarefa!");
    return;
  }

  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });

  input.value = "";

  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = "";

  minhaListaDeItens.forEach((item, index) => {
    novaLi =
      novaLi +
      `

<li class="task ${item.concluida && "done"}">
<img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${index})">
<p>${item.tarefa}</p>
<img src="./img/trash.png" alt="trash-na-tarefa" onclick="deletarItem(${index})">
</li>

`;
  });

  listaCompleta.innerHTML = novaLi;
  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(index) {
  minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida;

  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem("lista");

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

function deletarItem(index) {
  minhaListaDeItens.splice(index, 1);

  mostrarTarefas();
}

recarregarTarefas();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  adicionarNovaTarefa(event);
});
