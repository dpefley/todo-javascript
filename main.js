var allTodos = [];

function display(entry, idPassed) { //Creates new HTML elements for each ToDo
  //var entry = document.getElementById("textEntry").value;
  if (entry == "") {
    entry = "New ToDo";
  }

  var numChildren = document.getElementById("newTodos").childElementCount;

  var div = document.createElement('div');
  div.id = idPassed;

  document.getElementById("newTodos").appendChild(div);
  document.getElementById(idPassed).innerHTML = '<br><div id="todo"><input type="checkbox" name="complete" value="Done" id="complete"><button type="button" name="delete" id="delete" onclick="deleteAJAX()">Delete</button><div id="todoText">'+entry+'</div></div>';
}

function postAJAX() {
  var entry = document.getElementById("textEntry").value;
  console.log(entry);
  if (entry == "") {
    entry = "New ToDo";
  }

  createAJAX(entry);
  retrieveAJAX();
}

function createAJAX(textInput) {
  var data = {
    text: textInput
  }

  var xhttp2 = new XMLHttpRequest();

  xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var todo = JSON.parse(this.responseText);
      //console.log(todo);
    }
    else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };

  xhttp2.open("POST", "https://api.kraigh.net/todos", true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
  xhttp2.send(JSON.stringify(data));
}

function retrieveAJAX() {
  clearForReload();

  var xhttp2 = new XMLHttpRequest();

  xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var todo = JSON.parse(this.responseText);
      console.log(todo);
      displayToDos(todo);
      allTodos = todo;
    }
  };

  xhttp2.open("GET", "https://api.kraigh.net/todos", true);

  xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
  xhttp2.send();
}

function displayToDos(todos) {
  if (todos.length == 0) {
    //console.log("No todos, or unable to retrieve.")
    return;
  }

  for (var i = 0; i < todos.length; i++) {
    // console.log(todos[i].text);
    display(todos[i].text, todos[i].id);
  }
}

function clearForReload() {
  // console.log("Clearing for reload");
  var node = document.getElementById("newTodos");
  while (node.firstChild) {
      node.removeChild(node.firstChild);
  }
}

function deleteAJAX(id) {
  console.log("Delete called");

  //id = "698b2ca0-5a21-11e9-8d53-79f7917261d4"; //test id

  var xhttp2 = new XMLHttpRequest();

  xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var todo = JSON.parse(this.responseText);
      console.log(todo);
    }
    else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };

  xhttp2.open("DELETE", "https://api.kraigh.net/todos/"+id);
  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", "9b99af89b8927089828bb405cb26692c2640e47a89638e3b1cb55dcd7f813c99");
  xhttp2.send();
}









//EOF
