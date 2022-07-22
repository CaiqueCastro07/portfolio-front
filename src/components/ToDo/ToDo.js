import { useState } from "react";
import { ApiController } from "../../Api/api";
import { fakeTasks } from "../../data/data";
import "./ToDo.css"

let loopProtection = 0;

function ToDo(props) {

    const [taskEditing, setTaskEditing] = useState([])
    const [newTaskValue, setNewTaskValue] = useState("")
    const [editTaskValue, setEditTaskValue] = useState("")

    const [tasks, setTasks] = useState([])

    const api = new ApiController(props?.logged)

    const refresh = (exception) => {

        if (!props?.logged) {
            if (exception) {
                setTasks([])
                return
            }
            setTasks(fakeTasks)
            return
        }

        if (exception) {
            api.getTasksApi().then((tasksArray) => {
                Array.isArray(tasksArray) && setTasks(tasksArray)
            })
            return
        }

        api.getTasksApi().then((tasksArray) => {
            console.log(tasksArray)
            Array.isArray(tasksArray) && tasksArray?.length && setTasks(tasksArray)
        })
    }

    if (!props?.logged && !tasks?.length && fakeTasks?.length) {
        setTasks(fakeTasks)
    }

    !tasks?.length && props?.logged && refresh()

    const addTask = () => {

        if (!props?.logged) {
            fakeTasks.push({ task: newTaskValue, done: false, fake: true, _id: String(Math.random()) })
            refresh()
            setNewTaskValue("")
            return
        }

        newTaskValue && api.addNewTaskApi(newTaskValue).then(() => {
            setNewTaskValue("")
            refresh()
        }).catch(() => {
            setNewTaskValue("")
            refresh()
        })

    }

    const deleteTask = (target) => {

        if (!props?.logged) {

            if(target === false || target === true){

                console.log("target",target)

                const newFakeArr = fakeTasks.filter((e)=>e?.done != target).map((e)=>e)
                fakeTasks.length = 0

                newFakeArr.forEach((e)=>{
                    fakeTasks.push(e)
                })

                refresh(true)
                return
            }

            let idx;

            fakeTasks.find((e, i) => {
                if (e?._id == target) {
                    idx = i
                    return true
                }
            })

            if (!idx && idx !== 0) return;

            fakeTasks.splice(idx, 1)
            refresh(true)
            return
        }

        api.deleteTaskApi(target).then(() => {
            refresh(true)
        }).catch(() => {
            refresh(true)
        })
    }

    const editTask = (target, evt) => {

        if (evt?.key == "Enter" && evt?.target?.value) {

            if (!props?.logged) {

                let idx;

                fakeTasks.find((e, i) => {
                    if (e?._id == target) {
                        idx = i
                        return true
                    }
                })

                if (!idx && idx !== 0) return;

                fakeTasks[idx].task = editTaskValue;
                setEditTaskValue("")
                refresh()
                setTaskEditing([])
                return
            }

            if (evt?.key == "Escape") {
                setEditTaskValue("")
                setTaskEditing([])
                return
            }

            api.editTaskApi(target, editTaskValue).then((res) => {
                setEditTaskValue("")
                refresh()
                setTaskEditing([])
            }).catch((err) => {
                setEditTaskValue("")
                refresh()
                setTaskEditing([])
            })

            return
        }

    }

    const markCheckbox = (target, done) => {

        if (!props?.logged) {

            let idx;

            fakeTasks.find((e, i) => {
                if (e?._id == target) {
                    idx = i
                    return true
                }
            })

            if (!idx && idx !== 0) return;

            fakeTasks[idx].done = !done;
            refresh(true)
            return
        }

        api.editTaskApi(target, !done).then((res) => {
            refresh()
        }).catch((err) => {
            refresh()
        })
    }

    const taskControl = (target, order, evt) => {

        if (order == "undo") {
            setEditTaskValue("")
            setTaskEditing([])
            return
        }

        if (order == "delete") {
            deleteTask(target)
            return
        }

        if (!props?.logged) {

            console.log("fake target",target);

            fakeTasks.find((e, i) => {
                if (e?._id == target) {
                    const newArr = []
                    newArr.push(target)
                    setTaskEditing(newArr)
                    return true
                }
            })
            return
        }

        tasks.find((e, i) => {
            if (e?._id == target) {
                const newArr = []
                newArr.push(target)
                setTaskEditing(newArr)
                return true
            }
        })
    }

    const buildTaskDiv = (e, i) => {

        const taskDiv =
            <div className="task__wrapper">
                <div onClick={() => markCheckbox(e?._id, e?.done)} className="task-checkbox">
                    <img src={require(`../../assets/${e?.done ? "mark-undone-checkbox.png" : "mark-done-checkbox.png"}`)} alt="" className="checkbox-img-hidden" />
                    <img src={require(`../../assets/${e?.done ? "done-checkbox.png" : "to-do-checkbox.png"}`)} alt="" className="checkbox-img" />
                </div>
                <div className="task-text-wrapper">
                    <input value={editTaskValue} onKeyUp={(evt) => editTask(e?._id, evt)} onChange={(evt) => setEditTaskValue(evt?.target?.value)} className={taskEditing.includes(e?._id) ? "edit-task show" : "edit-task"} />
                    <p onClick={() => taskControl(e?._id)} className={taskEditing.includes(e?._id) ? "task-text hide" : "task-text"} >{e?.task || ''}</p>
                </div>
                <div onClick={(evt) => taskControl(e?._id, taskEditing.includes(e?._id) ? "undo" : "delete", evt)} className="delete-task">{taskEditing.includes(e?._id) ? "undo" : "delete"}</div>
            </div>;

        return taskDiv

    }

    return (
        <>
            <section className="cards" id="cards">
                <div className="container">
                    <div className="cards__wrapper">

                        <div className="card__left card">
                            <div className="head__wrapper">
                                <b className="to-do-title">To-do</b>
                                <div className="subtitle-wrapper">
                                    <p className="subtitle-text">Take a breath.<br></br>Start doing.</p>
                                </div></div>
                            <div className="add-task-wrapper"><div>
                            </div>
                                <input value={newTaskValue} onChange={(evt) => setNewTaskValue(evt?.target?.value)} onKeyUp={(evt) => {

                                    if (evt?.key == "Enter") return addTask();
                                    if (evt?.key == "Escape") return setNewTaskValue("");

                                }} className="new-task" placeholder="add a new task here..." />
                                <div onClick={addTask} className="add-task-btn">add</div>
                            </div>
                            {tasks.filter((e) => !e?.done).map((e, i) => buildTaskDiv(e, i))}
                            <img onClick={() => deleteTask(false)} src={require("../../assets/eraseall-btn.png")} alt="" className="eraseall-btn" />
                        </div>

                        <div className="card__right card">
                            <div className="head__wrapper">
                                <b className="to-do-title">Done</b>
                                <div className="subtitle-wrapper-done">
                                    <p className="subtitle-text">Contratulations<br></br>You have done {tasks.filter((e) => e?.done)?.length} tasks</p>
                                </div></div>
                            {tasks.filter((e) => e?.done).map((e, i) => buildTaskDiv(e, i))}
                            <img onClick={() => deleteTask(true)} src={require("../../assets/eraseall-btn.png")} alt="" className="eraseall-btn" />
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default ToDo;

