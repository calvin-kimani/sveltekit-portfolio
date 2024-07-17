import { error } from '@sveltejs/kit'

export async function load({ params }){
	try{
		const post = await import(`../../../projects/${params.slug}.md`)

		return{
			content: post.default,
			metadata: post.metadata
		}

	}catch(e){
		throw error(404, 'Oops Not Found')
	}
	
}