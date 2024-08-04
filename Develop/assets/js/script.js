// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
// WHAT IS THIS FUNCTION DOING? This function should increment the nextId variable and update it in local storage. 
function generateTaskId() {
    console.log('inside generateTaskId() function')
    // console.log('nextId: ', nextId)
    // TODO: write an if/else statement where IF nextId does not exist in 
    // localStorage (hint: it's null), set nextId to 1.  ELSE, increment it 
    //by 1 (Docs for Increment: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment)
    if (nextId === null) {
        nextId = 1;
    } else {
        nextId++;
    }
    console.log('nextId: ', nextId)

    // TODO: save nextId to localStorage
    // Example: localStorage.setItem("variableName", JSON.stringify(variableName)); 
    // localStorage.setItem("nextId", JSON.stringify(varnextIdiableName)); 


    // TODO: return nextId; 
    return nextId;
}

// Todo: create a function to create a task card
// WHAT IS THIS FUNCTION DOING?  This function should create an HTML card element for a given task object
function createTaskCard(task) {
    console.log('inside createTaskCard() with data passed: ', task)
    // TODO: create card elements (HINT: Module 5, Mini Project SOLVED, script.js, lines 37-67)
        //Example: 
        const taskCard = $('<div>')
              .addClass('card project-card draggable my-3')
              .attr('data-project-id', task.id);
        const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
        const cardBody = $('<div>').addClass('card-body');
        const cardDescription = $('<p>').addClass('card-text').text(task.description);
        const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
        const cardDeleteBtn = $('<button>')
            .addClass('btn btn-danger delete')
            .text('Delete')
            .attr('data-project-id', task.id);
        // cardDeleteBtn.on('click', handleDeleteProject);

    // TODO: set card background color based on due date
        // Example: 
        // if (project.dueDate && project.status !== 'done') {
        // const now = dayjs();
        // const taskDueDate = dayjs(project.dueDate, 'DD/MM/YYYY');
        // if (now.isSame(taskDueDate, 'day')) {
        //   taskCard.addClass('bg-warning text-white');
        // } else if (now.isAfter(taskDueDate)) {
        //   taskCard.addClass('bg-danger text-white');
        //   cardDeleteBtn.addClass('border-light');
        // }
        //   }

    // TODO: append card elements
        // Example: 
        cardBody.append(cardDueDate, cardDescription, cardDeleteBtn);
        taskCard.append(cardHeader, cardBody);

    // TODO: return the card so it can be appended to the correct lane. 
    const todoCardsColumn = $('#todo-cards');
    todoCardsColumn.append(taskCard);

}

// Todo: create a function to render the task list and make cards draggable
// WHAT IS THIS FUNCTION DOING? This function should render all the task cards in their respective lanes &&  make them draggable using jQuery UI
function renderTaskList() {
    // TODO: write an if/else statement where IF taskList is null, set it to an empty array

    // TODO: empty existing task cards   
        // Example: 
        // const todoList = $('#todo-cards');
        // todoList.empty();

        // const inProgressList = $('#in-progress-cards');
        // inProgressList.empty();

        // const doneList = $('#done-cards');
        // doneList.empty();

    // TODO: loop through tasks and create task cards for each status 
        // Example: 
        //   for (let project of projects) {
        // if (project.status === 'to-do') {
        //     todoList.append(createProjectCard(project));
        //   } else if (project.status === 'in-progress') {
        //     inProgressList.append(createProjectCard(project));
        //   } else if (project.status === 'done') {
        //     doneList.append(createProjectCard(project));
        //   }
        // }

    // TODO: use JQuery UI to make task cards draggable
        // Example: 
        // $('.draggable').draggable({
        // opacity: 0.7,
        // zIndex: 100,
            // function to clone the card being dragged so that the original card remains in place
        // helper: function (e) {
            // check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            // const original = $(e.target).hasClass('ui-draggable')
            //   ? $(e.target)
            //   : $(e.target).closest('.ui-draggable');
            // return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
        //     return original.clone().css({
        //       width: original.outerWidth(),
        //     });
        //   },
        // });
}

// Todo: create a function to handle adding a new task
// WHAT IS THIS FUNCTION DOING? This function should handle the form submission for adding a new task
function handleAddTask(event){
    console.log('got here inside the handleAddTask() function')
        // TODO: method to prevent default behavior of browser event
            // Example: 
        // event.preventDefault(); 
        
        // TODO: create a new task object
            // Example: 
        const taskTitle = $('#tasks-title').val();
        console.log('tasksTitle: ', taskTitle);

        const taskDueDate = $('#tasks-due-date').val();
        console.log('taskDueDate: ', taskDueDate); 

        const taskDescription = $('#description').val(); // the value of the textarea
        console.log('taskDescription: ', taskDescription);

        const taskId = generateTaskId();
        console.log('taskId: ', taskId);

        const task = {
            id: taskId,
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate,
            status: 'to-do'
        }; 
        console.log('task data put together is: ', task);

        createTaskCard(task);
        // TODO: add the new task to the task list
            // Example: 
            // projects.push(newProject)
        // const projects = [];
        
        // TODO: save to local storage 

        // TODO: call renderTaskList() 

        // TODO: clear the form inputs 
            // Example: 
            // $('#idForTaskTitle').val('');
            // $('#idForTaskDescription').val('');
            // $('#idForTaskDueDate').val('');
}

// Todo: create a function to handle deleting a task
// WHAT IS THIS FUNCTION DOING? This function should handle deleting a task when the delete button is clicked
function handleDeleteTask(event){
    // TODO: method to prevent default behavior of browser event

    // TODO: get the task id from the button clicked 
        // Example: 
        // const projectId = $(this).attr('data-project-id');

    // TODO: remove the task from the taskList using the filter (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method
        // Example: 
        // projectList = projectList.filter((project) => project.id !== parseInt(projectId));  

    // TODO: save to local storage 
        // Example: 
        //  localStorage.setItem('projects', JSON.stringify(projects));
    
    // TODO: call renderTaskLIst() 
}

// Todo: create a function to handle dropping a task into a new status lane
// WHAT IS THIS FUNCTION DOING? This function should handle changing the status of a task when it is dropped into a new lane.
function handleDrop(event, ui) {
    // TODO: get the task id and new status from the event
        // Example: 
        // const taskId = ui.draggable[0].dataset.projectId;
        // const newStatus = event.target.id;

    //TODO: write a for...of loop to update the task status of the dragged card 
        // Example: 
        // for (let project of projects) {
        // if (project.id === taskId) {
        //     project.status = newStatus;
        //   }
        // }

    // TODO: save to local storage 
        // Example: 
        //  localStorage.setItem('projects', JSON.stringify(projects));
 
    // TODO: call renderTaskList()
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    console.log('document should be ready');
    // HINT: Module 5, Mini Project SOLVED, script.js, lines 201-215
    // TODO: render the task list 
    
    // TODO: add event listener 
    $("#add-task-btn").click(function() {
        console.log('The Enter button was clicked');
        console.log('About to call handleAddTask() function')
        handleAddTask();
    });
    // TODO: make lanes droppable 

    // TODO: make due date field a date picker
});