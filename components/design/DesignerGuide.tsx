import { useEffect, useState, createContext, useContext, useRef } from "react";
import {
	FaArrowLeft,
	FaArrowRight,
	FaImage,
	FaInfo,
	FaMousePointer,
	FaSquare,
	FaTimes,
} from "react-icons/fa";
import { LuTextCursor } from "react-icons/lu";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function DesignerGuide({
	currentTool,
}: {
	currentTool: string;
}) {
	const router = useRouter();
	const [show, setShow] = useState<
		"hide" | "welcome" | "starttutorial" | "tutorial"
	>("hide");

	useEffect(() => {
		const hasVisitedDesigner = localStorage.getItem("hasVisitedDesigner");
		if (!hasVisitedDesigner) {
			setTimeout(() => setShow("welcome"), 500);
		}
	}, []);

	useEffect(() => {
		if (router.query.t) {
			console.log("t");
			setTimeout(() => setShow("starttutorial"), 500);
			router.replace("/design");
		}
	}, [router.query.t]);

	return (
		<>
			<button
				className="flex items-center justify-center h-full aspect-square font-bold rounded-xl border hover:bg-gray-100 transition-colors"
				onClick={() => setShow("tutorial")}>
				<FaInfo />
			</button>
			{show === "welcome" && (
				<motion.div
					initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
					animate={{
						backdropFilter: "blur(2px)",
						opacity: 1,
					}}
					className="z-50 fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center backdrop-blur-[2px]">
					<div className="bg-white rounded-xl p-16 max-w-3xl w-full relative">
						<Welcome setShow={setShow} />
					</div>
				</motion.div>
			)}
			{show === "starttutorial" && (
				<motion.div
					initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
					animate={{
						backdropFilter: "blur(2px)",
						opacity: 1,
					}}
					className="z-50 fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center backdrop-blur-[2px]">
					<div className="bg-white rounded-xl p-16 max-w-3xl w-full relative">
						<StartTutorial setShow={setShow} />
					</div>
				</motion.div>
			)}
			{show === "tutorial" && (
				<>
					<Tutorial setShow={setShow} currentTool={currentTool} />
					<button
						onClick={() => setShow("hide")}
						className="fixed right-4 bottom-4 flex gap-2 items-center font-semibold border-gray-300 border-2 hover:border-red-300 hover:bg-red-100 rounded-md px-4 py-2 transition-colors">
						<FaTimes /> Avbryt guide
					</button>
				</>
			)}
		</>
	);
}

function Welcome({
	setShow,
}: {
	setShow: (show: "tutorial" | "hide") => void;
}) {
	function SetHasVisitedDesigner() {
		localStorage.setItem("hasVisitedDesigner", "true");
	}

	return (
		<div className="flex flex-col gap-8 items-center">
			<h1 className="xl:text-4xl lg:text-3xl text-2xl font-bold leading-tight text-gray-900 text-center">
				Hej!
			</h1>
			<p className="xl:text-xl text-base text-gray-600 1x-w-prose">
				Ser ut som att du är ny till designverktyget. Hur vill du
				fortsätta?
			</p>
			<div className="flex gap-4 lg:flex-row flex-col md:pt-4">
				<button
					onClick={() => {
						setShow("tutorial");
						SetHasVisitedDesigner();
					}}
					className="bg-primary text-white lg:w-fit w-full 2xl:px-16 px-8 py-4 font-semibold rounded-lg hover:bg-primary_light transition-colors">
					Visa mig hur det funkar
				</button>
				<button
					onClick={() => {
						setShow("hide");
						SetHasVisitedDesigner();
					}}
					className="border-2 lg:w-fit w-full 2xl:px-16 px-8 py-4 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
					Jag vet vad jag gör
				</button>
			</div>
		</div>
	);
}

