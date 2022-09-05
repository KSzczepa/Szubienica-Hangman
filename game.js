var haslo = "Bez pracy nie ma kolaczy";
haslo = haslo.toUpperCase();
haslo = haslo.split("");
var haslo_c = haslo;
var skucha = 0;

var yes = new Audio("audio/yes.wav");
var no = new Audio("audio/no.wav");


var ukryte_haslo = "";
var dlugosc = haslo.length;

for (i=0; i<dlugosc; i++)
{
    if (haslo[i]==" ")  ukryte_haslo = ukryte_haslo + " ";
    else    ukryte_haslo = ukryte_haslo + "-";
}

function wypisz_haslo()
{
    document.getElementById("plansza").innerHTML = ukryte_haslo;
}

window.onload = start;

function start()
{
    var tresc_diva = ""; 

    for(i=0; i<=25; i++)
    {
        var element = "lit" + i;
        tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+ String.fromCharCode(65+i) + '</div>';
        if ((i+1) % 6 == 0)   tresc_diva = tresc_diva + '<div style="clear:both;"></div>';
    }

    document.getElementById("alfabet").innerHTML = tresc_diva;

    wypisz_haslo();
}

function sprawdz(nr)
{
    //alert(nr); //test alert to check the number of the letter (visible after clickig)
    var trafiona = false;

    for (i=0; i<dlugosc; i++)
    {
        if (haslo[i] == String.fromCharCode(65+nr))
        {
            //String.replaceChar(i, haslo[i]);            
            replaceChar(i, haslo[i]);
            trafiona = true;
        }        
    }

    pokoloruj(nr, trafiona);

    
    if (!trafiona)
    {
        if (skucha<9)
        {
            skucha ++;
            changeImg(skucha);
        }
        else
            looser();
    }

    trafiona = false;  
    
    //wygrana
    if (haslo.join("") == ukryte_haslo)
        winner();
}

function pokoloruj(nr, trafiona)
{
    if (trafiona)
    {
        yes.play();
        var element = "lit" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";

        wypisz_haslo();
    }
    else
    {
        no.play();
        var element = "lit" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick",";");
    }
    
}

function replaceChar(place, sign)
{
    /*
    if (place > this.length-1)
        return this.toString();
    else
        return this.substr(0,place) + sign + this.substr(place + 1);
*/
    ukryte_haslo = ukryte_haslo.split("");
    ukryte_haslo[place] = sign;
    ukryte_haslo = ukryte_haslo.join("");
}

function changeImg(img_nr)
{
    var file = "<img src=\"img/s" + img_nr + ".jpg\" />";
    document.getElementById("szubienica").innerHTML = file;
}



function winner()
{
    document.getElementById("alfabet").innerHTML = "Correct. You are the winner!<br />" +haslo.join("")+'<br /><br /><span class="reset" onclick="location.reload()">ONCE AGAIN?</span>'
}

function looser()
{
    document.getElementById("alfabet").innerHTML = "You are the looser!" + '<br /><br /><span class="reset" onclick="location.reload()">ONCE AGAIN?</span>'
}