import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Context} from "../App"
import DefaultPage from "../Layout/DefaultPage";
type Props = {}

async function getAllSongs() {
    let data = await fetch("/allSongs");
    return await data.json();
}

async function getSpecificSong(theSong: String){
    let jsonToSend = {Name : theSong}
    let song = await fetch("/song", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(jsonToSend)
    })
    return await song.json()
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
                return (
                <div className="border rounded orange-slate-500 bg-slate-100 hover:bg-slate-300">
                    <p className="px-4 py-3" key={item.toString()}  onClick={handler(item.toString())}>{item}</p>
                </div>
                )
            })
            setSongs(htmlTags)
        })
    },[])
  return (
    <>
        <DefaultPage>
            <div className="flex px-4">
                <h4 className=" p-4 ">List Of Songs</h4>
                <div>{songs}</div>
            </div>
        </DefaultPage>
    </>
  )
}