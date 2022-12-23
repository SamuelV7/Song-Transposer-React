import { transpose } from "chord-transposer"
import { onDestroy } from "svelte"
import { semiTones } from "./store"

let tones : number
const unsubscribe = semiTones.subscribe(x => tones = x)

export function transpose_local(semiTones: number, lyrics: any) : string[]{

    const theText : string[] = lyrics.split("\n")
    // eslint-disable-next-line prefer-const
    let temp = []
    for (let i = 0; i < theText.length; i++) {
        try {
            temp.push(transpose(theText[i]).up(tones).toString())
        } catch (error) {
            // console.log(error, theText[i])
            temp.push(theText[i])
        }
    }
    onDestroy(unsubscribe)
    return temp
}