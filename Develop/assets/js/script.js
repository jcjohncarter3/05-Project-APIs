// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
// WHAT IS THIS FUNCTION DOING? This function should increment the nextId variable and update it in local storage. 
function generateTaskId() {
    console.log('inside generateTaskId() function')
    if (nextId === null) {
        nextId = 1;
    } else {
        nextId++;
    }
    console.log('nextId: ', nextId)

    // TODO: save nextId to localStorage 
    localStorage.setItem("nextId", JSON.stringify(nextId)); 


    // TODO: return nextId; 
    return nextId;
}

// Todo: create a function to create a task card
// WHAT IS THIS FUNCTION DOING?  This function should create an HTML card element for a given task object
function createTaskCard(task) {
    console.log('inside createTaskCard() with data passed: ', task)
    // TODO: create card elements (HINT: Module 5, Mini Project SOLVED, script.js, lines 37-67)
        const taskCard = $('<div>')
              .addClass('card task-card draggable my-3')
              .attr('data-id', task.id);
        const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
        const cardBody = $('<div>').addClass('card-body');
        const cardDescription = $('<p>').addClass('card-text').text(task.description);
        const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
        const cardDeleteBtn = $('<button>')
            .addClass('btn btn-danger delete')
            .text('Delete')
            .attr('data-id', task.id);
        cardDeleteBtn.on('click', handleDeleteTask);

    // TODO: set card background color based on due date 
         if (task.dueDate && task.status !== 'done') {
         const now = dayjs();
         const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
         if (now.isSame(taskDueDate, 'day')) {
           taskCard.addClass('bg-warning text-white');
         } else if (now.isAfter(taskDueDate)) {
          taskCard.addClass('bg-danger text-white');
          cardDeleteBtn.addClass('border-light');
         }
           }

    // TODO: append card elements 
        cardBody.append(cardDueDate, cardDescription, cardDeleteBtn);
        taskCard.append(cardHeader, cardBody);

    // TODO: return the card so it can be appended to the correct lane. 
    // const todoCardsColumn = $('#todo-cards');
    // todoCardsColumn.append(taskCard);

    return taskCard; 

}

// Todo: create a function to render the task list and make cards draggable
// WHAT IS THIS FUNCTION DOING? This function should render all the task cards in their respective lanes &&  make them draggable using jQuery UI
function renderTaskList() {
    // // TODO: write an if/else statement where IF taskList is null, set it to an empty array
    if (!taskList ){
        taskList = [] 
    }
    // // TODO: empty existing task cards   
    //     Example: 
        const todoList = $('#todo-cards');
        todoList.empty();

        const inProgressList = $('#in-progress-cards');
        inProgressList.empty();

        const doneList = $('#done-cards');
        doneList.empty();

    // // TODO: loop through tasks and create task cards for each status 
    //     Example: 
          for (let task of taskList) {
        if (task.status === 'to-do') {
            todoList.append(createTaskCard(task));
          } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
          } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
          }
        }

    // TODO: use JQuery UI to make task cards draggable
    //     Example: 
        $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
           
        helper: function (e) {
           
            const original = $(e.target).hasClass('ui-draggable')
              ? $(e.target)
              : $(e.target).closest('.ui-draggable');
            
            return original.clone().css({
              maxWidth: original.outerWidth(),
            });
          },
        });
}

// Todo: create a function to handle adding a new task
// WHAT IS THIS FUNCTION DOING? This function should handle the form submission for adding a new task
function handleAddTask(event){
    console.log('got here inside the handleAddTask() function')
        // TODO: method to prevent default behavior of browser event
 
        event.preventDefault(); 
        
        // TODO: create a new task object
 
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

        // createTaskCard(task);
        // TODO: add the new task to the task list
 
        taskList.push(task)
        // const projects = [];
        
        // TODO: save to local storage 
        localStorage.setItem('tasks', JSON.stringify(taskList));
        // TODO: call renderTaskList() 
        renderTaskList()
        // TODO: clear the form inputs 
 
            $('#tasks-title').val('');
            $('#description').val('');
            $('#tasks-due-date').val('');
}

// Todo: create a function to handle deleting a task
// WHAT IS THIS FUNCTION DOING? This function should handle deleting a task when the delete button is clicked
function handleDeleteTask(event){
    console.log('inside handleDeleteTask()');
    // TODO: method to prevent default behavior of browser event

    // TODO: get the task id from the button clicked  
        const taskId = $(this).attr('data-id'); //1, 2, 100
        // console.log('projectId: ' + projectId); // 'projectId: 1' in the console log
       
        // const projectIdHash ='#' + projectId;
        // console.log('projectIdHash: ' + projectIdHash); // '# 1'
        // // console.log(`projectID with hashtag: `)
        // $(projectIdHash).remove(); // removing id="1" or "#1"



    // TODO: remove the task from the taskList using the filter (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method 
        taskList = taskList.filter((task) => task.id !== parseInt(taskId));  

    // TODO: save to local storage  
         localStorage.setItem('tasks', JSON.stringify(taskList));
    
    // TODO: call renderTaskLIst() 
    renderTaskList ()
}

// Todo: create a function to handle dropping a task into a new status lane
// WHAT IS THIS FUNCTION DOING? This function should handle changing the status of a task when it is dropped into a new lane.
function handleDrop(event, ui) {
    // TODO: get the task id and new status from the event 
        const taskId = ui.draggable.data('id')
        const newStatus = event.target.id;

    //TODO: write a for...of loop to update the task status of the dragged card  
        for (let task of taskList) {
        if (task.id === taskId) {
            task.status = newStatus;
          }
        }

    // TODO: save to local storage  
         localStorage.setItem('tasks', JSON.stringify(taskList));
 
    // TODO: call renderTaskList()
    renderTaskList()
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    console.log('document should be ready');
    // TODO: render the task list 
    renderTaskList()
    // TODO: add event listener 
    $("#taskForm").on('submit', handleAddTask)
    // TODO: make lanes droppable 

    // TODO: make due date field a date picker
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
      });
      // make due date field a date picker
      $('#tasks-due-date').datepicker({
        changeMonth: true,
        changeYear: true,
      });
    

});