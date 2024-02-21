"use client";
// React imports
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// Next.js imports
import Image from "next/image";
import { useSession } from "next-auth/react";

// External package imports
import { z } from "zod";
import { CldUploadButton } from "next-cloudinary";
import { Lock, SquareUserRound } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEdit, IconSignature } from "@tabler/icons-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().optional(),
  profileImage: z.string(),
});

type ValidationSchemaType = z.infer<typeof schema>;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const { data: session } = useSession();
  const currentUser = session?.user;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const uploadPhoto = (result: any) => {
    setValue("profileImage", result.info.secure_url, {
      shouldValidate: true,
    });
  };
  const setUserDetails = () => {
    reset({
      name: currentUser?.name,
      username: currentUser?.username,
      profileImage: currentUser?.profileImage,
    });
  };

  const updateUser: SubmitHandler<ValidationSchemaType> = async (data) => {
    const apiEndPoint = `/api/users/${currentUser?._id}/update`;
    try {
      setEditable(false);
      const serverResponse = await fetch(apiEndPoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let responseJson = await serverResponse.json();
      //   Check for failure
      if (!serverResponse.ok) {
        toast.error(responseJson.message);
        return;
      }

      //   Successful request
      toast.success(responseJson.message);
      // console.log(responseJson);
      window.location.reload();
    } catch (error) {
      console.log("Error during profile update: ", error);
      toast.error("Profile update Failed!");
    }
  };

  const handleEdit = () => {
    setEditable((prev) => !prev);
  };
  useEffect(() => {
    if (currentUser) {
      // console.log(currentUser);
      setUserDetails();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <main className="page">
      <div className="container-class">
        <div className="content">
          <div className="gap-4 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Edit Your Profile
            </h1>
            <button onClick={handleEdit}>
              <IconEdit color="#737373" />
            </button>
          </div>
          <form className="form" onSubmit={handleSubmit(updateUser)}>
            {/* Name */}
            <>
              <div className="input">
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Name"
                  className="input-field"
                  disabled={!isEditable}
                />
                <IconSignature color="#737373" />
              </div>
              {errors.name && (
                <span className="text-red-800 ml-2">
                  {errors.name?.message}
                </span>
              )}
            </>

            {/* Username */}
            <>
              <div className="input">
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Username"
                  className="input-field"
                  disabled={!isEditable}
                />
                <SquareUserRound color="#737373" />
              </div>
              {errors.username && (
                <span className="text-red-800 ml-2">
                  {errors.username?.message}
                </span>
              )}
            </>

            {/* Password */}
            <>
              <div className="input">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  disabled={!isEditable}
                />
                <Lock color="#737373" />
              </div>
              {errors.password && (
                <span className="text-red-800 ml-2">
                  {errors.password?.message}
                </span>
              )}
            </>

            {/* Profile Image */}
            <div className="w-full flex flex-col sm:flex-row gap-2 items-center justify-between">
              <Image
                src={
                  watch("profileImage") ||
                  currentUser?.profileImage ||
                  "/person.png"
                }
                height={100}
                width={100}
                alt="profile"
                className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border flex items-center justify-center"
              />
              <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={uploadPhoto}
                uploadPreset={PRESET}
              >
                <p className="px-4 py-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-800 transition-colors rounded-lg">
                  Upload New Photo
                </p>
              </CldUploadButton>
            </div>

            <button type="submit" className="button" disabled={!isEditable}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
