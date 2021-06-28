import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/postsSlice";

//! Example component with Redux state management

const Counter = () => {
  const count = useSelector((state) => state.posts.value);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <button
          aria-label="Increment Value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement Value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </>
  );
};

export default Counter;
