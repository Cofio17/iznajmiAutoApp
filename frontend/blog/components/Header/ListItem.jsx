import Link from "next/link"
import styles from "./Header.module.scss";

export default function ListItem({ text, to }) {

    return (
        <li className={styles.listitem} ><Link href={to}>{text}</Link></li>
    )
}