function StartTutorial({
	setShow,
}: {
	setShow: (show: "tutorial" | "hide") => void;
}) {
	function SetHasVisitedDesigner() {
		localStorage.setItem("hasVisitedDesigner", "true");
	}

	return (
		<div className="flex flex-col gap-8 items-center">
			<h1 className="xl:text-4xl lg:text-3xl text-2xl font-bold leading-tight text-gray-900 text-center">
				Hej!
			</h1>
			<p className="xl:text-xl text-base text-gray-600 1x-w-prose text-center">
				Välkommen till designverktyget!
				<br /> Vill du starta guiden för att lära dig hur det funkar?
			</p>
			<div className="flex gap-4 lg:flex-row flex-col md:pt-4">
				<button
					onClick={() => {
						setShow("tutorial");
						SetHasVisitedDesigner();
					}}
					className="bg-primary text-white lg:w-fit w-full 2xl:px-16 px-8 py-4 font-semibold rounded-lg hover:bg-primary_light transition-colors">
					Visa mig hur det funkar
				</button>
				<button
					onClick={() => {
						setShow("hide");
						SetHasVisitedDesigner();
					}}
					className="border-2 lg:w-fit w-full 2xl:px-16 px-8 py-4 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
					Jag vet vad jag gör
				</button>
			</div>
		</div>
	);
}

function Tutorial({
	setShow,
	currentTool,
}: {
	setShow: (show: "hide") => void;
	currentTool: string;
}) {
	const [step, setStep] = useState(0);

	const steps = [
		<Step
			key={0}
			step={1}
			title="Storlekar"
			text="Här kan du välja vilken storlek du vill ha på din bricka. Prova
		att välja en av storlekarna genom att klicka på den. Du kan alltid ändra storlek
		senare."
			nextStep={NextStep}
			elementID="products"
			position="left"
		/>,
		<Step
			key={1}
			step={2}
			title="Verktyg"
			text="Här är alla verktyg du kan använda för att designa din bricka. Du kan
			välja ett verktyg genom att klicka på det."
			nextStep={NextStep}
			elementID="tools"
			position="bottom"
		/>,
		<Step
			key={2}
			step={3}
			title="Välj Textverktyget"
			text=""
			nextStep={NextStep}
			elementID="texttool"
			position="right"
			nextOnToolSelect="text"
			currentTool={currentTool}
		/>,
		<Step
			key={3}
			step={4}
			title="Sätt ut text"
			text="När du har valt textverktyget kan du sätta ut text på din bricka genom
			att klicka på brickan där du vill ha texten. Du kan ändra texten genom att
			börja skriva direkt."
			nextStep={NextStep}
			elementID="canvasparent"
			position="right"
		/>,
		<Step
			key={4}
			step={5}
			title="Ändra text"
			text="När du har placerat ut en text kan du ändra textens egenskaper i rutan till vänster. Du kan ändra textstorlek, typsnitt och färg."
			nextStep={NextStep}
			elementID="editor"
			position="right"
		/>,
		<Step
			key={5}
			step={6}
			title="Välj Bildverktyget"
			text=""
			nextStep={NextStep}
			elementID="imagetool"
			position="right"
			nextOnToolSelect="image"
			currentTool={currentTool}
		/>,
		<Step
			key={6}
			step={7}
			title="Sätt ut bild"
			text="När du har valt bildverktyget kan du sätta ut en bild på din bricka genom
			att klicka på brickan där du vill ha bilden, alternativt hålla inne muspekaren och dra för att
			bestämma storlek och placering."
			nextStep={NextStep}
			elementID="canvasparent"
			position="right"
		/>,
		<Step
			key={7}
			step={8}
			title="Ändra bild"
			text="När du har placerat ut en bild kan du ändra bilden genom att välja en bild i rutan till vänster. Du kan även justera rundning på hörnen, och välja mellan olika fyllningslägen för bilden, 
			till exempel om bilden ska fylla hela platsen eller behålla sin proportioner."
			nextStep={NextStep}
			elementID="editor"
			position="right"
		/>,
		<Step
			key={8}
			step={9}
			title="Välj Muspekaren"
			text=""
			nextStep={NextStep}
			elementID="imagetool"
			position="right"
			nextOnToolSelect="select"
			currentTool={currentTool}
		/>,
		<Step
			key={9}
			step={10}
			title="Flytta objekt"
			text="När du har valt muspekaren kan du flytta objekt genom att klicka på dem och dra dem till en ny plats. 
			Du kan även ändra storlek på bilder och rektanglar genom att dra i hörnen på dem. När du är klar kan du avmarkera objektet genom att klicka utanför."
			nextStep={NextStep}
			elementID="canvasparent"
			position="right"
		/>,
		<Step
			key={10}
			step={11}
			title="Mallar"
			text="Här finns alla mallar du kan utgå ifrån när du designar din bricka. Du
			kan välja en mall genom att klicka på den."
			nextStep={NextStep}
			elementID="templates"
			position="top"
		/>,
		<Step
			key={11}
			step={12}
			title="Skapa egen design"
			text="Nu är det dags att skapa din egen design. Du kan börja med att välja en
			mall eller börja från en tom bricka. Du kan alltid ändra mall eller storlek
			senare."
			nextStep={NextStep}
			position="center"
			isLastStep
		/>,
	];

	function NextStep() {
		setStep((prev) => prev + 1);

		if (step === steps.length - 1) {
			setShow("hide");
		}
	}

	return steps[step];
}

