//=====creat all global variables
let btn = document.querySelector("#refresh");
let list = document.querySelector("#list");
let btnholder = document.querySelector("#btnholder");
let sublist = document.querySelector("#sublist");
let drop = document.querySelector("#myDropdown");
//===== the req fun (thank you Viktor)i'll use all the time :)
function req(method, url, data) {
    return new Promise(function(resolve, reject) {
      let req = new XMLHttpRequest();
      req.addEventListener('load', function() {
        if (this.status >= 200 && this.status < 300) {
          let data1 = null;
          if (this.responseText) {
            data1 = JSON.parse(this.responseText);
          } 
          resolve(data1);
        } else {
          reject(new Error('Invalid status'));
        }
      });
      
      req.open(method, url);
      if (data) {
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));
      } else {
        req.send();
      }
    });
}
// dropdwn
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// find a dog
function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
      } else {
          a[i].style.display = "none";
      }
  }
}
//====== just a rendering fun
function renderimg(data){
  console.log(data)
  let img = document.querySelector("#defultimg")
  img.setAttribute("src", data.message);
}
//======get started======

req("GET","https://dog.ceo/api/breeds/image/random",)
  .then(function(data){
  renderimg(data)
})

//test
function name(data) {
  {
 
    console.log(data.message);
    console.log(data);
    let object = data.message;
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = key;
        const arr = object[key];
        
        
        //Make all the list of all breed
        let newitem = document.createElement("a");
        newitem.textContent = element;
        
        drop.appendChild(newitem);
        newitem.addEventListener('click', function lol(){
          
          //obs make this a function
          if (document.querySelector(".morebtnIsOn")) {
            if (document.querySelectorAll(".morebtnIsOn")) {
              let isclass = document.querySelectorAll(".morebtnIsOn");
              isclass.forEach(element => {
                element.remove();
              });
            }
          }
          //here we start showing the selected breed
          btn.textContent = "back to random"
          document.querySelector("#myDropdown").className = "dropdown-content";
          console.log('test')
            req("GET","https://dog.ceo/api/breed/"+element+"/images/random",)
              .then(function(data){
              renderimg(data);
              
              if (arr.length > 0) {
                for (let i = 0; i < arr.length; i++) {
                  const el = arr[i];
                  let newsub = document.createElement("li");
                  newsub.textContent = el;
                  newsub.className = "morebtnIsOn"
                  sublist.appendChild(newsub);
                  newsub.addEventListener('click',function(){
                    req("GET","https://dog.ceo/api/breed/"+element+"/"+el+"/images/random")
                    .then(function(data){
                      renderimg(data);
                      let morebtn = document.createElement("button");
                      morebtn.textContent = "get more sub "+el;
                      morebtn.className = "morebtnIsOn"
                      morebtn.addEventListener('click', function(){
                        req("GET","https://dog.ceo/api/breed/"+element+"/"+el+"/images/random",)
                        .then(function(data){
                          renderimg(data);
              
                         }  )
                      })
                      btnholder.appendChild(morebtn);
                    })
                  })
                }
              }
            })
          let morebtn = document.createElement("button");
          morebtn.textContent = "get more "+element;
          morebtn.className = "morebtnIsOn"
          morebtn.addEventListener('click', function(){
            req("GET","https://dog.ceo/api/breed/"+element+"/images/random",)
              .then(function(data){
              renderimg(data);
              
            })
          })
          btnholder.appendChild(morebtn);
        })
      }
    }
  }
}
//test end

//====== refresh btn=======
btn.addEventListener('click', function(){
  btn.textContent = "More random"
  //obs make this a function
  if (document.querySelector(".morebtnIsOn")) {
    if (document.querySelectorAll(".morebtnIsOn")) {
      let isclass = document.querySelectorAll(".morebtnIsOn");
      isclass.forEach(element => {
        element.remove();
      });
    }
  }
  req("GET","https://dog.ceo/api/breeds/image/random",)
  .then(function(data){
    renderimg(data)
  })
})

//========Get it all==========
req("GET", "https://dog.ceo/api/breeds/list/all",)
.then(function(data){name(data)})
//get the if
