import { getPostData, getSortedPostsData } from "@/lib/posts";

export default async function BlogPost({ params }) {

    // Učitajte podatke o postu na osnovu sluga
    const { slug } = await params;


    const post = await getPostData(slug)


    if (!post) {
        // Možete dodati logiku za obradu grešaka ili 404
        return <h1>Post not found</h1>;
    }

    return (
        <article className="article-wrapper">
            <div className="header-title">
                <p>{post.date}</p>
                <h1>{post.title}</h1>
            </div>

            <div className="markdown-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
    );
}

// Generiše statične parametre
export async function generateStaticParams() {
    const allPostsData = getSortedPostsData();
    return allPostsData.map(post => ({
        slug: post.slug, // Definišite sve moguće slug-ove

    }));
}
