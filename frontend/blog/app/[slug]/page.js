import { getPostData, getSortedPostsData } from "@/lib/posts";


export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPostData(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: post.title,
        description: post.desc,
        openGraph: {
            title: post.title,
            description: post.desc,
            images: [`https://storage.googleapis.com/iznajmimeprobabucket/blog/${slug}.webp`],
        },
    };
}

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
                <img className="blog-image" src={`https://storage.googleapis.com/iznajmimeprobabucket/blog/${slug}.webp`} alt="blog image" />

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
