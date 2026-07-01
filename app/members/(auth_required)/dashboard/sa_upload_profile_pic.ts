"use server";

import {
  UpdateUserProfilePictureData,
  UpdateUserProfilePictureVariables,
} from "@/dataconnect/connector/generated";
import { adminAuth, dataConnect } from "@/lib/firebase-admin";
import { uploadImage } from "@ybot1122/toby-ui/Sdk/Cloudinary/uploadImage";

const CLOUDINARY_CREDENTIALS = process.env.CLOUDINARY_CREDENTIALS!;

const { apiKey, apiSecret, cloudName, uploadPreset } = JSON.parse(
  CLOUDINARY_CREDENTIALS
);

if (!apiKey || !apiSecret || !cloudName || !uploadPreset) {
  throw new Error("configuration failed");
}

export default async function ({
  firebaseToken,
  imageFile,
}: {
  firebaseToken: string;
  imageFile: File;
}): Promise<{
  status: "fail" | "success";
  url?: string;
}> {
  const user = await adminAuth.verifyIdToken(firebaseToken);

  const public_id = user.uid;

  let result;
  try {
    result = await uploadImage({
      cloudinary_key: apiKey,
      cloudinary_secret: apiSecret,
      cloudinary_cloud_name: cloudName,
      imageFile,
      public_id,
      folder: "members",
      upload_preset: uploadPreset,
    });
  } catch (err: any) {
    return { status: "fail" };
  }

  // TODO update photoUrl in database

  if (!result) {
    return { status: "fail" };
  }

  await dataConnect.executeGraphql<
    UpdateUserProfilePictureData,
    UpdateUserProfilePictureVariables
  >(
    `
mutation UpdateUserProfilePicture($photoUrl: String!, $id: String!)
@auth(level: NO_ACCESS) {
  user_update(id: $id, data: { photoUrl: $photoUrl })
}
  `,
    {
      variables: {
        photoUrl: result.secure_url,
        id: user.uid,
      },
    }
  );

  return { status: "success", url: result.secure_url };
}
