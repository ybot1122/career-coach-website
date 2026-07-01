import sa_upload_profile_pic from "@/app/members/(auth_required)/dashboard/sa_upload_profile_pic";
import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProfileCircle from "@/components/common/ProfileCircle";
import { useFirebase } from "@/context/FirebaseApp";
import { useState } from "react";

export default function () {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, loadUserProfile } = useFirebase();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please select a smaller file.");
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    setError(null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <h3 className="text-coaching-blue">Change Profile Picture</h3>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-[150px]">
          <LoadingSpinner color="text-coaching-blue" />
        </div>
      ) : success ? (
        <div>Profile picture updated.</div>
      ) : (
        <form
          className="space-y-6"
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setLoading(true);
            try {
              const firebaseToken = await user?.getIdToken()!;
              const result = await sa_upload_profile_pic({
                firebaseToken,
                imageFile: selectedFile!,
              });
              await loadUserProfile?.();
              setLoading(false);
              if (result.status === "fail") {
                setError("Something went wrong.");
              } else {
                setSuccess(true);
              }
            } catch (err) {
              setLoading(false);
              setError("Something went wrong.");
            }
          }}
        >
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Selected profile"
                  className="w-32 h-32 rounded-full object-cover border border-coaching-dark-gray"
                />
              )}
            </div>
          </div>
          <div>
            <div className="relative flex items-center">
              <label
                htmlFor="profilePicture"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-coaching-blue text-white rounded-md shadow-sm hover:bg-coaching-light-blue transition-colors duration-150 font-semibold"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Choose File
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/jpeg,image/png"
                  className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
              {selectedFile && (
                <span className="ml-4 text-coaching-black truncate max-w-xs">
                  {selectedFile.name}
                </span>
              )}
            </div>
            <div className="mt-2 text-coaching-black">
              JPG or PNG only. 5 MB max size.
            </div>
            {error && <div className="mt-2 text-coaching-red">{error}</div>}
          </div>
          {selectedFile && (
            <div className="pt-4">
              <Button type="submit">Upload Picture</Button>
            </div>
          )}
        </form>
      )}
    </>
  );
}
