const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

/**
 * The function "criaLi" creates a new list item element in JavaScript.
 * @returns A newly created list item element (li) is being returned.
 */
function criaLi() {
  const li = document.createElement('li');
  return li;
}

/* The code snippet `inputTarefa.addEventListener('keypress', function(e) { ... });` is adding a
keypress event listener to the `inputTarefa` element. This event listener listens for keypress
events that occur within the `inputTarefa` input field. */
inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

/**
 * The function `limpaInput` clears the value of an input field and sets focus on it.
 */
function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

/**
 * The function "criaBotaoApagar" creates a button element with text "Apagar" and adds it to a
 * specified list item element.
 * @param li - The `li` parameter in the `criaBotaoApagar` function is a reference to an HTML list item
 * element (`<li>`).
 */
function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar';
  // botaoApagar.classList.add('apagar');
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);
}
/**
 * The function "criaTarefa" creates a new task element with the input text, appends it to a list,
 * clears the input field, creates a delete button for the task, and saves the tasks.
 * @param textoInput - The `textoInput` parameter in the `criaTarefa` function represents the text
 * input that is passed to the function. This text input is used to create a new task (tarefa) in the
 * application. The function creates a new list item (`li`) element with the text content set
 */

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
}
/* The code snippet `btnTarefa.addEventListener('click', function() { ... });` is adding a click event
listener to the button element with the class `btn-tarefa`. When the button is clicked, the function
inside the event listener is executed. */

btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

/* The code snippet `document.addEventListener('click', function(e) { ... }` is adding a click event
listener to the entire document. When a click event occurs anywhere on the document, the function
inside the event listener is executed. */
document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

/**
 * The function "salvarTarefas" saves a list of tasks as a JSON string in the local storage.
 */
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

/**
 * The function retrieves saved tasks from local storage and creates task elements for each one.
 */
function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();