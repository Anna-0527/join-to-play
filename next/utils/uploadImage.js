// utils/uploadImage.js
import { API_SERVER } from "@/configs";

export const uploadImage = async (file, member) => {
  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("id", member.id);

  try {
    const response = await fetch(`${API_SERVER}/member/upload/avatar`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.imageUrl;
    } else {
      console.error("頭像上傳失敗");
      return null;
    }
  } catch (error) {
    console.error("頭像上傳時出錯:", error);
    return null;
  }
};
