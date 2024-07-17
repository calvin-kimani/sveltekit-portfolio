import { json } from '@sveltejs/kit';

async function getProjects(page) {
    const projectsPerPage = 8;
    let projects = [];
    
    const paths = import.meta.glob(
        '/src/projects/**/*.md',
        {
            eager: true
        }
    );

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split('/').at(-1)?.replace('.md', '');
        
        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata;
            const post = { ...metadata, slug };
            
            post.published && projects.push(post);
        }
    }

    projects = projects.sort((first, second) => 
        new Date(second.date).getTime() - new Date(first.date).getTime()
    );

    const start = (page - 1) * projectsPerPage;
    const paginatedProjects = projects.slice(start, start + projectsPerPage);

    return {
        projects: paginatedProjects,
        totalProjects: projects.length
    };
}

export const GET = async ({ url }) => {
    let page = parseInt(url.searchParams.get('page')) || 1;

    const data = await getProjects(page);
    
    return json(data);
};
