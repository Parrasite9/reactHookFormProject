import { useForm, type FieldErrors } from "react-hook-form";
import useRenderCount from "../Utils/getRenderCount";
import { TextField } from "../Controls/TextField";
import { Select } from "../Controls/Select";
import type { SelectOptionType } from "../Types";

type FoodDeliveryFormType = {
  orderNo: number;
  customerName: string;
  mobile: string;
  email: string;
  paymentMethod?: string;
  deliveryIn: number;
};

const paymentOptions: SelectOptionType[] = [
  { value: "", text: "Select" },
  { value: "online", text: "Paid Online" },
  { value: "COD", text: "Cash On Delivery" },
];

const deliveryInOptions: SelectOptionType[] = [
  { value: 0, text: "Select" },
  { value: 30, text: "30 minutes" },
  { value: 60, text: "1 hour" },
  { value: 120, text: "2 hour" },
  { value: 180, text: "3 hour" },
];

const RenderCount = useRenderCount();

export default function FoodDeliveryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDeliveryFormType>({
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      orderNo: new Date().valueOf(),
      customerName: "",
      mobile: "",
      email: "",
      paymentMethod: "",
      deliveryIn: 0,
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

      {/* ORDER NO  */}
      <div className="flex flex-col-2 my-4 ">
        <div className="flex col-2 gap-4">
          <TextField
            disabled
            {...register("orderNo")}
            type="text"
            className="form-control border border-white-400 px-4"
            placeholder="Order Number"
          />

          {/* MOBILE  */}
          <div className="flex flex-col">
            <TextField
              {...register("mobile", {
                minLength: {
                  value: 10,
                  message: "It needs to be atleast 10 digits.",
                },
                maxLength: {
                  value: 10,
                  message: "It needs to be 10 digits.",
                },
                required: {
                  value: true,
                  message: "This field is requried",
                },
              })}
              type="text"
              className="form-control border border-white-400 px-4"
              placeholder="Mobile"
              error={errors.mobile}
            />
          </div>
        </div>
      </div>

      {/* CUSTOMER NAME  */}
      <div className="flex flex-col-2 my-4 ">
        <div className="flex col-2 gap-4">
          <TextField
            type="text"
            className="form-control border border-white-400 px-4"
            placeholder="Customer Name"
            {...register("customerName", {
              required: {
                value: true,
                message: "This field is requried",
              },
            })}
            error={errors.customerName}
          />

          {/* EMAIL  */}
          <div className="flex flex-col">
            <TextField
              type="pattern"
              className="form-control border border-white-400 px-4"
              placeholder="Email"
              {...register("email", {
                pattern: {
                  message: "Incorrect Format",
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                },
                validate: {
                  notFake: (value) => {
                    return (
                      value != "email@gmail.com" || "This email is not allowed"
                    );
                  },
                  notFromBlackListedDomain: (value) => {
                    return (
                      (!value.endsWith("@xyz.com") &&
                        !value.endsWith("@example.com")) ||
                      "This domain is not allowed"
                    );
                  },
                },
              })}
              error={errors.email}
            />
          </div>
        </div>
      </div>

      {/* DROP DOWN */}
      <div>list of ordered food items</div>
      <div className="flex flex-row mb-2">
        <div className="flex flex-col">
          {/* PAYMENT METHOD */}
          <Select
            options={paymentOptions}
            {...register("paymentMethod", {
              required: "This field is required",
            })}
            error={errors.paymentMethod}
          />
        </div>
        <div className="flex flex-col">
          {/* DELIVERY IN */}
          <Select
            options={deliveryInOptions}
            {...register("deliveryIn")}
            error={errors.deliveryIn}
          />
        </div>
      </div>
      <div>delivery address</div>

      <button type="submit" className="bg-blue-600 px-6 py-2 rounded-xl">
        Submit
      </button>
    </form>
  );
}
