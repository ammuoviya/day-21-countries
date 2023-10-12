let arrobj=[];
let data = [];

fetch('https://restcountries.com/v2/all')
  .then((response) => response.json())
  .then((res) => {
    data = res;
    console.log(data)
   console.log(data.length);
   
  
   for(let i=0;i<data.length;i++)
   {
    let s={} 
     s['name']=data[i].name;
     s['capital']=data[i].capital;
     s['region']=data[i].region;
     s['flag']=data[i].flag;
     s['code']=data[i].alpha3Code;
     s['latlng']=data[i].latlng;
    
     arrobj.push(s);
    //  console.log(s)
   }
   console.log(arrobj)
  
   display(arrobj);
   
  })
  .catch((error) => {
    console.error('Error fetching data: ', error);
  });

  function display(arrobj)
  {
    for(let i=0;i<arrobj.length;i++)
    {  
    const country = arrobj[i];
  const name = document.createElement("h2");
  name.textContent = country.name;
  const flagImg = document.createElement("img");
 flagImg.setAttribute("class","card-img-top")
  flagImg.src = country.flag;
  flagImg.setAttribute("alt","sorry")
  const capital=document.createElement("p");
  capital.textContent=country.capital;
  ////
  const region=document.createElement("p");
  region.textContent=country.region;
  //
  const code=document.createElement("p");
  code.textContent=country.code;
  const latilngi=country.latlng;
  // console.log(latilngi)
  
  //////////////////////////////////////
  const row=document.getElementById("row");
  const colDiv=document.createElement("div");
  colDiv.setAttribute("class","col-lg-4 col-sm-12");
  row.append(colDiv);
  const cardDiv=document.createElement("div");
  cardDiv.setAttribute("class","card");

  const cardHead=document.createElement("div");
  cardHead.setAttribute("class","card-header");
  cardHead.append(name);
  cardDiv.appendChild(cardHead);
  /////////
  const imgDiv=document.createElement("div")
  imgDiv.setAttribute("class","imgDiv")
  imgDiv.appendChild(flagImg);
  cardDiv.appendChild(imgDiv);

  const cardBody=document.createElement("div");
  cardBody.setAttribute("class","card-body");

   const p1=document.createElement("p");
   p1.setAttribute("class","card-text")

   const tp1=document.createTextNode("Capital:")
   const space1=document.createTextNode(" ")
   p1.append(tp1,space1,capital.innerText);
   cardBody.append(p1);
   /////
   const p2=document.createElement("p");
   p2.setAttribute("class","card-text")
   const tp2=document.createTextNode("Region:")
   const space2=document.createTextNode(" ")
   p2.append(tp2,space2,region.innerText);
   cardBody.append(p2);
   //////
   const p3=document.createElement("p");
   p3.setAttribute("class","card-text")
   const tp3=document.createTextNode("Country Code:")
   const space3=document.createTextNode(" ")
   p3.append(tp3,space3,code.innerText);
   cardBody.append(p3);
   var popdiv=document.createElement("div");
   popdiv.setAttribute("id","popup")
   popdiv.innerHTML=`<h2>Weather Information</h2>
   <p id="p1"></p>
   <button onclick="hidePopup()">Close</button>`
   document.body.append(popdiv)
  
  
  const btncard=document.createElement("button");
  btncard.setAttribute("class","btn btn-primary");
  btncard.setAttribute("type","button");
  btncard.innerText="Click for Weather"; 
  btncard.onclick=function()
  {
    myFunction(latilngi)
    showPopup();
   
  }
  cardBody.append(btncard)
  cardDiv.appendChild(cardBody);
  
 colDiv.appendChild(cardDiv);
 
 
 }
}

function showPopup() {
  var popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "block";
  }
  else {
    console.error("Popup element not found");
  }
}

function hidePopup() {
  var popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "none";
  }
  else {
    console.error("Popup element not found");
  }
}
function myFunction(code1)
{
  let latitudeInput=code1[0];
  let longitudeInput=code1[1];
  console.log(latitudeInput,longitudeInput);
  
  getWeather(latitudeInput,longitudeInput);
  

  

}
function getWeather(lati,longi){
  const latitude = lati;
    const longitude =longi;
  
    // create the URL for the OpenWeather API call
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8058f39594374fc2f6966bcad02c65df`
    // make the API call using Fetch API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const temperature = (data.main.temp-273.15).toFixed(3);
        const description = data.weather[0].description;
        const sea_level=data.main.sea_level;
        const pressure=data.main.pressure;
        const humidity=data.main.humidity;
        const result = document.getElementById('p1');
        result.innerHTML = `Temperature: ${temperature} &deg;C <br>Humidity:${humidity}&percnt;<br>
         Description: ${description}`;
    })
    .catch(error => console.log("Error",error));

}


