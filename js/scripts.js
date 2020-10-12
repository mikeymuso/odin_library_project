if (localStorage.getItem('library')) {
    var myLibrary = JSON.parse(localStorage.getItem("library"));
} else {
    var myLibrary = [{"title":"To Kill A Mockingbird","author":"Harper Lee","pages":"257","read":true},{"title":"Great Expectations","author":"Charles Dickes","pages":"430","read":true},{"title":"Lord Of The Flies","author":"William Golding","pages":"238","read":true}];
}

// Show the books on loading page first time
displayBooks();

// Book prototype
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    function displayBook() {
        var book = "<tr><td>" + this.title + "</td></tr>";
    }

}


function addBookToLibrary() {
    var title = document.getElementById("title");
    var author = document.getElementById("author");
    var pages = document.getElementById("pages");
    var read = document.getElementById("read");

    if (title.value && author.value && pages.value) {
        var ele1 = new Book(title.value, author.value, pages.value, read.checked);
        myLibrary.push(ele1);

        displayBooks();
        saveBooks();

        title.value = "";
        author.value = "";
        pages.value = "";
        read.checked = false;

        if (document.getElementById("emptyFieldAlert")) {
            document.getElementById("emptyFieldAlert").remove()
        }

    } else {

        if (!document.getElementById("emptyFieldAlert")) {

            var warning = document.createElement("div");
            var warningText = "Please complete all fields";
            warning.textContent = (warningText);
            warning.classList.add("alert");
            warning.setAttribute("id", "emptyFieldAlert");


            var buttonParent = document.getElementById("addBook").parentNode;
            var button = document.getElementById("addBook");

            buttonParent.insertBefore(warning, button);

        }
        //        alert("Please fill in all details");
    }
}


function displayBooks() {
    var tableOutput = document.getElementById("tableoutput");
    tableOutput.innerHTML = "";
    for (var i = 0; i < myLibrary.length; i++) {

        const newTr = document.createElement("tr");
        newTr.innerHTML = "<td>" + myLibrary[i]['title'] + "</td>";
        newTr.innerHTML += "<td>" + myLibrary[i]['author'] + "</td>";
        newTr.innerHTML += "<td>" + myLibrary[i]['pages'] + "</td>";

        if (myLibrary[i]["read"] === true) {
            console.log("TRUE");
            newTr.innerHTML += `<td><input type="checkbox" name="readCheckbox" value="${i}" checked></td>` + "</input>";
        } else {
            console.log("FALSE");
            newTr.innerHTML += `<td><input type="checkbox" name="readCheckbox" value="${i}"></td>` + "</input>";
        }

        newTr.innerHTML += `<td><button onclick="deleteBook(${i})" class="deleteBook">Remove</button></td>`;

        tableOutput.appendChild(newTr);


    }

    var checkboxes = document.getElementsByName("readCheckbox")

    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("change", function () {
            if (myLibrary[this.value]['read'] === true) {
                myLibrary[this.value]['read'] = false;
                saveBooks();
            } else {
                myLibrary[this.value]['read'] = true;
                saveBooks();
            }

            console.log(myLibrary[this.value]['read']);
        })
    }
}

function saveBooks() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}


function deleteBook(id) {
    this.id = id
    myLibrary.splice(id, 1);
    saveBooks();
    displayBooks();
}