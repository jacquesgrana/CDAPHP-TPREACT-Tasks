import { useState, useEffect, useRef } from "react";

const FormAddTask = (props) => {
    const [inputValue, setInputValue] = useState("");
    const mode = useRef("");
    const [taskId, setTaskId] = useState(0);


    useEffect(() => {
        setInputValue(props.inputValueForm);
        //setMode(props.mode);
        mode.current = props.mode;
        setTaskId(props.taskId);
      }, [props.inputValueForm]);

    return (
        <div>
        <h4>{props.titleForm}</h4>
        <form
        onSubmit = {(e) => {
            e.preventDefault();
            props.addTask(inputValue, mode.current);
            }}
        className="d-flex gap-2 w-50 align-items-center">
        <label className="form-label" htmlFor="title-form-add-task">Titre</label>
        <input
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
         className="form-control w-50" type="text" id="title-form-add-task" />
        <button
        className="btn btn-success" type="submit">Valider</button>
        </form>
        </div>
    );
}

export default FormAddTask;