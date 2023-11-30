import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

export default function Cart({ config }: any) {
	return (
		<div className="max-w-7xl mx-auto px-8 py-16 space-y-8 min-h-[calc(100vh-108px)]">
			<div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-x-16 gap-x-0 gap-y-16">
				<CartItems />
				<CartSummary config={config} />
			</div>
		</div>
	);
}

function CartItems() {
	const {
		cartDetails,
		incrementItem,
		decrementItem,
		removeItem,
		cartCount,
	}: any = useShoppingCart();

	return (
		<div className="col-span-2">
			<div className="flex justify-between items-center py-4 pb-8">
				<h1 className="text-4xl font-bold">Min Varukorg</h1>
				<p className="text-gray-500">
					{cartCount} {cartCount > 1 ? "produkter" : "produkt"} i
					varukorgen
				</p>
			</div>
			<ul>
				{Object.keys(cartDetails).map((item, index) => (
					<CartItem
						key={index}
						cartItem={cartDetails[item]}
						incrementItem={incrementItem}
						decrementItem={decrementItem}
						removeItem={removeItem}
					/>
				))}
			</ul>
		</div>
	);
}

function CartItem({
	cartItem,
	incrementItem,
	decrementItem,
	removeItem,
}: {
	cartItem: any;
	incrementItem: any;
	decrementItem: any;
	removeItem: any;
}) {
	return (
		<li className="border-b py-4">
			<div className="flex md:gap-8 gap-4">
				<div className="-z-10 bg-gray-100 rounded-lg border">
					<Image
						className="mix-blend-multiply object-contain aspect-square"
						src={cartItem.image}
						alt=""
						width={64}
						height={64}
					/>
				</div>
				<div className="flex items-center md:flex-row flex-col flex-1">
					<div className="flex-1">
						<h2 className="text-xl font-semibold">
							{cartItem.name}
						</h2>
						<p className="text-gray-500">
							{cartItem.quantity} x{" "}
							{formatCurrencyString({
								value: cartItem.price,
								currency: cartItem.currency,
							})}
						</p>
					</div>
					<div className="flex items-center md:gap-8 gap-2">
						<p className="font-semibold text-xl md:flex-grow-0 flex-grow">
							{formatCurrencyString({
								value: cartItem.price * cartItem.quantity,
								currency: cartItem.currency,
							})}
						</p>
					</div>
				</div>
			</div>
			<ul className="space-y-4 pt-4">
				{cartItem?.product_data?.products?.map(
					(product: any, i: number) => (
						<li
							key={product.id}
							className="flex items-center gap-4 ml-4">
							<div className="-z-10 bg-gray-100 rounded-lg border mr-auto">
								<Image
									className="mix-blend-multiply object-contain aspect-square"
									src={product.cover}
									alt=""
									width={48}
									height={48}
								/>
							</div>
							<div className="flex-1">
								<h2 className="text-xl font-semibold">
									Design {i + 1}
								</h2>
							</div>
							<div className="px-2 flex gap-4 items-center border rounded-lg font-mono">
								<button className="md:p-2 p-1 font-semibold md:text-xl">
									-
								</button>
								<span className="font-semibold">
									{product.count}
								</span>
								<button className="md:p-2 p-1 font-semibold md:text-xl">
									+
								</button>
							</div>
							<button type="button" className="p-2 text-muted">
								<FaTrash />
							</button>
						</li>
					)
				)}
			</ul>
		</li>
	);
}

function CartSummary({ config }: { config: any }) {
	const { cartCount, cartDetails, totalPrice, redirectToCheckout }: any =
		useShoppingCart();

	const [isRedirecting, setIsRedirecting] = useState(false);

	const currency =
		cartDetails[Object.keys(cartDetails)[0]] &&
		"currency" in cartDetails[Object.keys(cartDetails)[0]]
			? cartDetails[Object.keys(cartDetails)[0]].currency
			: "SEK";

	async function onCheckout(e: any) {
		e.preventDefault();

		if (cartCount <= 0) return;
		setIsRedirecting(true);

		try {
			const { id } = await axios
				.post("/api/checkout_sessions", cartDetails)
				.then((res) => res.data);

			const result = await redirectToCheckout(id);
			if (result?.error) {
				console.error(result);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsRedirecting(false);
		}
	}

	return (
		<div className="p-8 bg-gray-100 space-y-8">
			<div>
				<div className="flex items-center justify-between py-4 border-b border-border_dark">
					<p className="font-semibold text-xl">Delsumma</p>
					<p className="font-semibold text-xl">
						{formatCurrencyString({
							value: totalPrice,
							currency,
						})}
					</p>
				</div>
				<div className="flex items-center justify-between py-4 border-b border-border_dark">
					<p className="font-semibold text-xl">Frakt</p>
					<p className="font-semibold text-xl">
						{formatCurrencyString({
							value:
								totalPrice > 0 &&
								totalPrice < config?.freeShippingThreshold
									? config?.shippingCost
									: 0,
							currency,
						})}
					</p>
				</div>
				<div className="flex items-center justify-between py-4 border-b border-border_dark">
					<p className="font-semibold text-xl">Totalt</p>
					<p className="font-semibold text-xl">
						{formatCurrencyString({
							value:
								totalPrice > 0 &&
								totalPrice < config?.freeShippingThreshold
									? totalPrice + config?.shippingCost
									: totalPrice,
							currency,
						})}
					</p>
				</div>
			</div>
			<div className="flex flex-col items-stretch gap-4">
				<button
					disabled={isRedirecting}
					onClick={onCheckout}
					type="button"
					className="py-4 px-8 bg-primary text-white rounded-lg font-semibold">
					Gå till kassan
				</button>

				<Link
					href="/products"
					className="py-4 px-8 border-2 rounded-lg font-semibold text-center">
					Fortsätt handla
				</Link>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const configRef = ref(db, "config");

	const configSnap = await get(configRef);
	const config = configSnap.val();

	return {
		props: {
			config: config,
		},
	};
}
