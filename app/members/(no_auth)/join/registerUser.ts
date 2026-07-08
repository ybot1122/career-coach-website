import { DataConnectClientType } from "@/context/FirebaseApp";
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";

export async function registerUser(
  formData: FormData,
  auth: Auth,
  dataConnect: DataConnectClientType
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const terms = formData.get("terms") === "on";

  // Validation
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 8 characters long" };
  }
  if (!terms) {
    return {
      error: "You must agree to the Terms of Service and Privacy Policy",
    };
  }

  try {
    const userRecord = await createUserWithEmailAndPassword(
      auth!,
      email,
      password
    );

    const result = await dataConnect.insertUser({
      displayName: name,
      email,
    });

    console.log("User created:", result);

    return { success: true, email, password };
  } catch (error: any) {
    console.log(error);
    switch (error.code) {
      case "auth/email-already-exists":
        return { error: "An account with this email already exists" };
      case "auth/invalid-email":
        return { error: "Please enter a valid email address" };
      case "auth/weak-password":
        return {
          error: "Password is too weak. Please choose a stronger password",
        };
      default:
        return {
          error:
            error.message ||
            "Failed to create account. Please try again or contact us.",
        };
    }
  }
}
