import { useForm, FormState, type FieldErrors } from "react-hook-form";
import useRenderCount from "../Utils/getRenderCount";

type FoodDeliveryFormType = {
	orderNo: number;
	customerName: string;
	mobile: string;
	email: string;
};

const RenderCount = useRenderCount();

export default function FoodDeliveryForm() {
	const { register, handleSubmit } = useForm<FoodDeliveryFormType>({
		defaultValues: {
			orderNo: new Date().valueOf(),
			customerName: "",
			mobile: "",
			email: "",
		},
	});

	console.log(register("customerName"));

	// const customerControl = register("customerName");

	const onSubmit = (formData: FoodDeliveryFormType) => {
		console.log("Form Data", formData);
	};

	const onError = (err: FieldErrors) => {
		console.log("Validation Err: ", err);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit, onError)}>
			<h1 className="text-red-400">Title</h1>
			<RenderCount />
			<div className="flex flex-col-2 my-4 ">
				<div className="flex col-2 gap-4">
					<input
						disabled
						{...register("orderNo")}
						type="text"
						className="form-control border border-white-400 px-4"
						placeholder="Order Number"
					/>

					<div className="flex flex-col">
						<input
							{...register("mobile", {
								minLength: {
									value: 10,
									message: "It needs to be atleast 10 digits.",
								},
								maxLength: {
									value: 10,
									message: "It needs to be 10 digits.",
								},
								required: true,
							})}
							type="text"
							className="form-control border border-white-400 px-4"
							placeholder="Mobile"
						/>
						<div>{formState.errors.mobile?.message}</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col-2 my-4 ">
				<div className="flex col-2 gap-4">
					<input
						{...register("customerName", {
							required: {
								value: true,
								message: "This field is requried",
							},
						})}
						type="text"
						className="form-control border border-white-400 px-4"
						placeholder="Customer Name"
					/>

					<div className="flex flex-col">
						<input
							{...register("email", {
								pattern: {
									message: "Incorrect Format",
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								},
							})}
							type="pattern"
							className="form-control border border-white-400 px-4"
							placeholder="Email"
						/>
					</div>
				</div>
			</div>

			<button type="submit" className="bg-blue-600 px-6 py-2 rounded-xl">
				Submit
			</button>
		</form>
	);
}
