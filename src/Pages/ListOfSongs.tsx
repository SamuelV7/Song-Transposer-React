import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { Context } from "../App"

type Props = {}

async function getAllSongs() {
    let data = await fetch("/allSongs");
    let json = await data.json();
    return json;
}

async function getSpecificSong(theSong: String){
    let jsonToSend = {Name : theSong}
    let song = await fetch("/song", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(jsonToSend)
    })
    let jsonRes = await song.json()
    return jsonRes
}

export default function ListOfSongs({}: Props) {
    const [songs, setSongs] = React.useState<any>([]);
    const [context, setContext] = React.useContext(Context);

    let navigate = useNavigate()
    const handler = (index: String) => (event: React.MouseEvent) => {
        getSpecificSong(index).then(songChordText => {
            console.log(songChordText)
            // set context to the response
            setContext(songChordText)
            navigate("../view", {replace: false})
        })
    }
    useEffect(()=>{
        getAllSongs().then((data) => {
            let htmlTags = data.map((item : String) => {
                return <p key={item.toString()}  onClick={handler(item.toString())}>{item}</p>
            })
            setSongs(htmlTags)
        })
    },[])
  return (
    <>
        <div>ListOfSongs</div>
        <div>{songs}</div>
    </>
  )
}