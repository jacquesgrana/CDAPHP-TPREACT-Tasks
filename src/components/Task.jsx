const Task = (props) => {
  return (
    <section className="d-flex justify-content-between gap-2 my-3">
      <h2 className={props.task.done ? "text-decoration-line-through" : ""}>
        {props.task.title}
      </h2>
      <div className="d-flex gap-3">
        <button
        onClick={() => props.changeDone(props.task.id)}
         className="btn btn-success">{props.task.done ? "Invalider" : "Valider"}</button>
        <button
        onClick={() => props.deleteTask(props.task.id)}
         className="btn btn-warning">Supprimer</button>
      </div>
    </section>
  );
};

export default Task;
