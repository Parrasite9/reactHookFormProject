import { useForm, type FieldErrors } from "react-hook-form";
import useRenderCount from "../Utils/getRenderCount";

type FoodDeliveryFormType = {
  orderNo: number;
  customerName: string;
  mobile: string;
  email: string;
};

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
          <input
            disabled
            {...register("orderNo")}
            type="text"
            className="form-control border border-white-400 px-4"
            placeholder="Order Number"
          />

          {/* MOBILE  */}
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
                required: {
                  value: true,
                  message: "This field is requried",
                },
              })}
              type="text"
              className="form-control border border-white-400 px-4"
              placeholder="Mobile"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* CUSTOMER NAME  */}
      <div className="flex flex-col-2 my-4 ">
        <div className="flex col-2 gap-4">
          <div className="flex flex-col">
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
            {errors.customerName && (
              <p className="text-red-500 text-sm">
                {errors.customerName.message}
              </p>
            )}
          </div>

          {/* EMAIL  */}
          <div className="flex flex-col">
            <input
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
              type="pattern"
              className="form-control border border-white-400 px-4"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      <button type="submit" className="bg-blue-600 px-6 py-2 rounded-xl">
        Submit
      </button>
    </form>
  );
}
