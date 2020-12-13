 
 //get the current time and date//
 
 function giveTime(timestamp){

  let now= new Date(timestamp);
  

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
  return `${now.getDate()}/${now.getMonth()+1} <br> ${today} ${hours}:${minutes}`;
   
  }


//look for ciy weather //


function searching (event){
  event.preventDefault();

  let apiKey = "c56134558ca84ab1e7072449202b8614";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let nowCity=document.querySelector("#citySearch");

  let info2 = `${apiUrl}${nowCity.value}&units=metric&appid=${apiKey}`;
 console.log(info2);

  //api for hourly forecast//
  let apiUrlFor = "https://api.openweathermap.org/data/2.5/forecast?q=";

 let infoForcast = `${apiUrlFor}${nowCity.value}&units=metric&appid=${apiKey}`;
 console.log(infoForcast);


 // information of weather searched//

   function showPlace (response){
   
   let city= document.querySelector("#cityNow");
   city.innerHTML=`${response.data.name}`;

   let clima= document.querySelector("#temp");
   clima.innerHTML=`${Math.round(response.data.main.temp)}°`;

   let rangeTemp=document.querySelector("#max_min");
   rangeTemp.innerHTML=`${Math.round(response.data.main.temp_min)}°/${Math.round(response.data.main.temp_max)}°
   <br ><small> Feels like: ${Math.round(response.data.main.feels_like)}°`;

   let infoWeather= response.data.weather[0].main;
   let status=document.querySelector("#status");
   status.innerHTML=`${infoWeather}`;

  let moreInfo= document.querySelector("#moreInfo");
  moreInfo.innerHTML=` Humidity: ${(response.data.main.humidity)}% <br> Wind speed: ${response.data.wind.speed} km/h`;

  let day =document.querySelector("#dateNow");
  day.innerHTML=giveTime(response.data.dt*1000);


    let emoji=document.querySelector("#emojihoy");
     emoji.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
     console.log(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);   

        }
      
 axios.get(info2).then(showPlace);

}

let currCity=document.querySelector("#lookforcity");
currCity.addEventListener("submit",searching);






//link for fareheim//

function changeFah(event){
event.preventDefault();

let apiKey = "c56134558ca84ab1e7072449202b8614";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
let nowCity=document.querySelector("#citySearch");

let info2 = `${apiUrl}${nowCity.value}&units=imperial&appid=${apiKey}`;
 
  function changeWeather(response){
    
  let tempElement= document.querySelector("#temp");
  tempElement.innerHTML=`${Math.round(response.data.main.temp)}°`;

  let rangeTemp=document.querySelector("#max_min");
  rangeTemp.innerHTML=`${Math.round(response.data.main.temp_min)}°/${Math.round(response.data.main.temp_max)}° 
  <br ><small> Feels like: ${Math.round(response.data.main.feels_like)}°`;

let moreInfo= document.querySelector("#moreInfo");
  moreInfo.innerHTML=` Humidity: ${(response.data.main.humidity)}% <br> Wind speed: ${response.data.wind.speed} mph`;

  }

  axios.get(info2).then(changeWeather);
}


let tempC=document.querySelector("#celcius");
let tempF=document.querySelector("#fAH");
tempC.addEventListener("click",searching);
tempF.addEventListener("click",changeFah);

 

//////////////// getting weather from current location//


function getLoc(event){
 event.preventDefault();

     function showPosition(position){

     let apiKey = "c56134558ca84ab1e7072449202b8614";
     let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

     let latitude= position.coords.latitude;
     let longitude= position.coords.longitude;


     let info = `${apiUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
     

       function showTemperature (response) {
    
        let city= document.querySelector("#cityNow");
       city.innerHTML=`${response.data.name}`;
 
        let clima= document.querySelector("#temp");
        clima.innerHTML=`${Math.round(response.data.main.temp)}°`;

        let rangeTemp=document.querySelector("#max_min");
        rangeTemp.innerHTML=`${Math.round(response.data.main.temp_min)}°/${Math.round(response.data.main.temp_max)}°
           <br ><small> Feels like: ${Math.round(response.data.main.feels_like)}°`;

        let infoWeather= response.data.weather[0].main;
        let status=document.querySelector("#status");
       status.innerHTML=`${infoWeather}`;

        let moreInfo= document.querySelector("#moreInfo");
        moreInfo.innerHTML=` Humidity: ${(response.data.main.humidity)}% <br> Wind speed: ${response.data.wind.speed} km/h`;

        let emoji=document.querySelector("#emojihoy");
       emoji.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
       console.log(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);


          }
       
    axios.get(info).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(showPosition);

}

let place=document.querySelector("#currLoc");
place.addEventListener("click", getLoc)   
