import React from "react";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import LyricsChord from "../Pages/LyricsChord";

export default function Forms() {
  const [fileList, setFileList] = React.useState<FileList | null>();
  const [transposeTo, setTransposeTo] = React.useState<String | null>("");
  const [context, setContext] = React.useContext(Context);

  // React.InputHTMLAttributes<HTMLInputElement>.onChange?: React.ChangeEventHandler<HTMLInputElement>
  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setFileList(e.currentTarget.files);
  }
  let navigate = useNavigate();
  async function submit(e : any) {
    
    // e.preventDefault()
    // 1. create form data and append every file to form data
    // 2. send post request to server
    let formdata = new FormData();
    formdata.append("transpose", transposeTo as any);
    // formdata.append("Song Writer", nameOfAuthor as any);
    for (let i = 0; i < fileList!.length; i++) {
        let tmpList : FileList = fileList!
        formdata.append("files", tmpList[i])
    }
    let api_Data = await postData("http://localhost:3001/upload", formdata);
    await setContext(api_Data);
    navigate("../view", {replace: false})
    return
  }

  async function postData(url : string, formData : FormData) : Promise<any>{
    let data = await fetch(url, {method: "POST", body: formData})
    let json = await data.json()
    return json
  }

  return (
    <div className="flex flex-row justify-center p-3">
      <form className="bg-slate-50 rounded-xl flex flex-col p-5">
        <div className="">
          <label className="text-lg float-left"> Transpose by eg +1/-1 </label>
          <input
            className="border border-orange-500 w-full focus:border-2 focus:border-orange-700 rounded-lg"
            type="text"
            name="name"
            onChange={(e) => {
              setTransposeTo(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text justify-start"> Upload File </label>

          <input
            className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-2
                file:text-sm file:font-semibold
                file:bg-slate-100 file:text-orange-700
                file:border-solid file:border-orange-700
                hover:file:bg-orange-300 py-3"
            type="file"
            multiple
            onChange={handleChange}
          />
          <button
            type="button"
            className="bg-slate-900 rounded-lg p-2 hover:bg-slate-100 hover:border-2 hover:border-slate-700 hover:text-slate-600 active:bg-slate-400 text-stone-100 text-lg"
            onClick={submit}
          >
            Press to Upload
          </button>
        </div>
      </form>
    </div>
  );
}