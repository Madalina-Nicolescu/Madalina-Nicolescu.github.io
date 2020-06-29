var c=document.getElementById("cup1");
c.onclick = function()
{
	move1();
	move2();
}


function move3()
{
	var elem = document.getElementById("cup1"); 
	var pos_y = 70;
	var id = setInterval(frame, 10);
  function frame() {
    if (pos_y==200) {
		{clearInterval(id);
		}
    } else {
		pos_y++;
	
      elem.style.top = pos_y + "px"; 
      
    }
}
}

function move4()
{
	var elem = document.getElementById("cup2"); 
	var pos_y = 120;
	var id = setInterval(frame, 10);
  function frame() {
    if (pos_y==0) {
		{clearInterval(id);
		}
    } else {
		pos_y--;
	
      elem.style.top = pos_y + "px"; 
      
    }
}
}

function move1()
{
	var elem = document.getElementById("cup1");  
  var pos_x = 0;
  var pos_y = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos_x == 70 && pos_y==70) {
		{clearInterval(id);
		move3();
		}
    } else {
      pos_x++;
		pos_y++;
	
      elem.style.top = pos_x + "px"; 
      elem.style.left = pos_y + "px"; 
    }
  }
}

function move2()
{
  var elem = document.getElementById("cup2");  
  var pos = 200;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 130) {
		{clearInterval(id);
		move4();
		}
    } else {
      pos--; 
      elem.style.top = pos + "px"; 
      elem.style.left = pos + "px"; 
    }
  }
}

