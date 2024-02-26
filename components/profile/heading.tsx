import { IconEdit } from "@tabler/icons-react";

interface ProfileHeadingProps {
  callback: () => void;
}

/**
 * Profile Heading Component.
 * Renders a heading for editing the user's profile.
 * @param {ProfileHeadingProps} props - Props containing a callback function to handle editing.
 * @returns {JSX.Element} - ProfileHeading component JSX.
 */
const ProfileHeading: React.FC<ProfileHeadingProps> = (
  props: ProfileHeadingProps
): JSX.Element => {
  return (
    <>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
        Edit Your Profile
      </h1>
      <button onClick={props.callback}>
        <IconEdit color="#737373" />
      </button>
    </>
  );
};

export default ProfileHeading;
