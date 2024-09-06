const add = document.querySelector(".add");
let textindex = 0;

const addnotefield = (text = "", key = `noteval_${textindex++}`) => {//default hat is for add button
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.classList.add("notecontaineer");

    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash"></i></button>
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

        // Save the updated value of textarea to localStorage
        const currentText = textfield.value;
        localStorage.setItem(key, currentText); // Save the current text
        savednote.innerHTML = currentText; // Update savednote content
    });

    // Delete button logic
    deletebutton.addEventListener('click', () => {
        div.remove(); // Remove the note from the DOM
        localStorage.removeItem(key); // Remove from localStorage
    });

    // Textarea change event to update the local storage
    textfield.addEventListener('input', (event) => {
        text = event.target.value;
    });

    // Append the note as the last child of the container
    main.appendChild(div);
};

// On page load, load saved notes from localStorage
document.addEventListener('DOMContentLoaded', () => {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('noteval_')) {
            const text = localStorage.getItem(key);
            addnotefield(text, key); // Add note with the saved text and pass the key
        }
    });
});

// Add new note on button click
add.addEventListener('click', () => addnotefield());
