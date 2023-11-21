import Link from "next/link";
import classes from "./TopPage.module.scss";

export default function TopPage() {
  return (
    <main className={classes.main}>
      <ul>
        <li>
          <Link href={"/todos"}>
            TODO
          </Link>
        </li>
        <li>
          <Link href={"/chat"}>
            CHAT
          </Link>
        </li>
      </ul>
    </main>
  )
}
