const form = document.getElementById("studentForm"); 
const studentList = getElementById("studentsList");

form.addEventListener('submit', async(e) => {
    e.preventDefault(); // cancel out default behaviour of the form. 

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;

    const response = await fetch ('/addStudent', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name, age, grade})
    });

    const message = await response.text();
    alert(message);

    if(response.ok){
        getStudents(); // display list of students
        form.reset(); //reset the form
    }
});

async function getStudents(){
    studentList.innerHTML = ""; // display in the student list container

    const response = await fetch('/students');
    const students = await response.json(); // variable to hold students data

    students.forEach(student => {  // for each student run the callback
        const studentItem = document.createElement('div');
        studentItem.innerHTML = `
        <p>Name: ${student.name}</p>
        <p>Age: ${student.age}</p>
        <p>Gradw: ${student.grade}</p>
        <button onclick = "editStudent(${student.id})">Edit</button>
        <button onclick = "deleteStudent(${student.id})">Delete</button>
        `;
        studentList.appendChild(studentItem); // display the students detail in the container
    });
}

async function editStudent(id){
    // implement
}

async function deleteStudent(id) {
    await fetch(`/deleteStudent/${id}`,{
        method:'DELETE'
    });

    getStudents();
}

getStudents();
