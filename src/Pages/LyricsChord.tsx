import React from "react";
import DefaultPage from "../Layout/DefaultPage";

export default function LyricsChord(text: string) {
  return (
    <>
      <DefaultPage>
        <div>
            <button>+</button>
            <button>-</button>
        </div>
        <div>
            {text}
        </div>
      </DefaultPage>
    </>
  );
}
