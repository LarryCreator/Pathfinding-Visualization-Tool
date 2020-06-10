function clear_board() {
  //this clears the board by removing all their extra classes.
  if (!is_running) {
    let nodes = Array.from(document.getElementById("board").children);
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].classList.contains("selected")) {
        nodes[i].classList.remove("selected");
      }
      if (nodes[i].classList.contains("closed")) {
        nodes[i].classList.remove("closed");
      }
      if (nodes[i].classList.contains("searching")) {
        nodes[i].classList.remove("searching");
      }
      if (nodes[i].classList.contains("path")) {
        nodes[i].classList.remove("path");
      }
    }
  }
}
function clear_path() {
  //this clears the board, but leaves the walls.
  if (!is_running) {
    let nodes = Array.from(document.getElementById("board").children);
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].classList.contains("closed")) {
        nodes[i].classList.remove("closed");
      }
      if (nodes[i].classList.contains("searching")) {
        nodes[i].classList.remove("searching");
      }
      if (nodes[i].classList.contains("path")) {
        nodes[i].classList.remove("path");
      }
    }
  }
}
//chosen algorithm is when the person chooses the algorithm
//that is going to run on the menu
let chosen_algorithm = "";

function choose_algorithm(button_id) {
  //this actually puts the algorithm name in the previous variable
  //and changes the text below the menu to the algorithm's name
  if (!is_running) {
    chosen_algorithm = button_id;
    document.getElementById("title").innerHTML =
      chosen_algorithm.charAt(0).toUpperCase() + chosen_algorithm.slice(1);
  }
}
function run_algorithm() {
  //when someone clicks to visualize the algorithm, this clears the path
  //and runs the chosen algorithm
  if (!is_running) {
    clear_path();
    if (chosen_algorithm == "A* Algorithm") {
      a_star();
    } else if (chosen_algorithm == "Dijkstra's Algorithm") {
      dijkstras();
    } else if (chosen_algorithm == "Greedy First Search") {
      greedy();
    } else if (chosen_algorithm == "Breadth First Search") {
      breadth_first();
    }
  }
}
