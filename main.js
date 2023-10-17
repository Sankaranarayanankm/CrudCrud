let form =document.getElementById('form');
let itemList=document.getElementById('items');


// adding event to form 
form.addEventListener("submit" ,getValue);

// adding remove event
// itemList.addEventListener("click",removeItem);

// adding edit event
// itemList.addEventListener("click",editItem);




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

    
    // // storing in local storage
    // obj_serialize=JSON.stringify(obj);
    // localStorage.setItem(Inputname,obj_serialize);


    // storage in cloud storage(CrudCrud) using axios
    axios.post("https://crudcrud.com/api/5863dc111d604c0a84c15a258dcc7513/AppoinmentData",obj)
    .then(res=> console.log(res))
    .catch(err=>console.log(err));


    // let obj_deserialize=JSON.parse(locaflStorage.getItem("name"));
   
 }

//  function to read from local storage 
window.addEventListener("DOMContentLoaded", ()=> {
    // reading from crud crud 

    axios.get("https://crudcrud.com/api/5863dc111d604c0a84c15a258dcc7513/AppoinmentData")
    .then(res=> {
        for(let i=0;i<res.data.length;i++){
        showOutput(res.data[i]);
        }
    })
})
    

// function to show output in the screen 
function showOutput(userDetailsObj) {
    
    let name=userDetailsObj.name;
    let email=userDetailsObj.email;
    let phone=userDetailsObj.phoneNumber;
    let id=userDetailsObj._id;
    
    // outputing the contents in the screen 
    let li=document.createElement("li");

    // creating a textNode 
    let nameNode=document.createTextNode(name);
    let emailNode=document.createTextNode(email);
    let phoneNode=document.createTextNode(phone);

    // creating delete button
    let button= document.createElement('button');
    button.className="delete";
    button.onclick = (event) => removeItem(event,id);
    button.appendChild(document.createTextNode("delete"));
    
    // creating edit button 
    let edit=document.createElement("button");
    edit.className="edit";
    edit.onclick= (event)=> editItem(event,name,email,phone,id);
    edit.appendChild(document.createTextNode("edit"));
    
    // appeding the text node to the li
    li.append(nameNode,emailNode,phoneNode,button,edit);
    li.appendChild(document.createElement("br"));

    // appending li to itemlist
    itemList.appendChild(li)

};


 // function remove item
 function removeItem(event, id) {
    if (event.target.classList.contains("delete")) {
        axios.delete(`https://crudcrud.com/api/5863dc111d604c0a84c15a258dcc7513/AppoinmentData/${id}`)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
        let li = event.target.parentElement;
        itemList.removeChild(li);
    }
}

   
// edit item function 
function editItem(event,name,email,phone,id){
    if(event.target.classList.contains("edit")){

        document.getElementById("name").value=name;
        document.getElementById("email").value=email;
        document.getElementById("phone").value=phone;

        let li=event.target.parentElement;
        itemList.removeChild(li);
    }
    
    let obj={
        "name":document.getElementById("name").value,
        "email":document.getElementById("email").value,
        "phone":document.getElementById("phone").value
    }
    console.log(obj,id);
    axios.post(`https://crudcrud.com/api/5863dc111d604c0a84c15a258dcc7513/AppoinmentData/${id}`,obj)
    .then(res=>console.log(res))
    .catch(err=>console.log(err));
}