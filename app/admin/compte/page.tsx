"use client";

import React from "react";
import { useSession } from "next-auth/react";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loading from "@/components/Loading";
import EditIcon from "@mui/icons-material/Edit";
import { updateUser } from "@/actions/user-actions";

const UserProfile: React.FC = () => {
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const userData = session?.user || { username: "", email: "", phone: "" };
  const [formData, setFormData] = React.useState(userData);

  React.useEffect(() => {
    if (session?.user) {
      setFormData({
        username: session.user.username || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
      });
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading /> {/* Use your Loading component here */}
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>User not logged in.</p>
      </div>
    );
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const handlePasswordChange = () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log("Password updated successfully");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setFormData(userData); 
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    if (!session?.user?.id) return;

    const updatedData: Partial<typeof formData> = { ...formData };

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
      updatedData.password = password;
    }

    try {
      const updatedUser = await updateUser(session.user.id, updatedData);
      console.log("User updated:", updatedUser);
      setIsEditing(false);
    } catch (error) {
      setError("Failed to update user data.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center my-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-black text-2xl font-bold">Mes données</h1>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleEditToggle}
          >
            {isEditing ? "Annuler" : <EditIcon />}
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom d&apos;utilisateur
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isEditing ? "bg-white" : "bg-gray-100"}`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PersonIcon style={{ color: "black" }} />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isEditing ? "bg-white" : "bg-gray-100"}`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailOutlineIcon style={{ color: "black" }} />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isEditing ? "bg-white" : "bg-gray-100"}`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon style={{ color: "black" }} />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isEditing}
                  className={`block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isEditing ? "bg-white" : "bg-gray-100"}`}
                  placeholder="Votre mot de passe"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon style={{ color: "black" }} />
                </div>
                {isEditing && (
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon style={{ color: "black" }} />
                    ) : (
                      <VisibilityIcon style={{ color: "black" }} />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={!isEditing}
                  className={`block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isEditing ? "bg-white" : "bg-gray-100"}`}
                  placeholder="Confirmer le mot de passe"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon style={{ color: "black" }} />
                </div>
                {isEditing && (
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon style={{ color: "black" }} />
                    ) : (
                      <VisibilityIcon style={{ color: "black" }} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {isEditing && (
            <div className="mt-6">
              <button
                type="button"
                onClick={handleSave}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF471C] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-900"
              >
                Sauvegarder les modifications
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
