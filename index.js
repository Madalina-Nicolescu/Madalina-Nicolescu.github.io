var formidable = require("formidable");
var crypto = require("crypto");
var session = require("express-session");
var fs= require('fs');

var express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var path = require('path');
var app = express(); //aici avem serverul

// pentru folosirea ejs-ului 
app.set('view engine', 'ejs');

console.log(__dirname);//calea catre radacina proiectului
app.use(express.static(path.join(__dirname, "resurse")))
//din acest moment toate caile catre fisierele statice le scriem relativ la folderul resurse

app.use(session({
	secret: "cheie_sesiune",
	resave: true,
	saveUninitialized: false
}))
//din acest moment in toate requesturile o sa am si proprietatea session (req.session) care e acelasi obiect pentru toate requesturile

// ------------ tratare cereri post -------
app.post('/inreg', function(req, res) {
  var formular= new formidable.IncomingForm()
	formular.parse(req, function(err, fields, files){
		//files provine din inputurile de tip file <input type="file"....
		//fields sunt toate celelalte

		//in fields proprietatile sunt valorile atributelor name din inputurile din formular
		// <input type="text" name="username" 
		console.log(fields.username)
		fisierUseri=fs.readFileSync("useri.json");
		var parolaCriptata;
		//al doilea argument e parola(cheia) de criptare
		var algoritmCriptare=crypto.createCipher('aes-128-cbc',"parola_criptare");
		parolaCriptata=algoritmCriptare.update(fields.parola, "utf-8", "hex");
		parolaCriptata+=algoritmCriptare.final("hex");
		obUseri= JSON.parse(fisierUseri);
		var userNou= {
				id: obUseri.lastId,
				username: fields.username,
        nume: fields.nume,
		oras: fields.oras,
        parola: parolaCriptata,
		email:fields.email,
        dataInreg: new Date(),
        rol: "user"
			}
		obUseri.useri.push(userNou);
    obUseri.lastId++;
		var jsonNou=JSON.stringify(obUseri);
		fs.writeFileSync("useri.json",jsonNou );
		res.redirect("/")
	})
})

//in primul parametru din app.post avem valoarea din action-ul formularului
app.post('/login', function(req, res) {
  var formular= new formidable.IncomingForm()
	formular.parse(req, function(err, fields, files){

		fisierUseri=fs.readFileSync("useri.json");
		var parolaCriptata;
		//al doilea argument e parola(cheia) de criptare
		var algoritmCriptare=crypto.createCipher('aes-128-cbc',"parola_criptare");
		parolaCriptata=algoritmCriptare.update(fields.parola, "utf-8", "hex");
		parolaCriptata+=algoritmCriptare.final("hex");
		obUseri= JSON.parse(fisierUseri);
  	var utiliz= obUseri.useri.find(function(u) {
      return u.username == fields.username && parolaCriptata == u.parola;
    });
		//find returneaza null daca nu gaseste elementul cu conditia data
		if(utiliz){
			//setez datele de sesiune
			req.session.utilizator=utiliz;
			console.log("Exista utilizatorul")
			//render primeste pe al doilea parametru date (organizate sub forma unui obiect) care pot fi transmise catre ejs (template) 
			res.render("html/index", {username: utiliz.username})
		}
		
		
		//res.redirect("/")
	})
})



// ------------ tratare cereri get -------

app.get("/logout", function(req, res) {
	req.session.destroy();
	res.redirect("/")
});

// cand se face o cerere get catre pagina de index 
app.get('/', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
		var numeUtiliz= req.session? (req.session.utilizator? req.session.utilizator.username : null) : null;
    res.render('html/index', {username: numeUtiliz });
});
/*
app.get('/pagina', function(req, res) {
	//afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) 
    res.render('html/pagina');
});

*/

app.get('/ceva', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    console.log("a intrat pe request")
		res.setHeader("Content-Type", "text/html");
		res.write("<html><body><p>Salut!!!!</p>");
		//if(cond)
		res.write("</body></html>");
		res.end();
});
// * - orice 
app.get("/*", function(req,res){
	console.log(req.url);

	var numeUtiliz= req.session? (req.session.utilizator? req.session.utilizator.username : null) : null;


	res.render('html'+req.url, {username: numeUtiliz}, function(err,textRandare){
		//textRandare este rezultatul compilarii templateului ejs
		if(err){
			if(err.message.includes("Failed to lookup view"))
				return res.status(404).render("html/404",  {username: numeUtiliz});
			else
				throw err;
		}
		res.send(textRandare);

	});
})

//Intotdeauna verificam la final! daca nu gaseset resursa si transmitem codul 404
/*
app.use(function(req, res){
	res.status(404).render('html/404');
})*/


app.listen(8080);
console.log('Aplicatia se va deschide pe portul 8080.');



