import Link from 'next/link';
import styles from './PostPreview.module.scss';

export default function PostPreview({ slug, date, title, tags, desc }) {
    return (
        <article className={styles.postOverview}>
            {/* Popravljeno - koristi /blog/ */}
            <Link href={`/${slug}/`} className={styles.title}>
                {title}
            </Link>

            <p className={styles.date}>{date}</p>
            <div>
                <ul className={styles.tagsList}>
                    {tags.map((tag, index) => (
                        <li key={index} className={styles.tag}>{tag}</li>
                    ))}
                </ul>
            </div>
            <p className={styles.description}>{desc}</p>

            {/* Popravljeno - koristi /blog/ */}
            <Link className={styles.link} href={`/blog/${slug}`}>Pročitajte više →</Link>
        </article>
    );
}
