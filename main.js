let form =document.getElementById('form');
let itemList=document.getElementById('items');


// adding event to form 
form.addEventListener("submit" ,getValue);

// adding remove event
itemList.addEventListener("click",removeItem);

// adding edit event
itemList.addEventListener("click",editItem);




// get value function
 function getValue(event) {
    event.preventDefault();

  // getting users value of name email and phone
  let Inputname=document.getElementById('name').value;
  let email=document.getElementById('email').value;
  let phone=document.getElementById('phone').value;
//  console.log(name,email,phone);
    // creating new li
    let li=document.createElement("li");

    // creating a textNode 
    let nameNode=document.createTextNode(Inputname);
    let emailNode=document.createTextNode(email);
    let phoneNode=document.createTextNode(phone);

    // creating delete button
    let button= document.createElement('button');
    button.className="delete";
    button.appendChild(document.createTextNode("delete"));
    
    // creating edit button 
    let edit=document.createElement("button");
    edit.className="edit";
    edit.appendChild(document.createTextNode("edit"));
    
    // appeding the text node to the li
    li.append(nameNode,emailNode,phoneNode,button,edit);
    li.appendChild(document.createElement("br"));

    // appending li to itemlist
    itemList.appendChild(li)
    
    // creating object to store the input values 
    let obj={
        "name":Inputname,
        "email":email,
        "phoneNumber":phone
    };

    // storage in cloud storage(CrudCrud) using axios
    axios.post("https://crudcrud.com/api/623a100fd8eb4c7ab8591e5ac6e5914a/AppoinmentData",obj)
    .then(res=> console.log(res))
    .catch(err=>console.log(err));

    // storing in local storage
    obj_serialize=JSON.stringify(obj);
    localStorage.setItem(Inputname,obj_serialize);

    // let obj_deserialize=JSON.parse(locaflStorage.getItem("name"));
   
 }

//  function to read from local storage 
window.addEventListener("DOMContentLoaded", ()=> {
    // reading from crud crud 

    axios.get("https://crudcrud.com/api/623a100fd8eb4c7ab8591e5ac6e5914a/AppoinmentData")
    .then(res=> {
        for(let i=0;i<res.data.length;i++){
        showOutput(res.data[i]);
        }
    })
    .catch(err=> console.log(err))


    // const localStorageObj=localStorage;
    // const localStorageKeys=Object.keys(localStorageObj);
    // for(let i=0;i<localStorageKeys.length;i++){
    //     let keys=localStorageKeys[i];
    //     let userDetailsString=localStorageObj[keys];
    //     let userDetailsObj=JSON.parse(userDetailsString);
    //     showOutput(userDetailsObj);
    }
    
)

// function to show output in the screen 
function showOutput(userDetailsObj) {
    let name=userDetailsObj.name;
    let email=userDetailsObj.email;
    let phone=userDetailsObj.phoneNumber;
    // console.log(name,email,phone)
    let li=document.createElement("li")
    let nameNode=document.createTextNode(name);
    let emailNode=document.createTextNode(email);
    let phoneNode=document.createTextNode(phone);

    // creating delete button
    let button= document.createElement('button');
    button.className="delete";
    button.appendChild(document.createTextNode("delete"));
    
    // creating edit button 
    let edit=document.createElement("button");
    edit.className="edit";
    edit.appendChild(document.createTextNode("edit"));
    
    // appeding the text node to the li
    li.append(nameNode,emailNode,phoneNode,button,edit);
    li.appendChild(document.createElement("br"));

    // appending li to itemlist
    itemList.appendChild(li)
}


 // function remove item
function removeItem(e){
    if(e.target.classList.contains("delete")){
        let li=e.target.parentElement;
        itemList.removeChild(li);

        // removing item from local storage
        let itemName = li.childNodes[0].textContent;
        localStorage.removeItem(itemName);
        console.log(itemName);
    }
}
   
// edit item function 
function editItem(e){
    if(e.target.classList.contains("edit")){
        let li=e.target.parentElement;
        itemList.removeChild(li);

        // removing item from local storage
        let itemName = li.childNodes[0].textContent;
        let Inputname = document.getElementById('name');
        let email = document.getElementById('email');
        let phone = document.getElementById('phone');

        Inputname.value = li.childNodes[0].textContent;
        
        Inputname.value= li.childNodes[0].textContent;
        email.value=li.childNodes[1].textContent;
        phone.value=li.childNodes[2].textContent;

        localStorage.removeItem(itemName);
}
}