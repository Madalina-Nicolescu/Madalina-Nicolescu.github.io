function inactivityTime() {
    var time;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;  
    window.ontouchstart = resetTimer; 
    window.onclick = resetTimer;      
    window.onkeypress = resetTimer;
	window.ondblclick=resetTimer;
	window.onkeydown=resetTimer;
    window.addEventListener('scroll', resetTimer, true);
	 var seconds;
	 var c =0;
	 
	function increment()
	{	
		 document.getElementById("secunde").innerHTML = "Hei! Mai esti aici? Ai fost inactiv pentru " + seconds + " secunde";
		 seconds +=1;
	}

    function displayDiv() {
        if(document.getElementById("inactiv").style.display == "none")
			document.getElementById("inactiv").style.display = "flex";
		seconds = 7;
	
		
		increment();
    }
	

    function resetTimer() {
		if(document.getElementById("inactiv").style.display != "none")
			document.getElementById("inactiv").style.display = "none";
        clearTimeout(time);
		resetIncrement();
        time = setTimeout(displayDiv, 7000)
        // 1000 milliseconds = 1 second
    }
	
	function resetIncrement()
	{
		
		clearInterval(c);
		c = setInterval(increment,1000);
	}
};