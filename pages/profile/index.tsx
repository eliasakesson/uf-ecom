import SavedDesigns from "@/components/design/SavedDesigns";
import { auth } from "@/firebase";
import GetProducts from "@/utils/getProducts";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Profile({ products }: { products: any[] }) {
	const [user, loading, error] = useAuthState(auth);

	const router = useRouter();

	return user ? (
		<div className="max-w-7xl w-full mx-auto px-8 py-16 flex flex-col items-center space-y-16 min-h-[calc(100vh-108px)]">
			<div className="flex flex-col items-center gap-2 border-b pb-8 w-full">
				<Image
					src={user.photoURL || "/images/default-profile.png"}
					alt=""
					width={80}
					height={80}
					className="rounded-full"
				/>
				<h1 className="text-4xl font-bold text-gray-900">
					{user.displayName || "Anonym"}
				</h1>
				<span className="text-muted">{user.email}</span>
			</div>
			<div className="space-y-4">
				<h2 className="text-4xl font-bold">Mina sparade designs</h2>
				<p className="text-muted text-lg">
					Fortsätt där du slutade och spara dina designs för att komma
					tillbaka till dem senare.
				</p>
				<br />
				<SavedDesigns
					products={products}
					onSelect={(design) =>
						router.push({
							pathname: "/design",
							query: { d: JSON.stringify(design) },
						})
					}
					canvasClassKey="profile-saved-template-canvas"
				/>
			</div>
		</div>
	) : loading ? (
		<div className="max-w-7xl w-full mx-auto px-8 py-16 flex flex-col items-center space-y-8 min-h-[calc(100vh-108px)]">
			<div>Laddar...</div>
		</div>
	) : (
		<div className="max-w-7xl w-full mx-auto px-8 py-16 flex flex-col items-center space-y-8 min-h-[calc(100vh-108px)]">
			<div>Du är inte inloggad</div>
		</div>
	);
}

export async function getStaticProps() {
	const products = await GetProducts();

	return {
		props: {
			products,
		},
	};
}
