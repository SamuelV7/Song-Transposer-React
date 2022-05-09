import React, {SyntheticEvent} from "react";


export default function Forms() {
  const [fileList, setFileList] = React.useState<FileList | null>(null);

  // React.InputHTMLAttributes<HTMLInputElement>.onChange?: React.ChangeEventHandler<HTMLInputElement>
  function handleChange(e : React.FormEvent<HTMLInputElement>){
      setFileList(e.currentTarget.files)
  }
  function submit(e : any ) {
      // 1. create form data and append every file to form data 
      // 2. send post request to server
      let formdata = new FormData()
      
  }
  return (
    <div className="flex flex-row justify-center p-3">
      <form className="bg-slate-50 rounded-xl flex flex-col p-5">
        <div className="">
          <label className="text-lg float-left"> Name of the song </label>
          <input
            className="border border-orange-500 w-full focus:border-2 focus:border-orange-700 rounded-lg"
            type="text"
            name="name"
          />
          <label className="text-lg float-left"> Song Writer's Name </label>
          <input
            className="border border-orange-500 w-full focus:border-2  focus:border-orange-700 rounded-lg"
            type="text"
            name="name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text justify-start"> Upload File </label>
          
          <input className="block w-full text-sm text-slate-500
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
            <button type="button" 
            className="bg-slate-900 rounded-lg p-2 hover:bg-slate-100 hover:border-2 hover:border-slate-700 hover:text-slate-600 active:bg-slate-400 text-stone-100 text-lg" 
            onClick={(e)=>{submit(e)}}>Press to Upload</button>
        </div>

      </form>
    </div>
  );
}