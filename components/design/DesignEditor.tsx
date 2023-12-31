import {
	RefObject,
	createContext,
	useCallback,
	useContext,
	useEffect,
} from "react";
import { DesignProps, ObjectProps } from "../../utils/design/Interfaces";
import debounce from "lodash.debounce";

import { FaTrash, FaChevronUp, FaChevronDown, FaExpand } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { GetObjectDimensions } from "../../utils/design/Helper";

const SelectedObjectContext = createContext({
	object: null as ObjectProps | null,
	setObject: (obj: ObjectProps) => {},
});

export default function DesignEditor({
	design,
	setDesign,
	object,
	setObject,
	removeObject,
}: {
	design: DesignProps;
	setDesign: (design: DesignProps) => void;
	object: ObjectProps | null;
	setObject: (obj: ObjectProps) => void;
	removeObject: () => void;
}) {
	if (!object) return null;

	return (
		<SelectedObjectContext.Provider value={{ object, setObject }}>
			<div
				className="flex flex-col gap-2 bg-white border rounded-md p-4"
				id="editor">
				<div className="flex items-center gap-2">
					{object?.type === "image" && (
						<Input label="Bildkälla" objKey="content" type="file" />
					)}
					{object?.type === "rectangle" && (
						<Input
							label="Färg"
							objKey="color"
							type="color"
							className="h-16"
						/>
					)}
					{object.type === "text" && (
						<TextArea
							label="Text"
							objKey="content"
							className="h-16"
						/>
					)}
					<div className="border border-gray-300 rounded-md flex items-center gap-4 h-16 px-4">
						{object?.type !== "text" && (
							<button
								onClick={() =>
									setObject({
										...object,
										x: 0,
										y: 0,
										width: 1,
										height: 1,
									})
								}>
								<FaExpand />
							</button>
						)}
						<div className="flex flex-col items-center">
							<span className="text-sm leading-none -mt-5 mb-1 px-2 bg-white text-muted_light font-semibold">
								Lager
							</span>
							<div className="flex gap-4">
								<button
									onClick={() =>
										ChangeOrder(
											design,
											setDesign,
											object,
											1
										)
									}>
									<FaChevronUp />
								</button>
								<button
									onClick={() =>
										ChangeOrder(
											design,
											setDesign,
											object,
											-1
										)
									}>
									<FaChevronDown />
								</button>
							</div>
						</div>
						<button onClick={() => removeObject()}>
							<FaTrash />
						</button>
					</div>
				</div>
				<div className="h-12 flex gap-2">
					{object?.type === "text" && (
						<Input label="Färg" objKey="color" type="color" />
					)}
					<Input
						label="Textstorlek (px)"
						objKey="size"
						type="number"
					/>
					<Select
						label="Font"
						objKey="font"
						options={[
							{ value: "cinzel", text: "Cinzel" },
							{ value: "dancing script", text: "Dancing Script" },
							{ value: "comfortaa", text: "Comfortaa" },
							{ value: "gourgette", text: "Gourgette" },
							{ value: "sono", text: "Sono" },
							{ value: "whisper", text: "Whisper" },
							{
								value: "plus jakarta sans",
								text: "Plus Jakarta Sans",
							},
							{ value: "courier new", text: "Courier New" },
							{
								value: "times new roman",
								text: "Times New Roman",
							},
							{ value: "arial", text: "Arial" },
						]}
					/>
					<Select
						label="Bildjustering"
						objKey="fit"
						options={[
							{ value: "cover", text: "Zoomad" },
							{ value: "contain", text: "Proportionell" },
							{ value: "fill", text: "Sträckt" },
						]}
					/>
					<Input
						label="Rundning (px)"
						objKey="radius"
						type="number"
					/>
				</div>
				<div className="flex items-stretch gap-2"></div>
			</div>
		</SelectedObjectContext.Provider>
	);
}

function ChangeOrder(
	design: DesignProps,
	setDesign: (design: any) => void,
	object: ObjectProps,
	order: number
) {
	const maxOrder = Math.max(...design.objects.map((o) => o.order));
	const minOrder = Math.min(...design.objects.map((o) => o.order));

	const selectedObject = design.objects.find((obj) => obj.id === object.id);
	if (!selectedObject) return;

	if (order > 0 && selectedObject.order === maxOrder) return;
	if (order < 0 && selectedObject.order === minOrder) return;

	setDesign((d: DesignProps) => {
		if (!d) return d;
		const objects = d.objects.map((obj: ObjectProps) => {
			if (order > 0) {
				if (obj.id === object.id) {
					return { ...obj, order: obj.order + 1 };
				}
				if (obj.order === selectedObject.order + 1) {
					return { ...obj, order: obj.order - 1 };
				}
			} else {
				if (obj.id === object.id) {
					return { ...obj, order: obj.order - 1 };
				}
				if (obj.order === selectedObject.order - 1) {
					return { ...obj, order: obj.order + 1 };
				}
			}

			return obj;
		});

		return { ...d, objects };
	});
}

function TextArea({
	label,
	objKey,
	className,
}: {
	label: string;
	objKey: "content";
	className?: string;
}) {
	const { object, setObject } = useContext(SelectedObjectContext);

	if (!object || !(objKey in object)) return null;

	return (
		<div className={`flex flex-col gap-1 grow  ${className}`}>
			<label className="sr-only" htmlFor={label}>
				{label}
			</label>
			<textarea
				name={label}
				id={label}
				className="border border-gray-300 rounded-md p-2 h-full resize-none"
				rows={1}
				placeholder={label}
				value={object[objKey]}
				onChange={(e) =>
					setObject({
						...(object as ObjectProps),
						[objKey]: e.target.value,
					})
				}
			/>
		</div>
	);
}

