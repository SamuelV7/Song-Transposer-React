import React from 'react'
import UploadFiles from './UploadFiles'
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
        <UploadFiles/>
    </>
  )
}
