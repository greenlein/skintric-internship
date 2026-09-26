"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDemographic, type DemographicData } from "@/app/redux/demographics";
import type { AppDispatch } from "@/app/redux/store";

export const useImageUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (image: File | string) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      const imageFile = typeof image === "string" ? await fetch(image).then((response) => response.blob()) : image;
      formData.append("image", imageFile, image instanceof File ? image.name : "camera-capture");

      const response = await axios.post<DemographicData>("/api/phase-two", formData);
      window.localStorage.removeItem("skinstric-selected-demographics");
      dispatch(setDemographic(response.data));
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/select");
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
    }
  };

  return { isUploading, uploadImage };
};
