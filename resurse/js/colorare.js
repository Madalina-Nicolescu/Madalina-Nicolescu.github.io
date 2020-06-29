
function colorare(){
	var nr = 0;
	prod = document.getElementsByClassName("templ_cafea");
	
	for(let i = 0 ; i< prod.length;i++)
	{
	prod[i].onclick=function()
	{
		prod[i].classList.toggle("sel");
		if(nr == 0 && prod[i].classList.contains("sel"))
		{
			nr++;
			txt = "Ati selectat " + nr + " produse";
			var el =creare("div",txt);
			el.setAttribute("id","afisaj");
			var el2 = document.getElementById("prod");
			el2.parentNode.insertBefore(el,el2);
		}
		else if(nr == 1 && prod[i].classList.contains("sel") == false)
		{	nr = 0;
			var s = document.getElementById("afisaj");
			s.parentNode.removeChild(s);
		}
		else if(prod[i].classList.contains("sel"))
		{
			nr++;
			var el = document.getElementById("afisaj");
			el.innerHTML = "Ati selectat " + nr + " produse";
		}
		else{
			nr--;
			var el = document.getElementById("afisaj");
			el.innerHTML = "Ati selectat " + nr + " produse";
		}
	}
	
	}
	
	function creare(tag,text)
	{
		var elnou = document.createElement(tag);
		var textnou = document.createTextNode(text);
		elnou.appendChild(textnou);
		return elnou;
	}
	
}