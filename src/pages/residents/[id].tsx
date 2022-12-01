import Layout from "../../components/Layout";
import { GetServerSideProps } from 'next'
import { IResident } from "../../types/types";
export default function ResidentPage({ resident }: { resident: IResident }) {
	return (
		<Layout>
			<h1>Страница жильца</h1>
			<ul>
				<li>
					Имя: {resident.name}
				</li>
				<li>
					email: {resident.email}
				</li>
			</ul>

		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query
	const res = await fetch('http://localhost:3000/api/residents/' + id)
	const resident = await res.json()

	return {
		props: {
			resident,
		},
	}
}