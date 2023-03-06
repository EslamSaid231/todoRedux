import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  DeleteTodoAsync,
  getTodosAsync,
  toggleCompleteAsync,
  updateTodoAsync,
} from "../Redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const [Itemid, setItemId] = useState(null);
  const dispatch = useDispatch();
  const handleComplete = () => {
    dispatch(toggleCompleteAsync({ id: id, completed: !completed }));
  };

  const handleDelete = () => {
    dispatch(DeleteTodoAsync({ id }));
  };
  const handleUpdate = () => {
    dispatch(updateTodoAsync({ id: id, title: updatedTitle }));
    setIsEdit(false);
  };
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onChange={handleComplete}
          ></input>
          {title}
        </span>
        <div>
          {" "}
          <button
            className="btn btn-danger"
            onClick={() => {
              setIsEdit(true);
              setItemId(id);
            }}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <br />

        {isEdit && Itemid === id && (
          <div>
            <input onChange={(e) => setUpdatedTitle(e.target.value)} />

            <button onClick={handleUpdate}>Update</button>
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
