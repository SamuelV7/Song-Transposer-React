import React, { ButtonHTMLAttributes, useEffect } from "react";
import DefaultPage from "../Layout/DefaultPage";
import { Context } from "../App";
import { transpose } from '@chris-si/chord-transposer-ng';

enum Transpose{
  Up, 
  Down
}

export default function LyricsChord() {
  // set context
  const [context, setContext] = React.useContext(Context);
  let thelyrics : string = context.text
  let arr = thelyrics.split("/n")

  
  // render json into html using pre tags
  const data = arr.map((x: any) => {
    return <pre>{x}</pre>;
  });
  
  let handleTransposer = (transposeTo: Transpose) => (e: React.FormEvent) =>{
    switch (transposeTo) {
      case Transpose.Up:
        setContext({text: transpose(context.text).up(1).toString()})
        break;
      case Transpose.Down:
        setContext({text: transpose(context.text).up(1).toString()})
        break;
      default:
        break;
    }
  }

  return (
    <>
      <DefaultPage>
        <div className="flex flex-row p-4">
          <div>
            <button onClick={handleTransposer(Transpose.Up)}>+</button>
            <button onClick={handleTransposer(Transpose.Down)}>-</button>
          </div>
          <pre>{data}</pre>
        </div>
      </DefaultPage>
    </>
  );
}
