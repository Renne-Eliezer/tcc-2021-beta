const db = firebase.firestore();

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = '';

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
const saveTask = (title, description) =>
  db.collection("tasks").doc().set({
    title,
    description,
  });

const getTasks = () => db.collection("tasks").get();

const onGetTasks = (callback) => db.collection("tasks").onSnapshot(callback);

const deleteTask = (id) => db.collection("tasks").doc(id).delete();

const getTask = (id) => db.collection("tasks").doc(id).get();

const updateTask = (id, updatedTask) => db.collection('tasks').doc(id).update(updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
    <h3 class="h5">${task.title}</h3>
    <p>${task.description}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
    </div>
  </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteTask(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  try {
    if (!editStatus) {
      await saveTask(title.value, description.value);
    } else {
      await updateTask(id, {
        title: title.value,
        description: description.value,
      })

      editStatus = false;
      id = '';
      taskForm['btn-task-form'].innerText = 'Save';
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});
//Perguntas do quiz na tela

/*window.addEventListener("DOMContentLoaded", async (e) => {
   
    onGetQ((querySnapshot) => {
        sectionquiz.innerHTML = "";
      
  
      querySnapshot.forEach((doc) => {
          
        const task = doc.data();
  
        sectionquiz.innerHTML += `<div class="row mt-5 ">
        <div class="col"></div>
        <div class="card col" style="max-width: 900px; max-height: 900px;">
                <div class="mb-3 ml-3 mr-3 mt-3">
                    <h5 class="card-title" id="title-enunciado">${task.enunciado}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${task.categoria}</h6>
                </div>
                <div class="mb-3 ml-3 mr-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="R-A">
                        <label class="form-check-label" for="flexRadioDefault1">
                          ${task.A}
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="R-B" >
                        <label class="form-check-label" for="flexRadioDefault2">
                          ${task.B}
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="R-C" >
                        <label class="form-check-label" for="flexRadioDefault2">
                          ${task.C}
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="R-D" >
                        <label class="form-check-label" for="flexRadioDefault2">
                          ${task.D}
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="R-E" >
                        <label class="form-check-label" for="flexRadioDefault2">
                          ${task.E}
                        </label>
                    </div>
                </div>
                <button type="submit" class="btn-primary mb-3">Responder</button>
        </div>
        <div class="col"></div>
    </div>`;
      });
  
  
      
    });
  });*/

