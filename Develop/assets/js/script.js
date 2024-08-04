// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

function TaskBoard() {
    const [taskList, setTaskList] = useState([]);
    const [nextId, setNextId] = useState(1);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        const storedNextId = JSON.parse(localStorage.getItem("nextId"));

        if (storedTasks) {
            setTaskList(storedTasks);
        }

        if (storedNextId) {
            setNextId(storedNextId);
        }
    }, []);

    return (
        <div>
            {/* Your task board UI components here */}
        </div>
    );
}


// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    return `${timestamp}-${randomNum}`;

}

// Todo: create a function to create a task card
function TaskCard({ task }) {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
        </div>
    );
}


// Todo: create a function to render the task list and make cards draggable
function TaskList({ tasks }) {
    const onDragEnd = (result) => {
        // Handle drag and drop logic here
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="task-list">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <TaskCard task={task} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function TaskList({ tasks }) {
    const [taskList, setTaskList] = useState(tasks);

    const deleteTask = (taskId) => {
        const updatedTaskList = taskList.filter(task => task.id !== taskId);
        setTaskList(updatedTaskList);
    };

    return (
        <div>
            {taskList.map(task => (
                <div key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => deleteTask(task.id)}>Delete Task</button>
                </div>
            ))}
        </div>
    );
}

// Todo: create a function to handle dropping a task into a new status lane
function TaskBoard({ tasks }) {
    const [taskList, setTaskList] = useState(tasks);

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            return;
        }

        const updatedTaskList = Array.from(taskList);
        const [draggedTask] = updatedTaskList.splice(source.index, 1);
        draggedTask.status = destination.droppableId;
        updatedTaskList.splice(destination.index, 0, draggedTask);

        setTaskList(updatedTaskList);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="task-board">
                {Object.keys(statusLanes).map((status) => (
                    <Droppable key={status} droppableId={status}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="status-lane"
                            >
                                <h2>{status}</h2>
                                {taskList
                                    .filter(task => task.status === status)
                                    .map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TaskCard task={task} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

function TaskBoard({ tasks }) {
    const [taskList, setTaskList] = useState(tasks);

    useEffect(() => {
        // Render the task list
        renderTaskList();

        // Add event listeners
        document.addEventListener('click', handleTaskDelete);

        return () => {
            document.removeEventListener('click', handleTaskDelete);
        };
    }, []);

    const renderTaskList = () => {
        // Render the task list logic here
    };

    const handleTaskDelete = (event) => {
        // Handle task delete logic here
    };

    const onDragEnd = (result) => {
        // Drag and drop logic here
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="task-board">
                {/* Droppable lanes */}
                {/* Date picker for due date */}
                <DatePicker selected={new Date()} onChange={(date) => console.log(date)} />
            </div>
        </DragDropContext>
    );
}
