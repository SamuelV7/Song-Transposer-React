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
      // default:
      //   break;
    }
  }

  return (
    <>
      <DefaultPage>
        <div className="flex flex-col p-4">
          <div className="flex flex-row px-3">
            <button className="bg-slate-900 rounded-lg p-2 hover:bg-slate-100 hover:border-2
            hover:border-slate-700 hover:text-slate-600 active:bg-slate-400 text-stone-100 text-lg px-3"
                    onClick={handleTransposer(Transpose.Up)}>Transpose Up +</button>
            <button className="bg-slate-900 rounded-lg p-2 hover:bg-slate-100 hover:border-2
            hover:border-slate-700 hover:text-slate-600 active:bg-slate-400 text-stone-100 text-lg px-3"
                onClick={handleTransposer(Transpose.Down)}>Transpose Down -</button>
          </div>
          <div>
            <pre>{data}</pre>
          </div>
        </div>
      </DefaultPage>
    </>
  );
}
