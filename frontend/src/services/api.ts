import axiosInstance from "./axios_instance";

interface IAnalyzeTrack {
  bpm: number;
  key: string;
  duration: number;
}

export const analyze_track = async (formData: FormData) => {
  const response = await axiosInstance.post<IAnalyzeTrack>(
    "/analyze",
    formData,
  );

  return response.data;
};

export const waves_frame = async (formData: FormData) => {
  const response = await axiosInstance.post("/waveplot", formData, {
    responseType: "blob",
  });

  return URL.createObjectURL(response.data);
};
