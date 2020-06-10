function get_start_point(new_board) {
  //this gets the start node
  for (i = 0; i < new_board.length; i++) {
    if (new_board[i].node.firstChild) {
      if (new_board[i].node.firstChild.className == "start-point") {
        return new_board[i];
      }
    }
  }
}
function get_goal_node(new_board) {
  //this gets the goal node
  for (i = 0; i < new_board.length; i++) {
    if (new_board[i].node.firstChild) {
      if (new_board[i].node.firstChild.className == "goal") {
        return new_board[i];
      }
    }
  }
}
function getOffset(el) {
  //this gets the position of the given element
  const rect = el.getBoundingClientRect();
  return {
    x: Math.round(rect.left + window.scrollX),
    y: Math.round(rect.top + window.scrollY),
  };
}
function calculate_h_cost(el, goal) {
  //this calculates the heuristic
  const position = getOffset(el.node);
  const positiong = getOffset(goal.node);
  el.h_cost =
    Math.abs(position.x - positiong.x) + Math.abs(position.y - positiong.y);
}

function get_shortest_path(path, current) {
  //this gets the shortest path when everything is done
  while (current.predecessor != null) {
    path.push(current.predecessor);
    current = current.predecessor;
  }
}
function greedy() {
  if (!is_running) {
    is_running = true;
    var board = Array.from(document.getElementById("board").children);
    var new_board = [];
    for (i = 0; i < board.length; i++) {
      //this gets all the nodes in the board and creates an object
      //to each one, with costs and predecessors.
      var node = {
        node: board[i],
        g_cost: 0,
        h_cost: 99999,
        f_cost: 99999,
        predecessor: [],
      };
      new_board.push(node);
    }
    //this is the actual algorithm
    var found = false;
    var current = [];
    var start_node = get_start_point(new_board);
    var goal_node = get_goal_node(new_board);
    var open_list = [];
    var closed_list = [];
    start_node.f_cost = 0;
    start_node.g_cost = 0;
    open_list.push(start_node);
    let k = setInterval(function () {
      if (open_list.length > 0) {
        open_list.sort(function (a, b) {
          return a.f_cost - b.f_cost;
        });
        closed_list.unshift(open_list.shift());
        closed_list[0].node.classList.add("closed");
        current = closed_list[0];
        if (
          current.node.firstChild &&
          current.node.firstChild.classList.contains("goal")
        ) {
          found = true;
          let path = [];
          get_shortest_path(path, current);
          for (x = 0; x < path.length - 1; x++) {
            path[x].node.classList.add("path");
          }
          is_running = false;
          clearInterval(k);
        }
        for (i = 0; i < new_board.length; i++) {
          const c_position = getOffset(current.node);
          const position = getOffset(new_board[i].node);
          if (
            (c_position.x == position.x &&
              c_position.y - position.y <= 30 &&
              c_position.y - position.y >= -30 &&
              !new_board[i].node.classList.contains("selected") &&
              !open_list.includes(new_board[i]) &&
              !closed_list.includes(new_board[i])) ||
            (c_position.y == position.y &&
              c_position.x - position.x <= 30 &&
              c_position.x - position.x >= -30 &&
              !new_board[i].node.classList.contains("selected") &&
              !open_list.includes(new_board[i]) &&
              !closed_list.includes(new_board[i]))
          ) {
            calculate_h_cost(new_board[i], goal_node);
            new_board[i].f_cost = new_board[i].g_cost + new_board[i].h_cost;
            new_board[i].predecessor = current;
            new_board[i].node.classList.add("searching");
            open_list.push(new_board[i]);
          }
        }
      } else {
        is_running = false;
        clearInterval(k);
      }
    }, 0.01);
  }
}
