function dotted()
{
var dot = setInterval(border, 3000);

function border()
{
	prod = document.getElementsByClassName("templ_cafea");
	for(let i = 0 ; i< prod.length;i++)
	{
		prod[i].classList.add("dotted");
		var c = setTimeout(undo,1000);
		function undo()
		{
	
		prod[i].classList.remove("dotted");
		}
	}
}



}