function nr_cuv()
{
	var body = document.getElementsByTagName("body")[0];
	var txt = body.innerText.split(" ");
	var nr = document.getElementById("nr_cuv");
	nr.innerHTML = "Aceasta pagina contine "+ txt.length+" cuvinte";
}