function Step({
	step,
	title,
	text,
	nextStep,
	elementID,
	position,
	nextOnToolSelect,
	currentTool,
	isLastStep,
}: {
	step: number;
	title: string;
	text: string;
	nextStep: () => void;
	elementID?: string;
	position?: "left" | "right" | "top" | "bottom" | "center";
	nextOnToolSelect?: "select" | "text" | "image";
	currentTool?: string;
	isLastStep?: boolean;
}) {
	const gap = 16;
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (position === "center") {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
			ref.current?.style.setProperty("left", "50%");
			ref.current?.style.setProperty("top", "50%");
			ref.current?.style.setProperty(
				"transform",
				"translate(-50%, -50%)"
			);
			return;
		}

		if (!elementID) return;

		const element = document.getElementById(elementID);
		if (element) {
			const rect = element.getBoundingClientRect();

			ref.current?.style.setProperty(
				"left",
				position === "left"
					? rect.left - (ref.current?.offsetWidth || 0) - gap + "px"
					: position === "right"
					? rect.left + rect.width + gap + "px"
					: rect.left + "px"
			);

			ref.current?.style.setProperty(
				"top",
				position === "top"
					? rect.top - (ref.current?.offsetHeight || 0) - gap + "px"
					: position === "bottom"
					? rect.top + rect.height + gap + "px"
					: rect.top + gap + "px"
			);

			window.scrollTo({
				top:
					(ref?.current?.offsetTop ?? 0) -
					(position === "top"
						? window.innerHeight / 6
						: (window.innerHeight * 2) / 3),
				behavior: "smooth",
			});
		}
	}, [elementID, position, gap, ref]);

	useEffect(() => {
		if (nextOnToolSelect && currentTool === nextOnToolSelect) {
			nextStep();
		}
	}, [currentTool, nextOnToolSelect]);

	return (
		<div
			ref={ref}
			key={title}
			className="absolute bg-white rounded-xl p-8 flex flex-col gap-4 z-50 shadow-md">
			<div>
				<span className="font-semibold text-muted">Steg {step}</span>
				<h2 className="xl:text-2xl lg:text-xl text-lg font-semibold leading-tight text-gray-900">
					{title}
				</h2>
			</div>
			<p className="max-w-[40ch]">{text}</p>
			<button
				onClick={nextStep}
				className="flex gap-2 items-center text-muted font-medium">
				{isLastStep ? "Avsluta guide" : "Nästa steg"} <FaArrowRight />
			</button>
		</div>
	);
}
