document.getElementById("save-btn").addEventListener("click", function() {
    let noteText = document.getElementById("note-input").value;
    if (noteText.trim() === "") return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("note-input").value = "";
    displayNotes();
});

function displayNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let list = document.getElementById("notes-list");
    list.innerHTML = "";
    notes.forEach(note => {
        let li = document.createElement("li");
        li.textContent = note;
        list.appendChild(li);
    });
}

// Display saved notes on page load
displayNotes();
