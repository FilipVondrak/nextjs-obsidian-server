import Link from "next/link";
import {SITE_CONFIG} from "../../config";

export default function Header() {
    let Links = [
        {
            name: "Home",
            href: "/"
        }
    ]

    return (
        <>
            <header className={"flex justify-between items-center p-4 bg-primary border-b-1 border-secondary overflow-clip"}>
                <h1 className={"text-3xl text-text font-bold"}><Link href={"/public"}>{SITE_CONFIG.name}</Link></h1>
                <ul className={"flex gap-4 rounded-full bg-background p-2 ring-2 ring-secondary hidden"}>
                    {
                        Links.map((link) => (
                            <li key={link.name} className={"hover:text-accent transition-colors duration-100"}>
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))
                    }
                </ul>
                <div className={"flex gap-4 ring-secondary bg-background ring-2 p-2 rounded-full"}>
                    <button className={" text-text"}>Login</button>
                    <button className={"text-text"}>Register</button>
                </div>
            </header>
        </>
    )
}