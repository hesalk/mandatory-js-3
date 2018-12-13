//=====creat all global variables
let refreshbtn = document.querySelector("#refresh");
let breedbtn = document.querySelector("#breed");
let subbreedbtn = document.querySelector("#subbreed");
let list = document.querySelector("#list");
let btnholder = document.querySelector("#btnholder");
let sublist = document.querySelector("#sublist");
let drop = document.querySelector("#myDropdown");
let imgholder = document.querySelector("#defultimg");
//===== the req function
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
//dropdwn
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
//edit the main btn
refreshbtn.addEventListener('click',function(){
    refreshbtn.textContent = "Click here to see random dog"
    removebtn();
    removelist();
    req("GET","https://dog.ceo/api/breeds/image/random",)
    .then(function(data){
    renderimg(data)
})
})
req("GET","https://dog.ceo/api/breeds/image/random",)
  .then(function(data){
  renderimg(data)
})
//====== just a rendering fun
function renderimg(data){
    console.log(data)
    let img = document.querySelector("#defultimg")
    img.setAttribute("src", data.message);
}
// req all list
function rendersub(arr,element) {
    if(arr.length > 0){
        for (let i = 0; i < arr.length; i++) {
            const sub = arr[i];
            let li = document.createElement("li");
            li.textContent = sub;
            sublist.appendChild(li)
            li.addEventListener('click',function(){
                removebtn()
                subbreed(element,li.textContent);
                subbreedrefresh(element,li.textContent)
            })
            
        }
    }
    
}
req("GET","https://dog.ceo/api/breeds/list/all")
    .then(function(data){
        let object = data.message;
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = key;
                const arr = object[key];
                
                //Make all the list of all breed
                let newitem = document.createElement("a");
                newitem.textContent = element;
                drop.appendChild(newitem);
                newitem.addEventListener('click',function(){
                    removelist();
                    removebtn()
                    breed(newitem.innerHTML);
                    breedrefresh(newitem.innerHTML);
                    rendersub(arr,element);
                })
                if (window.location.hash === "#"+element) {
                    removelist();
                    removebtn()
                    breed(newitem.innerHTML);
                    breedrefresh(newitem.innerHTML);
                    rendersub(arr,element);
                }
                
            }
        }    
})
//req the breed
function breed(element){
    req("GET","https://dog.ceo/api/breed/"+element+"/images/random")
    .then(function(data){renderimg(data)})
}
//req the sub breed
function subbreed(element,el){
    req("GET","https://dog.ceo/api/breed/"+element+"/"+el+"/images/random")
        .then(function(data){
        renderimg(data);
        })
}
//make breed btn
console.log(imgholder)
function breedrefresh(element){
    refreshbtn.textContent = "Back to main"
    let btn = document.createElement("button");
    btn.className = "isbtn"
    btn.textContent = "You are now watching images of click here for more=> "+ element + " dogs";
    btnholder.appendChild(btn)
    btn.addEventListener('click',function(){
        breed(element);
    })
}
function subbreedrefresh(element,el){
    refreshbtn.textContent = "Back to main"
    let btn = document.createElement("button");
    btn.className = "isbtn"
    btn.textContent = "more "+ el;
    btnholder.appendChild(btn)
    btn.addEventListener('click',function(){
        subbreed(element,el);
    })
}
function removelist(){
    let all = document.querySelectorAll("li")
    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        element.remove();
    }
    
}
function removebtn() {
    if (document.querySelector(".isbtn")){
        document.querySelector(".isbtn").remove();
    }
    if (document.querySelector(".isbtn2")){
            document.querySelector(".isbtn2").remove();
    }
}




