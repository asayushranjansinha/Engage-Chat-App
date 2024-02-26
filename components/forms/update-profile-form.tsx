// React related imports
import React, { useEffect, useState } from "react";

// Form related imports
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Authentication related imports
import { useSession } from "next-auth/react";

// Notification related imports
import { toast } from "sonner";

// Cloudinary related imports
import { CldUploadButton } from "next-cloudinary";

// Image related imports
import Image from "next/image";

// Icon related imports
import { IconSignature } from "@tabler/icons-react";
import { Lock, SquareUserRound } from "lucide-react";

// UI component imports
import { Button } from "@/components/ui/button";
import Loading from "../loading";

interface UpdateProfileFormProps {
  isEditable: boolean;
  setEditable: (state: boolean) => void;
}

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

/**
 * Form component for updating user profile information.
 * @param {UpdateProfileFormProps} props - Props for the UpdateProfileForm component.
 * @returns {JSX.Element} - UpdateProfileForm component JSX.
 */
const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  isEditable,
  setEditable,
}: UpdateProfileFormProps): JSX.Element => {
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

  const { data: session } = useSession();
  const currentUser = session?.user;

  /**
   * Handles updating user profile information.
   * @param {ValidationSchemaType} data - Data containing updated user profile information.
   * @returns {Promise<void>} - A Promise that resolves when the update process is complete.
   */
  const updateUser: SubmitHandler<ValidationSchemaType> = async (
    data: ValidationSchemaType
  ): Promise<void> => {
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

  /**
   * Handles uploading a photo for the user's profile.
   * @param {any} result - The result containing information about the uploaded photo.
   * @returns {void}
   */
  const handleUploadPhoto = (result: any): void => {
    setValue("profileImage", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    const setUserDetails = (): void => {
      reset({
        name: currentUser?.name,
        username: currentUser?.username,
        profileImage: currentUser?.profileImageUrl,
      });
    };
    if (currentUser) {
      // console.log(currentUser);
      setUserDetails();
    }
  }, [currentUser]);

  useEffect(() => {
    toast.message(
      "Your current picture looks lonely, why not give it a friend? Upload a new photo!"
    );
  }, []);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(updateUser)}>
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
          <span className="text-red-800 ml-2">{errors.name?.message}</span>
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
          <span className="text-red-800 ml-2">{errors.username?.message}</span>
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
          <span className="text-red-800 ml-2">{errors.password?.message}</span>
        )}
      </>

      {/* Profile Image */}
      <div className="w-full flex flex-col sm:flex-row gap-2 items-center justify-between">
        <Image
          src={
            watch("profileImage") ||
            currentUser?.profileImageUrl ||
            "/person.png"
          }
          height={100}
          width={100}
          alt="profile"
          className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border flex items-center justify-center"
        />
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUploadPhoto}
          uploadPreset={PRESET}
          className="flex items-center h-10 w-fit rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="text-sm font-medium">Upload New Photo</span>
        </CldUploadButton>
      </div>

      <Button type="submit" disabled={!isEditable}>
        Save Changes
      </Button>
    </form>
  );
};

export default UpdateProfileForm;
