import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  DeleteTodoAsync,
  getTodosAsync,
  TodoActions,
  toggleCompleteAsync,
  updateTodoAsync,
} from "../Redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);

  const [Itemid, setItemId] = useState(null);
  const dispatch = useDispatch();
  const handleComplete = () => {
    dispatch(TodoActions.toggleComplete({ id: id, completed: !completed }));
  };

  const handleDelete = () => {
    dispatch(TodoActions.deleteTodo({ id }));
  };
  const handleUpdate = () => {
    if (updatedTitle.length > 0) {
      dispatch(TodoActions.updatePost({ id: id, title: updatedTitle }));
    }
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
          {isEdit && Itemid === id ? (
            <div className="d-flex justify-content-between">
              <br />
              <input
                onChange={(e) => setUpdatedTitle(e.target.value)}
                value={updatedTitle}
              />

              <button onClick={handleUpdate}>Update</button>
            </div>
          ) : (
            <span className="d-flex"> {title}</span>
          )}
        </span>
        <div>
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
      </div>
    </li>
  );
};

export default TodoItem;
