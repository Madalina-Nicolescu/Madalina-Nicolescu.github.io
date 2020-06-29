window.onload = function activ()
{
	var adr = window.location.href.split("/");
	var crr = adr[adr.length-1];
	var meniu = document.getElementById("meniu");
	var links = meniu.getElementsByTagName("a");
	
	for(var i = 0; i<links.length; i++)
	{
		var l = links[i].href.split("/");
		if(l[l.length-1]==crr)
			links[i].parentNode.classList.add("active");
	}
	if(crr == "evenimente")
	myfunc();
	inactivityTime();
	nr_cuv();
	
}