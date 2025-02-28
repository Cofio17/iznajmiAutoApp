import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
import html from 'remark-html'

const postDirectory = path.join(process.cwd(), 'content', 'BlogPosts');

export function getSortedPostsData() {

    //get files 
    const fileNames = fs.readdirSync(postDirectory);

    const allPostData = fileNames.map((fileName) => {
        //Remove .md from file name to get id
        const id = fileName.replace(/\.md$/, '');

        //read file markdown content as string
        const fullPath = path.join(postDirectory, fileName);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');

        //use gray-matter to parse the post metadata section
        const matterResult = matter(fileContent);

        return {
            id,
            ...matterResult.data, // dodavanje metapodataka
        };
    })

    return allPostData.sort((a, b) => {
        return new Date(b.date) - new Date(a.date); // Sortira postove prema datumu
    });

}

export async function getPostData(id) {
    //read file markdown content as string
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContent);

    //converting content to html using remark
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data, // Ubacuje naslov, datum itd. iz frontmatter-a
    };
}