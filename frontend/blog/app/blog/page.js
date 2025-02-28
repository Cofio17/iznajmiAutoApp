import BlogPostLayout from "@/layouts/BlogPostLayout";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
    const posts = getSortedPostsData();
    console.log(posts);

    return (
        <BlogPostLayout posts={posts} />
    );
}
