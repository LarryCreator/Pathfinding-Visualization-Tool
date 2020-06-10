var msdown = false;
var msenter = false;
var m_start = false;
var m_goal = false;
var nodes = [];
var is_running = false; //This global variable only existis to get
//the files the capability of checking if any algorithm is running at the moment

window.addEventListener("mousedown", function () {
  msdown = true;
});
window.addEventListener("mouseenter", function () {
  msenter = true;
});
window.addEventListener("mouseup", function () {
  msmove = false;
  msdown = false;
});

for (i = 0; i < 462; i++) {
  //This loops create all the nodes in the board
  //and handles the wall creation system, as if you were
  //drawing on the board.
  var node = document.createElement("div");
  node.className = "node";
  node.onmousedown = function () {
    //when you click, if the node is not a wall, it turns into a wall
    //else, the wall disappears
    if (!is_running) {
      if (!this.firstChild) {
        if (!this.classList.contains("selected")) {
          this.classList.add("selected");
        } else if (this.classList.contains("selected")) {
          this.classList.remove("selected");
        }
      } else {
        if (this.firstChild.className == "start-point") {
          m_start = true; //this
        } else if (this.firstChild.className == "goal") {
          m_goal = true; //this
        }
      }
    }
  };
  node.onmouseenter = function () {
    if (!is_running) {
      //if this is not the start node or the goal node and
      //if someone is dragging around the table, draw walls
      if (!this.firstChild && !m_start && !m_goal) {
        if (msdown && !this.classList.contains("selected")) {
          this.classList.add("selected");
        } else if (msdown && this.classList.contains("selected")) {
          this.classList.remove("selected");
        }
      } else if (
        !this.firstChild &&
        m_start &&
        msdown &&
        !this.classList.contains("selected")
      ) {
        //if someone is dragging the start node, destroy it and create
        //another one in the div the person is with the cursor currently on
        for (i = 0; i < nodes.length; i++) {
          if (nodes[i].firstChild) {
            if (nodes[i].firstChild.className == "start-point") {
              nodes[i].removeChild(nodes[i].firstChild);
              var a = document.createElement("div");
              a.className = "start-point";
              a.draggable = true;
              this.appendChild(a);

              break;
            }
          }
        }
        //else if you're dragging the goal, eliminate the original and
        //create a new one in the div the person is with the cursor currently on
      } else if (
        !this.firstChild &&
        m_goal &&
        msdown &&
        !this.classList.contains("selected")
      ) {
        for (i = 0; i < nodes.length; i++) {
          if (nodes[i].firstChild) {
            if (nodes[i].firstChild.className == "goal") {
              nodes[i].removeChild(nodes[i].firstChild);
              var a = document.createElement("div");
              a.className = "goal";
              a.draggable = true;
              this.appendChild(a);
              break;
            }
          }
        }
      }
    }
  };
  node.onmouseup = function () {
    //if the person stopped clicking, set all the check booleans to false.
    msdown = false;
    msenter = false;
    m_start = false;
    m_goal = false;
  };
  node.ondrag = function () {
    //this is just to avoid some bugs when someone drags out of the screen.
    msdown = false;
    msenter = false;
    m_start = false;
    m_goal = false;
  };
  //this put the new node on the board
  document.getElementById("board").appendChild(node);
  nodes.push(node);
}
//this creates the start and the goal node, and also
//puts it on the board
var start = document.createElement("div");
start.className = "start-point";
start.draggable = true;
var goal = document.createElement("div");
goal.className = "goal";
goal.draggable = true;
nodes[Math.round(nodes.length / 2.3)].appendChild(start);
nodes[Math.round(nodes.length / 1.8)].appendChild(goal);
