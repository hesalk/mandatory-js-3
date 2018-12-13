//this will get a random 
req("GET","https://dog.ceo/api/breed/"+element+"/images/random",)
.then(function(data){
renderimg(data)
})

//Make the list 
function makeList(){
    req("GET", "https://dog.ceo/api/breeds/list/all",)
    .then(function(data){
        let obj = data.message;
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const listItem = key;
                const array = object[key];
                let newitem = document.createElement("a");
                newitem.textContent = element;
                drop.appendChild(newitem);
            }
        }
    })
}
console.log(element);
btn.textContent = "back to random"
document.querySelector("#myDropdown").className = "dropdown-content";
console.log('test')
req("GET","https://dog.ceo/api/breed/"+element+"/images/random",)
  .then(function(data){
  renderimg(data)
  })
  if(window.location.hash) {
    // Fragment exists
    console.log("no#");
  } else {
    // Fragment doesn't exist
    req("GET","https://dog.ceo/api/breeds/image/random",)
    .then(function(data){
    renderimg(data)
  })
  }
  console.log(element);
  btn.textContent = "back to random"
  document.querySelector("#myDropdown").className = "dropdown-content";
  console.log('test')
  req("GET","https://dog.ceo/api/breed/"+element+"/images/random",)
    .then(function(data){
    renderimg(data);

    }