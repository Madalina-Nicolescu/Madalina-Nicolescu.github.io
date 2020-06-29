window.onload=function(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();


	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					//document.getElementById("afisTemplate").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseajaJsonTemplate(obJson);
					colorare();
					cumpara();
					dotted();
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/json/cafele.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	function afiseajaJsonTemplate(obJson) { 
			//in acets div voi afisa template-urile   
			let container=document.getElementById("afisTemplate");

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vetorul de studenti din obJson
			for(let i=0;i<obJson.cafele.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				//acesta va primi ca parametru un student din vectorul de studenti din json {student: obJson.studenti[i]}
				//practic obJson.studenti[i] e redenumit ca "student" in template si putem sa ii accesam proprietatile: student.id etc
				textTemplate+=ejs.render("<div class='templ_cafea'>\
				<p>Nume: <%= cafea.nume %></p>\
				<p>Tip: <%= cafea.tip %></p>\
				<p>Descriere: <%= cafea.descriere %></p>\
				<p>Gramaj: <%= cafea.gramaj %></p>\
				<p>Pret: <%= cafea.pret %></p>\
				<p>Data adaugare: <%= cafea.data %></p>\
				<button class = 'but_cump'>Cumpara</button>\
				</div>", 
				{cafea: obJson.cafele[i]});
			} 
			//adaug textul cu afisarea studentilor in container
			container.innerHTML=textTemplate;
	}
//-------------sortare, filtrare, calculare------------
	
	sortat = document.getElementById("sort");
	filtrat = document.getElementById("filt");
	calculat = document.getElementById("calc");
	txt = document.getElementById("afisTemplate");
	prod = document.getElementsByClassName("templ_cafea");
	filtrat.onchange = function(){
		
		if(filtrat.options[filtrat.selectedIndex].value == "Toate produsele")
		{
			for(let i = 0; i <prod.length;i++)
			{
				prod[i].classList.remove("ascunde");
			}
			
		}
		else if(filtrat.options[filtrat.selectedIndex].value == "Cafea")
		{
			for(let i = 0; i<prod.length;i++)
			{
			
				if(prod[i].innerHTML.includes("Cafea"))
				{
					prod[i].classList.remove("ascunde");
				}
				else
					prod[i].classList.add("ascunde");
			}
		}
		else if(filtrat.options[filtrat.selectedIndex].value == "Ceai")
		{
			for(let i = 0; i<prod.length;i++)
			{
				if(prod[i].innerHTML.includes("Ceai"))
					prod[i].classList.remove("ascunde");
				else
					prod[i].classList.add("ascunde");
			}
		}
		else if(filtrat.options[filtrat.selectedIndex].value == "Suc")
		{
			
			for(let i = 0; i<prod.length;i++)
			{
				if(prod[i].innerHTML.includes("Suc"))
				{
					prod[i].classList.remove("ascunde");
				}
				else
					prod[i].classList.add("ascunde");
			}
		}
	}
	
	sortat.onchange = function(){
		let sir = Array.prototype.slice.call(prod);
		
		if(sortat.options[sortat.selectedIndex].value == "price")
		{
			sir.sort(function(a,b){
				let pa = a.getElementsByTagName("p");
				let pret_a = pa[5].innerHTML.split(" ")[1];
				let pb=b.getElementsByTagName("p");
				let pret_b = pb[5].innerHTML.split(" ")[1];
				return pret_a-pret_b;
			});
		}
		else if(sortat.options[sortat.selectedIndex].value == "price-desc"){
			sir.sort(function(a,b){
			
				let pa = a.getElementsByTagName("p");
				let pret_a = pa[5].innerHTML.split(" ")[1];
				let pb=b.getElementsByTagName("p");
				let pret_b = pb[5].innerHTML.split(" ")[1];
		
				return pret_b-pret_a;
			});
		}
		else if(sortat.options[sortat.selectedIndex].value == "date"){
			sir.sort(function(a,b){
			
				let da = a.getElementsByTagName("p");
				let data_a = da[6].innerHTML.split(" ")[2];
				let db=b.getElementsByTagName("p");
				let data_b = db[6].innerHTML.split(" ")[2];
				let c =new Date(data_b);
				let d = new Date(data_a);
				
				return c.getTime()-d.getTime();
			});
		}
		
		for(let i = 0; i <sir.length;i++)
			txt.appendChild(sir[i]);
	}
	
	calculat.onchange = function()
	{
		let sir2 = Array.prototype.slice.call(prod);
		if(calculat.options[calculat.selectedIndex].value == "scump")
		{
		var maxim = 0;
		for(let i = 0; i<sir2.length; i++)
		{
			let pa = sir2[i].getElementsByTagName("p");
			let pret_a = parseInt(pa[5].innerHTML.split(" ")[1]);
			if(pret_a> maxim)
			{
			maxim = pret_a;
			}
			
		}
		for(let i = 0; i <sir2.length;i++){
			let pa = sir2[i].getElementsByTagName("p");
			let pret_a = parseInt(pa[5].innerHTML.split(" ")[1]);
			if(pret_a != maxim){
				prod[i].classList.add("ascunde");
			}
			else
			{
				prod[i].classList.remove("ascunde");
			}
		}
		}
		else if(calculat.options[calculat.selectedIndex].value == "ieftin")
		{
		var minim = 1000;
		for(let i = 0; i<sir2.length; i++)
		{
			let pa = sir2[i].getElementsByTagName("p");
			let pret_a = parseInt(pa[5].innerHTML.split(" ")[1]);
			if(pret_a< minim)
			{
			minim = pret_a;
			}
		}
		
		for(let i = 0; i <sir2.length;i++){
			let pa = sir2[i].getElementsByTagName("p");
			let pret_a = parseInt(pa[5].innerHTML.split(" ")[1]);
			if(pret_a != minim){
				prod[i].classList.add("ascunde");
			}
			else
			{
				prod[i].classList.remove("ascunde");
			}
		}
		}
		else if(calculat.options[calculat.selectedIndex].value == "recent")
		{
		var max_data = new Date("1999-01-01");
		for(let i = 0; i<sir2.length; i++)
		{
			let da = sir2[i].getElementsByTagName("p");
			let data_a = new Date(da[6].innerHTML.split(" ")[2]);
			if(data_a> max_data)
			{
			max_data = data_a;
			}
		}
		for(let i = 0; i <sir2.length;i++){
			let da = sir2[i].getElementsByTagName("p");
			let data_a = new Date(da[6].innerHTML.split(" ")[2]);
			
			if(data_a.getTime() != max_data.getTime()){
			
				prod[i].classList.add("ascunde");
			}
			else
			{
				
				prod[i].classList.remove("ascunde");
				
				
			}
		}
		}
	}
	

	
}