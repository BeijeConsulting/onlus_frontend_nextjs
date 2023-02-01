import { FC } from "react"

import { useRouter } from "next/router"
import Link from "next/link"

interface Props {
  children: any
  href: string
  exact: boolean
}

const NavLink: FC<Props> = (props: any) => {
  const { pathname } = useRouter()
  const isActive = props.exact
    ? pathname === props.href
    : pathname.startsWith(props.href)

  return (
    <Link href={props.href}>
      <span className={isActive ? " active" : " "}>{props.children}</span>
    </Link>
  )
}

export default NavLink
