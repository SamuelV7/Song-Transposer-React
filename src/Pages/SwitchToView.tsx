import React from 'react'
import HomePage from './HomePage'
import { Context } from "../App";
import LyricsChord from './LyricsChord';
export default function SwitchToView() {
    const [data, setData] = React.useContext(Context);
    if (data !== "default context value") {
        return (
        <>
            <LyricsChord></LyricsChord>
        </>
        )
    }
  return (
    <>
        <HomePage/>
    </>
  )
}
