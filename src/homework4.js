 
 function giveTime(now){

  let days=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  let today=days[now.getDay()];
  let hours= now.getHours();
  let minutes=now.getMinutes();

 if (hours<10){
    hours=`0${hours}`;
 }
 if (minutes<10){
    minutes=`0${minutes}`;
 }
  return `${now.getDate()}/${now.getMonth()+1} <br> ${today} ${hours}:${minutes} <br> 15°/22°`;
  }

 let now= new Date();
 let day =document.querySelector("#dateNow");
 day.innerHTML=giveTime(now);



function searching (event){
  event.preventDefault();
  let apiKey = "c56134558ca84ab1e7072449202b8614";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let nowCity=document.querySelector("#citySearch");

 let info2 = `${apiUrl}${nowCity.value}&units=metric&appid=${apiKey}`;
 console.log(info2);

   function showPlace (response){
   
   let city= document.querySelector("#cityNow");
   city.innerHTML=`${response.data.name}`;

    let clima= document.querySelector("#temp");
   clima.innerHTML=`${Math.round(response.data.main.temp)}°`;
   }







 axios.get(info2).then(showPlace);


}

let currCity=document.querySelector("#lookforcity");
currCity.addEventListener("submit",searching);



function changeCel(event){
event.preventDefault();
let tempElement= document.querySelector("#temp");
tempElement.innerHTML=19;
}


function changeFah(event){
event.preventDefault();
let tempElement= document.querySelector("#temp");
tempElement.innerHTML=66;
}


let tempC=document.querySelector("#celcius");
let tempF=document.querySelector("#fAH");
tempC.addEventListener("click",changeCel);
tempF.addEventListener("click",changeFah);

 


function getLoc(event){

  event.preventDefault();

     function showPosition(position){

     let apiKey = "c56134558ca84ab1e7072449202b8614";
     let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

     let latitude= position.coords.latitude;
     let longitude= position.coords.longitude;


     let info = `${apiUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
     

       function showTemperature(response) {
        let temperature = Math.round(response.data.main.temp)
        let lugar= response.data.name;    
    
        let h1 = document.querySelector("#cityNow");
        h1.innerHTML = `${lugar}`;
        let h1Temp=document.querySelector("#temp");
        h1Temp.innerHTML = `${temperature}°`;
       }

      axios.get(info).then(showTemperature);

    }

    navigator.geolocation.getCurrentPosition(showPosition);
}


let place=document.querySelector("#currLoc");
place.addEventListener("click", getLoc)   
