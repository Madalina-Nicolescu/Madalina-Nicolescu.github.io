var c = document.getElementById("cafea");
c.ondblclick=function()
{
	var cafele = c.getElementsByTagName("li");
	for(var i = cafele.length - 1; i>=0; i--)
	{
		c.appendChild(cafele[i]);
	}
}
var b = document.getElementById("ceai");
b.ondblclick=function()
{
	var ceai = b.getElementsByTagName("li");
	for(var i = ceai.length - 1; i>=0; i--)
	{
		b.appendChild(ceai[i]);
	}
}
var a = document.getElementById("suc");
a.ondblclick=function()
{
	var sucuri = a.getElementsByTagName("li");
	for(var i = sucuri.length - 1; i>=0; i--)
	{
		a.appendChild(sucuri[i]);
	}
}