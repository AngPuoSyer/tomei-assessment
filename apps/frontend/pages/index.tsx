import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import StepBar from "../components/StepBar";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { unvisit } from "../redux/visitedUser";

export default function MainPage() {
  const visitedUser = useSelector((state: any) => state.vu.value);
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedImg, setSelectedImg] = useState("");
  const [selectedImgFile, setSelectedImgFile] = useState<File | null>(null);

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImg(URL.createObjectURL(event.target.files[0]));
      setSelectedImgFile(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };

  const submitMutation = useMutation({
    mutationFn: (variable: any) => {
      return axios.post("http://localhost:8000/auth/signup", variable, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      toast("Submitted", {
        type: "success",
        autoClose: 3000,
      });
    },
    onError: () => {
      toast("Error", {
        type: "error",
        autoClose: 5000,
        theme: "colored",
      });
    },
  });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const fileReg = register("file");

  const onSubmit = (data: any) => {
    console.log(data);
    const formData = new FormData();
    for (const key in data) {
      if (key === "file") formData.append(key, selectedImgFile as Blob);
      else formData.append(key, data[key]);
    }
    submitMutation.mutate(formData);
  };
  return (
    <div className="w-full">
      <ToastContainer />
      <div className="mx-auto my-8 md:my-12">
        <img src="/Logo.png" className="mx-auto" />
      </div>
      <StepBar className="my-8 w-full mx-auto" />
      <div className="w-full">
        <div className="w-8/12 bg-[#C5DCFA] mx-auto">
          <p className="text-center text-[21px] font-semibold">
            CREATE YOUR ACCOUNT
          </p>
        </div>
        <div className="mx-auto w-8/12 my-6 text-center text-base">
          <p>
            Because there will be documents that you need to prepare to apply
            for the loan, let&apos;s start off by creating a password so that
            you can login to your account once you have these document ready.
          </p>
        </div>
        <div className="flex w-full justify-center mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="w-8/12">
            <div className="w-full flex flex-col md:flex-row items-center gap-10">
              <div className="w-3/12">
                <img
                  src={`${selectedImg || "Avatar.png"}`}
                  className="mx-auto mb-8 h-[132px] w-[132px]"
                ></img>
                <div>
                  <input
                    {...fileReg}
                    name="file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onImageChange}
                    ref={(e) => {
                      if (e) {
                        fileReg.ref(e);
                        hiddenFileInput.current = e;
                      }
                    }}
                  />
                  <button
                    className="cursor-pointer text-base font-bold mx-auto w-full"
                    onClick={() => {
                      hiddenFileInput.current?.click();
                    }}
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div className="w-9/12 grid grid-cols-4 gap-8 content-center font-semibold text-[#C7C7C7]">
                <span className="flex flex-col col-span-4 md:col-span-2">
                  <label>Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className="border-[#C7C7C7] border-solid border-2 rounded-md h-10"
                  />
                  <label className="text-red-700 font-normal">
                    {errors.name?.message as string}
                  </label>
                </span>
                <span className="flex flex-col col-span-4 md:col-span-2">
                  <label>Email</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      validate: (value: string) => {
                        const emailSchema = z.string().email("Invalid Email");
                        const result = emailSchema.safeParse(value);
                        if (!result.success) return "Invalid Email";
                      },
                    })}
                    type="text"
                    className="border-[#C7C7C7] border-solid border-2 rounded-md h-10"
                  />
                  <label className="text-red-700 font-normal">
                    {errors.email?.message as string}
                  </label>
                </span>
                <span className="flex flex-col col-span-4 md:col-span-2">
                  <label>Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    className="border-[#C7C7C7] border-solid border-2 rounded-md h-10"
                  />
                  <label className="text-red-700 font-normal">
                    {errors.password?.message as string}
                  </label>
                </span>
                <span className="flex flex-col col-span-4 md:col-span-2">
                  <label>Confirm Password</label>
                  <input
                    {...register("confirmPassword", {
                      required: true,
                      validate: (val: string) => {
                        if (watch("password") !== val) {
                          return "Your passwords do no match";
                        }
                      },
                    })}
                    type="password"
                    className="border-[#C7C7C7] border-solid border-2 rounded-md h-10"
                  />
                  {errors.confirmPassword?.message && (
                    <label className="text-red-700 font-normal">
                      {errors.confirmPassword?.message as string}
                    </label>
                  )}
                </span>
              </div>
            </div>
            <button className="flex gap-4 float-right border p-4 rounded-lg bg-[#C5DCFA] text-[#0A3977] font-semibold mt-4">
              SAVE & EXIT<img src="arrow-right.png"></img>
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center mt-8 gap-10 items-center">
        <Link href="users">All Users</Link>
        {visitedUser && (
          <div className="flex gap-4 items-center">
            <p>Visted User Page</p>
            <button
              className="border-2 border-slate-400 p-2 rounded-lg"
              onClick={() => dispatch(unvisit())}
            >
              Unvisit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
