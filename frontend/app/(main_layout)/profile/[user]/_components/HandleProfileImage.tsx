/* eslint-disable prettier/prettier */
export default function HandleProfileImage() {
  return (
    <>
      {isWonProfile && (
        <>
          <label
            className="absolute w-24 inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-100 transition-opacity duration-300 cursor-pointer rounded-full"
            htmlFor="profile-picture"
          >
            {/* <span className="text-white">Change</span> */}
            <CiCamera className="mt-10" size={20} />
          </label>
          <input
            accept="image/*"
            className="hidden"
            id="profile-picture"
            type="file"
            onChange={handleChangeProfilePicture}
          />
        </>
      )}
    </>
  );
}
