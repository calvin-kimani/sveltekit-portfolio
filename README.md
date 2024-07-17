# SvelteKit Portfolio

# [Demo](https://calvin-kimani.vercel.app/)


Welcome to a portfolio template built with SvelteKit. This project was inspired by [joyofcode](https://x.com/joyofcodedev)
The site uses several technologies to enhance its functionality and design.

## Technologies Used
- **Svelte 5**: Note that Svelte 5 is not yet stable. To install packages, use the `--legacy-peer-deps` flag.
- **SvelteKit**: The framework for building the application.
- **mdsvex**: For rendering markdown content.
- **Phosphoricons**: For icons used throughout the site.
- **Tailwind CSS**: For styling the site.

## Installation

To install the necessary packages, use the following command:

```sh
npm install --legacy-peer-deps
```

## Styling

To change the font used and the default styling, modify the values in `/src/app.css` which contains custom css and resets from [Andy Bell](https://piccalil.li/blog/a-more-modern-css-reset/).

## Configuration

The application expects a configuration file located at `/src/lib/config/config.ts`. The configuration file has ex exported `user`that should have the following structure:

```js
export const user = {
  first_name: "",
  last_name: "",
  tagline: "", 
  about: ``, // use backticks to allow multiline, can also use html
  avatar: "", // appears on the post listings
  socials:{
    email: "",
    github: "",
    x: "",
    linkedin: "",
  },
  techstack: [
    {
      name: "", color: ""
    }
  ]
}
```

## Adding a Post

To add a post to the blog, follow these steps:

1. Create a markdown file named `[post_name].md` in the `/src/posts` directory.
2. Ensure the markdown file has the following frontmatter:

```markdown
    ---
    title: post title
    date: "24-07-17"
    published: true
    description: post description
    cover: [image url]
    ---
```

3. If the `published` field is not `true`, the post will not appear on the site.
4. The `cover` field is optional but recommended for adding a cover image to your post.

## Adding a Project

To add a project, the process is similar to adding a post:

1. Create a markdown file named `[project_name].md` in the `/src/projects` directory.
2. Ensure the markdown file has the following frontmatter:

    ```markdown
    ---
    title: Project Title
    date: "24-07-17"
    published: true
    description: Project Description
    cover: [image url]
    links:
      github: https://github.com/[your-username]
    ```

3. If the `published` field is not `true`, the project will not appear on the site.
4. The `cover` field is optional but recommended for adding a cover image to your project.
5. The `links` field is also optional but can be used to add relevant links, such as a link to a GitHub repository.

## Directory Structure

```sh
/src
	/posts
		/directory
			[post_name].md
		[post_name].md
	/projects
		/directory
			[project_name].md
		[project_name].md

```

## Frontmatter Fields

- **title**: The title of the post or project.
- **date**: The date the post or project was created. Format: `yy-mm-dd`.
- **published**: Set to `true` if you want the post or project to appear on the site.
- **description**: A short description of the post or project.
- **cover**: (Optional) A URL to the cover image for the post or project.
- **links**: (Optional) A section for adding relevant links, such as a GitHub repository.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request. Please ensure your changes are well-documented and follow the existing code style.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
