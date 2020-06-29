function cumpara()
{
document.getElementById("nr").style.display = "none";
var cump = document.getElementsByClassName("but_cump");
for(var i = 0; i < cump.length; i++)
{
cump[i].onclick = function()
{
if(localStorage.clickcount)
{
document.getElementById("nr").style.display = "flex";
	localStorage.clickcount = Number(localStorage.clickcount)+1;}
else{
document.getElementById("nr").style.display = "flex";
localStorage.clickcount = 1;
}	

var s = document.getElementById("nr");
s.innerHTML = "Ati cumparat un total de " + localStorage.clickcount+" produse";
}
}
}
