import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-gray-100">
			<div className="max-w-7xl mx-auto px-8 py-16">
				<div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8">
					<div className="sm:col-span-2 space-y-8">
						<svg
							width="200"
							height="40"
							viewBox="0 0 369.89473684210526 66.52189637425474">
							<defs id="SvgjsDefs5784"></defs>
							<g
								id="SvgjsG5785"
								transform="matrix(1.0278572684208238,0,0,1.0278572684208238,0,0)"
								fill="#22c55e">
								<path
									xmlns="http://www.w3.org/2000/svg"
									d="M53.075,54.975c20.879,8.143,32.001,1.531,36.534,9.744H0C0,64.719,25.201,44.102,53.075,54.975z M47.938,49.723v-7.754  h15.132l-11.15-13.296h8.686l-10.7-11.827h6.383L44.432,0L32.583,16.847h6.375L28.264,28.673h8.682L25.805,41.969h15.114v6.602  C44.555,48.586,47.938,49.723,47.938,49.723z M19.33,43.334l10.425-12.443h-8.923l7.849-8.678l-4.376-6.16L14.347,30.08h4.27  l-9.25,13.254H19.33z M59.319,30.844l10.297,12.573h8.825l-6.188-8.647h4.888L66.757,10.405l-5.874,12.58l7.154,7.906L59.319,30.844  z M27.622,44.188H20.98v6.939c0,0,3.346-1.434,6.642-1.535V44.188z M69.352,44.188h-5.192l-0.13,9.604  c3.29,1.039,5.322,1.301,5.322,1.301V44.188z"></path>
							</g>
							<g
								id="SvgjsG5786"
								transform="matrix(3.3738190555369223,0,0,3.3738190555369223,109.16599147854505,-10.242914333221535)"
								fill="#132a3a">
								<path d="M6.64 10.34 l0 2.78 l-2.8 0 l0 1.88 c0 1.54 1.02 2.32 2.5 2.32 c0.18 0 0.34 -0.02 0.48 -0.04 s0.26 -0.04 0.4 -0.06 l0 2.78 c-0.18 0.02 -0.32 0.06 -0.42 0.08 c-0.12 0.02 -0.32 0.02 -0.58 0.02 c-3.02 0 -5.38 -2.06 -5.38 -5.1 l0 -7.4 l3 0 l0 2.74 l2.8 0 z M11.399999999999999 15 l0 5 l-3 0 l0 -4.98 c0 -3.32 2.44 -5.12 5.52 -5.12 c0.1 0 0.24 0 0.38 0.02 s0.3 0.06 0.44 0.08 l0 2.9 c-0.1 -0.02 -0.22 -0.04 -0.36 -0.06 s-0.26 -0.04 -0.36 -0.04 c-0.5 0 -0.9 0.06 -1.24 0.16 c-0.56 0.2 -1.06 0.58 -1.24 1.18 c-0.1 0.26 -0.14 0.56 -0.14 0.86 z M22.78 15 c-0.08 -1.46 -0.74 -2.32 -2.26 -2.32 c-0.42 0 -0.78 0.06 -1.08 0.18 c-0.92 0.42 -1.26 1.2 -1.26 2.16 c0 0.32 0.04 0.62 0.14 0.88 c0.3 1.04 1.2 1.42 2.2 1.42 c1.52 0 2.26 -0.82 2.26 -2.32 z M26.58 20 l-3 0 c-0.2 -0.5 -0.38 -1 -0.5 -1.52 c-0.68 1.12 -1.72 1.62 -3 1.62 c-2.86 0 -4.9 -2.4 -4.9 -5.14 c0 -3.16 2.36 -5.06 5.34 -5.06 c3.18 0 5.18 2.04 5.26 5.1 c0.02 0.26 0.02 0.56 0.02 0.92 c0 1.4 0.22 2.8 0.78 4.08 z M18.86 8.8 c-0.76 0 -1.28 -0.52 -1.28 -1.28 s0.54 -1.24 1.28 -1.24 s1.24 0.5 1.24 1.24 s-0.48 1.28 -1.24 1.28 z M22.86 8.8 c-0.76 0 -1.28 -0.52 -1.28 -1.28 s0.54 -1.24 1.28 -1.24 s1.24 0.5 1.24 1.24 s-0.48 1.28 -1.24 1.28 z M27.32 19.68 l0 -2.8 c1.32 0.4 2.98 0.48 4.34 0.48 c0.54 0 0.96 -0.02 1.26 -0.08 c0.28 -0.04 0.42 -0.14 0.42 -0.28 c0 -0.06 -0.02 -0.1 -0.06 -0.16 c-0.2 -0.2 -0.64 -0.3 -0.9 -0.36 s-0.6 -0.14 -1.02 -0.22 c-0.34 -0.06 -0.74 -0.14 -1.2 -0.24 c-1.56 -0.34 -2.76 -1.22 -2.76 -2.9 c0 -2.48 2.42 -3.22 4.46 -3.22 c1.28 0 2.56 0.18 3.82 0.44 l0 2.82 c-1.26 -0.38 -2.68 -0.48 -4 -0.48 c-0.52 0 -0.88 0.02 -1.1 0.08 s-0.34 0.16 -0.34 0.28 c0 0.18 0.18 0.3 0.52 0.36 c0.34 0.08 0.82 0.18 1.4 0.28 c0.52 0.1 1.02 0.2 1.5 0.32 c1.48 0.38 2.54 1.18 2.54 2.78 c0 2.68 -2.7 3.34 -4.86 3.34 c-1.36 0 -2.7 -0.18 -4.02 -0.44 z M53.620000000000005 14.6 l0 5.4 l-3 0 l0 -5.4 c0 -1.14 -0.54 -1.92 -1.74 -1.92 c-1.18 0 -1.76 0.8 -1.76 1.92 l0 5.4 l-3 0 l0 -5.4 c0 -1.14 -0.58 -1.92 -1.78 -1.92 c-1.18 0 -1.72 0.8 -1.72 1.92 l0 5.4 l-3 0 l0 -5.4 c0 -2.9 1.98 -4.7 4.76 -4.7 c1.42 0 2.52 0.66 3.24 1.88 c0.72 -1.22 1.82 -1.88 3.24 -1.88 c2.88 0 4.76 1.9 4.76 4.7 z M62.480000000000004 15 c-0.08 -1.46 -0.74 -2.32 -2.26 -2.32 c-0.42 0 -0.78 0.06 -1.08 0.18 c-0.92 0.42 -1.26 1.2 -1.26 2.16 c0 0.32 0.04 0.62 0.14 0.88 c0.3 1.04 1.2 1.42 2.2 1.42 c1.52 0 2.26 -0.82 2.26 -2.32 z M66.28 20 l-3 0 c-0.2 -0.5 -0.38 -1 -0.5 -1.52 c-0.68 1.12 -1.72 1.62 -3 1.62 c-2.86 0 -4.9 -2.4 -4.9 -5.14 c0 -3.16 2.36 -5.06 5.34 -5.06 c3.18 0 5.18 2.04 5.26 5.1 c0.02 0.26 0.02 0.56 0.02 0.92 c0 1.4 0.22 2.8 0.78 4.08 z M73.28 10 l3 0 l0 1 c0 1.52 -0.52 2.98 -1.64 4.02 l2.64 4.98 l-3.7 0 l-3.1 -5.92 l0 5.92 l-3 0 l0 -14 l3 0 l0 7.54 l0.46 0 c1.62 0 2.34 -1.08 2.34 -2.56 l0 -0.98 z"></path>
							</g>
						</svg>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Donec malesuada lorem maximus mauris
							scelerisque, at rutrum nulla dictum. Ut ac ligula
							sapien. Suspendisse cursus faucibus finibus.
						</p>
					</div>
					<div className="space-y-8">
						<h3 className="text-2xl font-semibold">Navigation</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/">Hem</Link>
							</li>
							<li>
								<Link href="/products">Produkter</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-8">
						<h3 className="text-2xl font-semibold">Kontakt</h3>
						<div className="flex flex-col">
							<a href="mailto:trasmak@gmail.com">
								<span className="text-blue-500 hover:text-blue-600">
									trasmak@gmail.com
								</span>
							</a>
							<a href="tel:0701234567">
								<span className="text-blue-500 hover:text-blue-600">
									070-123 45 67
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
