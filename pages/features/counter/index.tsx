import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hook";
import {
  selectCount,
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from "./counterSlice";

export default function Counter() {
  const [mount, setMount] = useState<number>(0);
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const increase = () => {
    dispatch(increment());
  };
  const decrease = () => {
    dispatch(decrement());
  };
  const onChangeMount = (e: any) => {
    setMount(e.target.value);
  };
  const increaseByMount = () => {
    dispatch(incrementByAmount(mount));
  };
  const decreaseByMount = () => {
    dispatch(decrementByAmount(mount));
  };
  return (
    <>
      <h1>Counter Example</h1>
      <h3>count: {count}</h3>
      <h3>mount: {mount}</h3>
      <input type="number" onChange={(e) => onChangeMount(e)} />
      <button onClick={() => increase()}>Increase</button>
      <button onClick={() => decrease()}>Decrease</button>
      <button onClick={() => increaseByMount()}>Increase by mount</button>
      <button onClick={() => decreaseByMount()}>Decrease by mount</button>
    </>
  );
}
