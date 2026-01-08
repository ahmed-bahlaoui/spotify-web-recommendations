import { useMutation } from "@tanstack/react-query";
import { analyze_track, waves_frame } from "./api";

export const useAnalyzeTrack = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => await analyze_track(formData),
  });
};

export const useWavesFrame = () => {
  return useMutation({
    mutationFn: async (fromData: FormData) => await waves_frame(fromData),
  });
};
