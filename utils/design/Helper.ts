import { DesignProps, ObjectProps } from "./Interfaces";

export function GetObjectDimensions(
	ctx: CanvasRenderingContext2D,
	tray: ObjectProps,
	obj: ObjectProps,
	absolute: boolean = false
) {
	function MeasureTextWidth(
		ctx: CanvasRenderingContext2D,
		text: ObjectProps
	) {
		ctx.font = `bold ${text.size}px ${text.font ?? "sans-serif"}`;
		const lines = text.content.split("\n");
		return Math.max(...lines.map((line) => ctx.measureText(line).width));
	}

	function MeasureTextHeight(
		ctx: CanvasRenderingContext2D,
		text: ObjectProps
	) {
		ctx.font = `bold ${text.size}px ${text.font ?? "sans-serif"}`;
		const lines = text.content.split("\n");
		return lines.length * (text.size || 0);
	}

	if (absolute) {
		const width =
			obj.type === "text"
				? MeasureTextWidth(ctx, obj) / (tray.width ?? 0)
				: obj.width || 0;
		const height =
			obj.type === "text"
				? MeasureTextHeight(ctx, obj) / (tray.height ?? 0)
				: obj.height || 0;

		const x = obj.x;
		const y = obj.y;

		return { x, y, width, height };
	}

	const width =
		obj.type === "text"
			? MeasureTextWidth(ctx, obj)
			: (obj.width || 0) * (tray.width || 0);
	const height =
		obj.type === "text"
			? MeasureTextHeight(ctx, obj)
			: (obj.height || 0) * (tray.height || 0);

	const x = tray.x + (tray.width ?? 0) * obj.x;
	const y = tray.y + (tray.height ?? 0) * obj.y;

	return { x, y, width, height };
}

export function GetTrayObjFromCanvas(
	canvas: HTMLCanvasElement,
	heightProcentage: number = 0.85,
	width: number = 43,
	height: number = 33,
	radius: number = 20,
	bleed: number = 10,
	edge: number = 20
): ObjectProps {
	const aspectRatio = (width + bleed / 10) / (height + bleed / 10);
	const newWidth = canvas.height * heightProcentage * aspectRatio;
	const newHeight = canvas.height * heightProcentage;
	const newRadius =
		(radius / 100) * (newWidth > newHeight ? newHeight : newWidth);
	const newBleed = (bleed / 10) * (newWidth / width);
	const newEdge = (edge / 20) * (newWidth / width);

	return {
		id: 0,
		type: "tray",
		content: "",
		color: "#eeeeee",
		x: (canvas.width - newWidth) / 2,
		y: (canvas.height - newHeight) / 2,
		width: newWidth,
		height: newHeight,
		radius: newRadius,
		order: 0,
		bleed: newBleed,
		edge: newEdge,
	};
}

export function LoadImages(
	design: DesignProps,
	Draw: (design: DesignProps) => void
) {
	if (design.image && !design.imageElement) {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = design.image;
		img.onload = () => {
			design.imageElement = img;
			Draw(design);
		};
	}

	design.objects?.forEach((obj) => {
		if (
			obj.type === "image" &&
			(!obj.image || obj.content !== obj.image.src)
		) {
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.src = obj.content;
			img.onload = () => {
				obj.image = img;
				Draw(design);
			};
		}
	});
}

export function SetTrayObject(
	products: any,
	currentDesignID: string,
	setTrayObject: (tray: ObjectProps) => void
) {
	const canvas = document.getElementById("canvas") as HTMLCanvasElement;
	if (!canvas) return;

	const metadata = products.find(
		(product: any) =>
			product.id.substring(6, product.id.length) === currentDesignID
	)?.metadata;

	const tray = GetTrayObjFromCanvas(
		canvas,
		0.85,
		metadata?.width,
		metadata?.height,
		metadata?.radius,
		metadata?.bleed,
		metadata?.edge
	);

	if (tray) {
		setTrayObject(tray);
	}
}

export function LoopUntilSetTrayObject(
	products: any,
	currentDesignID: string,
	trayObject: ObjectProps | null,
	setTrayObject: (tray: ObjectProps) => void
) {
	function GetLoop() {
		if (!trayObject) {
			return setInterval(
				() => SetTrayObject(products, currentDesignID, setTrayObject),
				100
			);
		}

		return null;
	}

	const loop: any = GetLoop();

	return () => {
		clearInterval(loop);
	};
}