function Input({
	label,
	objKey,
	type = "text",
	className,
}: {
	label: string;
	objKey:
		| "x"
		| "y"
		| "width"
		| "height"
		| "radius"
		| "size"
		| "color"
		| "content";
	type?: string;
	className?: string;
}) {
	const { object, setObject } = useContext(SelectedObjectContext);

	const onDrop = useCallback((acceptedFiles: any) => {
		if (acceptedFiles && acceptedFiles.length > 0) {
			const reader = new FileReader();

			reader.onloadend = () => {
				const img = new Image();
				img.src = reader.result as string;

				img.onload = () => {
					const resolution = img.width * img.height;
					if (resolution < 500000) {
						toast.error(
							"Bilden är för lågupplöst. Välj en bild med högre upplösning."
						);
					} else {
						setObject({
							...(object as ObjectProps),
							[objKey]: reader.result as string,
						});
					}
				};
			};

			reader.readAsDataURL(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		noClick: true,
	});

	const debouncedSetObject = debounce((value) => {
		setObject(value);
	}, 10);

	if (!object || !(objKey in object)) return null;

	if (type === "color")
		return (
			<div className={`flex flex-col gap-1 aspect-square ${className}`}>
				<label className="sr-only" htmlFor={label}>
					{label}
				</label>
				<div className="relative rounded-md border border-gray-300 h-full w-full">
					<input
						type="color"
						name={label}
						id={label}
						className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
						value={object[objKey]}
						onChange={(e) =>
							debouncedSetObject({
								...(object as ObjectProps),
								[objKey]: e.target.value,
							})
						}
					/>
					<div
						className="absolute inset-0 pointer-events-none rounded-[4px]"
						style={{
							backgroundColor: object[objKey] as string,
						}}></div>
				</div>
			</div>
		);

	if (type === "file")
		return (
			<div className="flex flex-col gap-1 grow">
				<label
					{...getRootProps()}
					className="cursor-pointer border border-gray-300 rounded-md px-4 h-16 hover:border-gray-200"
					htmlFor={label}>
					<div className="flex items-center justify-center gap-2 h-full">
						<svg
							className="w-6 h-6 text-muted_light"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 16">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
							/>
						</svg>
						<div>
							<p className="text-sm text-muted_light font-semibold whitespace-nowrap">
								Klicka för att ladda upp bild
							</p>
							<p className="text-sm text-muted_light whitespace-nowrap">
								eller dra och släpp en bild här
							</p>
						</div>
					</div>
					<input
						{...getInputProps()}
						name={label}
						id={label}
						className="hidden"
					/>
				</label>
			</div>
		);

	if (type === "number")
		return (
			<div className="flex gap-2 grow border border-gray-300 rounded-md px-2">
				<label className="sr-only" htmlFor={label}>
					{label}
				</label>
				<input
					type="range"
					name={label}
					id={label}
					min="0"
					max="200"
					value={objKey in object ? object[objKey] : ""}
					onChange={(e) =>
						setObject({
							...object,
							[objKey]: e.target.value,
						})
					}
				/>
				<input
					type="number"
					name={label}
					id={label}
					className="py-2 h-full w-[6ch] outline-none"
					value={objKey in object ? object[objKey] : ""}
					onChange={(e) =>
						setObject({
							...object,
							[objKey]: e.target.value,
						})
					}
				/>
			</div>
		);

	return (
		<div className="flex flex-col gap-1 grow">
			<label className="sr-only" htmlFor={label}>
				{label}
			</label>
			<input
				type={type}
				name={label}
				id={label}
				className="border border-gray-300 rounded-md p-2 h-full"
				value={objKey in object ? object[objKey] : ""}
				onChange={(e) =>
					setObject({
						...object,
						[objKey]: e.target.value,
					})
				}
			/>
		</div>
	);
}

function Select({
	label,
	objKey,
	options,
}: {
	label: string;
	objKey: "font" | "fit";
	options: { value: string; text: string }[];
}) {
	const { object, setObject } = useContext(SelectedObjectContext);

	if (!object || !(objKey in object)) return null;

	return (
		<div className="flex flex-col gap-1 grow">
			<label className="sr-only" htmlFor={label}>
				{label}
			</label>
			<select
				name={label}
				id={label}
				className="border border-gray-300 rounded-md p-2 h-full"
				style={objKey === "font" ? { fontFamily: object[objKey] } : {}}
				value={object[objKey]}
				onChange={(e) =>
					setObject({
						...(object as ObjectProps),
						[objKey]: e.target.value,
					})
				}>
				{options?.map((option, i) => (
					<option
						key={i}
						value={option.value}
						style={
							objKey === "font"
								? { fontFamily: option.value }
								: {}
						}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}

export function MoveDesignEditor(
	designEditorRef: RefObject<HTMLDivElement>,
	canvas: HTMLCanvasElement,
	trayObject: ObjectProps,
	selectedObject: ObjectProps | undefined
) {
	if (!designEditorRef.current || !selectedObject) return;

	const ctx = canvas.getContext("2d");
	const rect = canvas.getBoundingClientRect();
	if (!ctx || !rect) return;

	const { x, y, height } = GetObjectDimensions(
		ctx,
		trayObject,
		selectedObject
	);

	const left = x * (rect.width / canvas.width) - 8;
	const top = (y + height) * (rect.height / canvas.height) + 16;

	if (left > rect.width) {
		designEditorRef.current.style.left = `${rect.width}px`;
	} else {
		designEditorRef.current.style.left = `${left}px`;
	}

	if (top > rect.height) {
		designEditorRef.current.style.top = `${rect.height}px`;
	} else {
		designEditorRef.current.style.top = `${top}px`;
	}
}
