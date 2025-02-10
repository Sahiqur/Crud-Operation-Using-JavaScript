var selectRow = null;

function showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);
    
    setTimeout(()=> document.querySelector(".alert").remove(),3000);
}

// Clear All Fields

function clearAllFields(){
    document.querySelector("#FirstName").value = "";
    document.querySelector("#LastName").value = "";
    document.querySelector("#RollNo").value = "";

}

// Add data



document.querySelector("#student-form").addEventListener("submit",(e) =>{
    e.preventDefault();
    const firstName = document.querySelector("#FirstName").value;
    const lastName = document.querySelector("#LastName").value;
    const RollNo = document.querySelector("#RollNo").value;
    
    if(firstName === "" || lastName === "" || RollNo === ""){
        showAlert("Please fill all fields", "warning");
        return;
    }
    else{
        if(selectRow == null){
            const list = document.querySelector("#student-list");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${RollNo}</td>
        <td>
            <button class="btn btn-warning edit-btn">Edit</button>
            <button class="btn btn-danger delete-btn">Delete</button>
        </td>
        `;
        list.appendChild(row);
        localStorage.setItem("lisr",JSON.stringify(list));
        selectRow = null;
        clearAllFields();
        showAlert("Student Data Added", "success");
        }
        else{
        selectRow.children[0].textContent= firstName;
        selectRow.children[1].textContent= lastName;
        selectRow.children[2].textContent= RollNo;
        selectRow = null;
        showAlert("Student Info Edited", "Info");
    
        clearAllFields();
        }
    }
    
        
})

// Edited Data

document.querySelector("#student-list").addEventListener("click", (e)=>{
    target = e.target;
    if(target.classList.contains("edit-btn")){
    selectRow = target.parentElement.parentElement;
    
    document.querySelector("#FirstName").value = selectRow.children[0].textContent;
    document.querySelector("#LastName").value = selectRow.children[1].textContent;
    document.querySelector("#RollNo").value = selectRow.children[2].textContent;
    }
})


// Delete Data
document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;

    if(target.classList.contains("delete-btn")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});