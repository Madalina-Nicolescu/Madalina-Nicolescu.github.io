 
                    var wordindex1 = 0;
                    var txt1 = 'Pregătim în mai puțin de 24 de ore lista noastră de propuneri și sugestii pentru a vă asigura o aniversare de neuitat.Echipa noastră vă poate ajuta în organizarea evenimentului, pentru ca totul sa se desfășoare exact asa cum doriți. Prin urmare, vom stabili împreună toate detaliile legate de meniul evenimentului, categoriile de băuturi (dacă vor fi servite băuturi alcoolice sau nu) decorațiuni, muzică, și multe alte aspecte extrem de importante în organizarea unui eveniment. Contactați-ne pentru o ofertă personalizată!';
                    txt1 = txt1.split(' ');
                    var speed1 = 333;
                    
                    function typeWriter1() {
                    if(wordindex1 < txt1.length)
                    
                    document.getElementById("aparitie1").innerHTML =document.getElementById("aparitie1").innerHTML.concat(txt1[wordindex1]+" ");
                    wordindex1++;
                    
                    if(wordindex1 == txt1.length)
                        return;
                        
                        setTimeout(typeWriter1, speed1);
                    
                    }
                    var wordindex2 = 0;
                    var txt2 = 'Evenimentele corporate reprezintă o modalitate excelentă de a încuraja comunicarea și unitatea în cadrul unei companii. Locaţia noastră se adresează companiilor care doresc un loc perfect pentru evenimente care aduc laolaltă până la 22 de persoane. Vom colabora pentru stabilirea tuturor detaliilor fiecărui eveniment în parte, asigurându-ne împreună de succesul acestuia. Spațiul de la Cocafe este perfect compartimentat astfel încât se poate închiria pentru ședințe off-site, pentru întâlniri de afaceri sau pentru orice alt tip de eveniment care presupune întărirea sinergiei echipelor în cadrul companiei. La noi veți beneficia de intimitatea dorită, dar și de servicii excelente.';
                    txt2 = txt2.split(' ');
                    var speed2 = 333;
                    
                    function typeWriter2() {
                    if(wordindex2 < txt2.length)
                    
                    document.getElementById("aparitie2").innerHTML =document.getElementById("aparitie2").innerHTML.concat(txt2[wordindex2]+" ");
                    wordindex2++;
                    
                    if(wordindex2 == txt2.length)
                        return;
                        
                        setTimeout(typeWriter2, speed2);
                    
                    }
                
					
					function myfunc()
					{
						typeWriter1();
						typeWriter2();
						
					}
					
					


