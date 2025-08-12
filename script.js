const API_URL = "http://127.0.0.1:5000/notes";

async function fetchNotes() {
    let res = await fetch(API_URL);
    let notes = await res.json();
    let list = document.getElementById("notesList");
    list.innerHTML = "";
    notes.forEach(note => {
        let li = document.createElement("li");
        li.textContent = note[1];
        list.appendChild(li);
    });
}

async function addNote() {
    let noteContent = document.getElementById("noteInput").value;
    if (!noteContent) return;
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteContent })
    });
    document.getElementById("noteInput").value = "";
    fetchNotes();
}

fetchNotes();
