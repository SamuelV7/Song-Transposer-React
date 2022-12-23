
import { songName } from "./store"
export async function load({ params }){
    const post = await import (`../${params.slug}.md?raw`)
    // const { title, key } = post.metadata
    const content = post.default
    songName.update(() => params.slug)
    return {
      content
    }
}