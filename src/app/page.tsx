import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function Home() {
    let Links = [
        {name: "Maturita", href: "/notes/maturita"},
        {name: "VUT FIT", href: "/notes/vut"},
    ]
    return (
      <div className={"flex justify-center items-center grow"}>
          <ul className={"flex flex-col gap-16 w-auto min-w-[200px] min-h-[100px]"}>
              {
                  Links.map((link) => (
                      <li key={link.name} className={"w-full"}>
                          <Link href={link.href}>
                              <div className={"bg-primary shadow-xl shadow-black/35 ring-2 ring-secondary hover:ring-accent rounded-2xl transition duration-300 hover:scale-110 overflow-clip"}>
                                  <div className={"text-center p-4 rounded-2xl text-text hover:shadow-[inset_0_-0.3rem_0.3rem_rgba(0,0,0,0)] hover:inset-shadow-sm inset-shadow-accent hover:shadow-accent  hover:text-accent transition duration-300 "}>
                                      <span className={" text-2xl"}>
                                          {link.name}
                                      </span>
                                  </div>
                              </div>
                          </Link>
                      </li>
                  ))
              }
          </ul>
      </div>
    );
}
