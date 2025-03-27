import Link from "next/link";

export default function Button({ text, to, id }) {

    return (
        <button id={id} className="button"><Link href={to} >{text}</Link></button>
    )
}