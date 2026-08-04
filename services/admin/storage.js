import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";
import { supabase } from "../../lib/supabase";

// this function are used to get iamge form galley and uplaod this to supabse 
export const uploadPizzaImage = async (imageUri) => {
    console.log("IMAGE URI:", imageUri);

    const fileName = `pizza-${Date.now()}.jpg`;

    console.log("START READING IMAGE");

    const base64 = await FileSystem.readAsStringAsync(
        imageUri,
        {
            encoding: FileSystem.EncodingType.Base64,
        }
    );

    console.log("BASE64 LENGTH:", base64.length);

    console.log("BASE64 LENGTH:", base64.length);
    console.log("START UPLOAD");
    const { data, error } = await supabase.storage
        .from("pizza-images")
        .upload(
            fileName,
            decode(base64),
            {
                contentType: "image/jpeg",
                upsert: false,
            }
        );

    console.log("UPLOAD DATA:", data);
    console.log("UPLOAD ERROR:", error);

    if (error) throw error;

    const { data: publicData } = supabase.storage
        .from("pizza-images")
        .getPublicUrl(fileName);

    console.log("IMAGE URL:", publicData.publicUrl);

    return publicData.publicUrl;
};