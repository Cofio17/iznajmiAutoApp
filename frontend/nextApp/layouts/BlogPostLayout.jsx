import SectionContainer from "@/components/Section/SectionContainer"
import PostPreview from "@/components/PostPreview/PostPreview"
import styles from './BlogPostLayout.module.scss'
export default function BlogPostLayout({ posts }) {

    return (
        <SectionContainer>
            <div>
                <h1 className={styles.header}>Najnoviji Blogovi</h1>
                <h3 className={styles.headerSmaller}>Pročitajte sve što Vas zanima o automobilima Na jednom mestu</h3>
            </div>

            {posts.map((post) => {
                return (<PostPreview key={post.id} date={post.date} tags={post.tags} title={post.title} desc={post.desc} id={post.id} slug={post.slug} />)
            })}
        </SectionContainer>
    )
}