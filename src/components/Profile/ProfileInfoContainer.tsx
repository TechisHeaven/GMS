import { User } from "../../types/user";

interface ProfileInfoContainer {
  user: User;
  callback: (isModalOpen: boolean) => void;
}
const ProfileInfoContainer = ({ user, callback }: ProfileInfoContainer) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex items-center gap-4">
        <div className=" h-16 w-16 aspect-square items-center flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user-image"
            className="rounded-full"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {user?.fullName}
            </h2>
            <button
              className="text-orange-600 cursor-pointer"
              onClick={() => callback(true)}
            >
              Edit
            </button>
          </div>
          <p className="text-gray-600">{user?.phoneNumber}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoContainer;
