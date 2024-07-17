import { json } from '@sveltejs/kit';

async function getPosts(page, postsPerPage = 8) {
    let posts = [];
    
    const paths = import.meta.glob('/src/posts/**/*.md', { eager: true });

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').at(-1)?.replace('.md', '');
        
        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata;
            const post = { ...metadata, slug };
            
            post.published && posts.push(post);
        }
    }

    posts = posts.sort((first, second) => 
        new Date(second.date).getTime() - new Date(first.date).getTime()
    );

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const start = (page - 1) * postsPerPage;
    const paginatedPosts = posts.slice(start, start + postsPerPage);

    return {
        posts: paginatedPosts,
        totalPosts,
        totalPages,
        currentPage: page
    };
}


export const GET = async ({ url }) => {
    let page = parseInt(url.searchParams.get('page')) || 1;

    const data = await getPosts(page);
    
    return json(data);
};
