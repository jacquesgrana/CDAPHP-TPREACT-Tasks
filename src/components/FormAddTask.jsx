import { useState } from "react";

const FormAddTask = (props) => {
    let [inputValue, setInputValue] = useState("");
    return (
        <div>
        <h4>Ajouter une tâche</h4>
        <form
        onSubmit = {(e) => {
            e.preventDefault();
            props.addTask(inputValue);
            }}
        className="d-flex gap-2 w-50 align-items-center">
        <label className="form-label" htmlFor="title-form-add-task">Titre</label>
        <input
        onChange={(event) => setInputValue(event.target.value)}
         className="form-control w-50" type="text" id="title-form-add-task" />
        <button
        className="btn btn-success" type="submit">Valider</button>
        </form>
        </div>
    );
}

export default FormAddTask;