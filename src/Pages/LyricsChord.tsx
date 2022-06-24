import React from "react";
import DefaultPage from "../Layout/DefaultPage";
import { Context } from "../App";

export default function LyricsChord() {
  const [context, setContext] = React.useContext(Context);
  // console.log(context.text.slice(0, -1));
  const parsed_list = JSON.parse(context.text);
  // console.log(parsed_list);
  const data = parsed_list.map((x: any) => {
    return <pre>{x}</pre>;
  });
  return (
    <>
      <DefaultPage>
        <div className="flex flex-row p-4">
          <div>
            <button>+</button>
            <button>-</button>
          </div>
          <div>{data}</div>
        </div>
      </DefaultPage>
    </>
  );
}
