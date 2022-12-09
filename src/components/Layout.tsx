import Link from "next/link"



export default function Layout({ children }: any) {
	return (
		<div style={{ margin: '10px' }}>
			<nav>
				<Link href={'/'}> Главная </Link>
				<Link href={'/residents'}> Жильцы </Link>
				<Link href={'/requests'}> Заявки</Link>
				<Link href={'/bills'}> Задолженности</Link>
			</nav>
			<div >
				{children}
			</div>

		</div>
	)
}