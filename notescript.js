const add = document.querySelector(".add");
const updatels=()=>{
    const allnotes=document.querySelectorAll("textarea");
    const notes=[];
    allnotes.forEach((currentElement)=>{
        return notes.push(currentElement.value);
    })

    const saved=localStorage.setItem('notes',JSON.stringify(notes));//takes key value pair but second is always string so convert array to string
    // console.log(notes);
    
}
const addnotefield = (text = "") => {//default hat is for add button
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.classList.add("notecontaineer");

    const htmlData = `
        <div class="operation">
            <span>Keep it</span>
            <div class="btns"><button class="edit"><i class="far fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash"></i></button></div>
        </div>
        <div class="savednote ${text ? "" : "hidden"}">${text ? text : ""}</div>
        <textarea name="" class="textbox ${text ? "hidden" : ""}">${text ? text : ""}</textarea>
    `;

    div.insertAdjacentHTML('afterbegin', htmlData);

    // Getting references
    const edit = div.querySelector(".edit");
    const deletebutton = div.querySelector(".delete");
    const textfield = div.querySelector("textarea");
    const savednote = div.querySelector(".savednote");

    // Edit button logic
    edit.addEventListener('click', () => {
        textfield.classList.toggle("hidden");
        savednote.classList.toggle("hidden");
       
    });

    // Delete button logic
    deletebutton.addEventListener('click', () => {
        div.remove(); // Remove the note from the DOM
        updatels();//update again after deleting...
    });

    // Textarea change event to update the local storage
    textfield.addEventListener('change', (event) => {
        text = event.target.value;
        savednote.innerHTML = text;
         //to save
         updatels();
    });

    // Append the note as the last child of the container
    main.appendChild(div);
};

// // On page load, load saved notes from localStorage
// document.addEventListener('DOMContentLoaded', () => {
//     Object.keys(localStorage).forEach(key => {
//         if (key.startsWith('noteval_')) {
//             const text = localStorage.getItem(key);
//             addnotefield(text, key); // Add note with the saved text and pass the key
//         }
//     });
// });
//get data
const fetchedNotes=JSON.parse(localStorage.getItem('notes'));
console.log(fetchedNotes);
if (fetchedNotes) {
    fetchedNotes.forEach((individualnote)=>{addnotefield(individualnote)});
}

// Add new note on button click
add.addEventListener('click', () => addnotefield());
