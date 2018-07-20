function setTime(){
var d = new Date();
document.getElementById("hour").innerHTML = d.getHours() % 12;
  if(d.getHours() >= 12) {document.getElementById("daytime").innerHTML = "PM";
                       }
  else
  {document.getElementById("daytime").innerHTML = "AM";}
document.getElementById("min").innerHTML = (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
document.getElementById("sec").innerHTML = (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
}

setInterval(setTime, 1000);