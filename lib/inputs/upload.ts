import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function handleUpload(file: File, fileLocation: string) {
  if (!file) {
    return;
  }
  const storageRef = ref(storage, fileLocation);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    return null
  }
}
