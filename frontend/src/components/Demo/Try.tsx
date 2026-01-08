import { Link } from "@tanstack/react-router";
import Wavel from "../../logo.svg";
import { ArrowDown, Trash } from "lucide-react";
import FileDropzone from "./DropZone";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { useAnalyzeTrack, useWavesFrame } from "../../services/mutations";
import { Spinner } from "../ui/Spinner";
import { toast } from "sonner";
import { Skeleton } from "../ui/Skeleton";

export default function Try() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [currentTab, setCurrentTab] = useState(0);
  const checkBoxRef = useRef<HTMLButtonElement>(null);
  const [waveImage, setWaveImage] = useState<string | null>(null);

  // handle of drop zone.

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setUploadedFile(newFiles[0]);
  };
  const handelBoxClick = () => {
    fileInputRef.current?.click();
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  // fetching

  const {
    mutate: analyzeMutate,
    data: analyzeData,
    isPending: analyzePending,
    isError: analyzeError,
    isSuccess: analyzsSuccess,
  } = useAnalyzeTrack();

  const {
    mutate: wavesMutate,
    data: wavesData,
    isPending: wavesPending,
    isError: wavesErrors,
  } = useWavesFrame();

  const handleSubmit = async () => {
    if (!uploadedFile) return;
    if (currentTab !== 1) return;

    setWaveImage("");
    const formData = new FormData();
    formData.append("file", uploadedFile);

    analyzeMutate(formData, {
      onSuccess: () => {
        setCurrentTab(2);
      },
    });

    if (checkBoxRef.current?.ariaChecked === "true") {
      wavesMutate(formData, {
        onSuccess: (data) => {
          setWaveImage(data);
        },
      });
    }
  };

  const nextFun = () => {
    setCurrentTab((prev) => prev + 1);
  };
  const backFun = () => {
    if (analyzePending || wavesPending) return;
    setCurrentTab((prev) => prev - 1);
  };

  useEffect(() => {
    if (analyzeError) {
      toast("Something worgn when analyze track try again !");
    }

    if (wavesErrors) {
      toast("Something worng when genrate wave polet try again ! ");
    }
  }, [analyzeError, wavesErrors]);

  return (
    <div className="flex flex-col w-full gap-20 justify-center items-center my-8">
      <div className="flex flex-col gap-2 items-center">
        <Link to="/">
          <img src={Wavel} width={50} draggable="false" />
        </Link>
      </div>

      <div className="gap-15 w-full flex-col flex ">
        <div className="flex items-center  gap-1 flex-col">
          <h1 className="text-4xl font-bold">Try now !</h1>
          <p className="text-white/50   text-base flex  gap-2 items-center">
            <span>Upload the audio file below</span> <ArrowDown width={20} />
          </p>
        </div>
        <div className="relative w-full group flex flex-col justify-between  border border-white/6 px-5 md:px-14 gap-5 xl:gap-20   rounded-4xl overflow-hidden bg-black py-10  md:py-10   ">
          <div className=" w-full items-center   min-h-[416] h-full justify-between row-end-2 flex flex-col gap-6">
            {currentTab === 0 && (
              <>
                <div className="text-center">
                  <h1 className="text-3xl font-bold">Step 1 :</h1>
                  <p className="text-white/50   text-sm flex  gap-2 items-center">
                    <span>Upload the audio file below</span>{" "}
                    <ArrowDown width={20} />
                  </p>
                </div>
                <FileDropzone
                  fileInputRef={fileInputRef}
                  handleDrageOver={handleDragOver}
                  handleBoxClick={handelBoxClick}
                  handleDrop={handleDrop}
                  handleFileSelect={handleFileSelect}
                />
                {uploadedFile && (
                  <div className="flex max-w-[600] justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="default"
                        className="bg-black border text-white/80  border-white/6"
                      >
                        {uploadedFile.name[0]}
                      </Button>
                      <p className="text-md text-white">{uploadedFile.name}</p>
                    </div>
                    <Trash
                      width={24}
                      className="cursor-pointer text-white/60 hover:text-red-600 duration-300 transition-all"
                      onClick={() => setUploadedFile(undefined)}
                    />
                  </div>
                )}
              </>
            )}

            {currentTab === 1 && (
              <div className="flex flex-col justify-between gap-10  h-full">
                <div className="text-center">
                  <h1 className="text-3xl font-bold">Step 2 :</h1>
                  <p className="text-white/50   text-sm flex  gap-2 items-center">
                    <span>Chose the options you want</span>{" "}
                    <ArrowDown width={20} />
                  </p>
                </div>
                <div className="flex flex-col gap-3 ">
                  <div className="flex gap-2 items-center">
                    <Checkbox defaultChecked disabled />
                    <p className="text-md text-white/80">
                      Get bpm, key and duration.
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox ref={checkBoxRef} className="outline-0" />
                    <p className="text-md text-white/80">
                      Generate a waveplot.
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox disabled />
                    <p className="text-md text-white/80">
                      Track recommendation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentTab === 2 && (
              <div className="flex flex-col justify-between gap-10  h-full">
                <div className="text-center">
                  <h1 className="text-3xl font-bold">Results :</h1>
                  <p className="text-white/50   text-sm flex  gap-2 items-center">
                    <span>Your results below</span>
                  </p>
                </div>
                <div>
                  <p className="text-md text-white/80">
                    ✓ Bmp : {analyzeData?.bpm}
                  </p>
                  <p className="text-md text-white/80">
                    ✓ Key : {analyzeData?.key}
                  </p>
                  <p className="text-md text-white/80">
                    ✓ Duration : {analyzeData?.duration} s
                  </p>
                </div>
              </div>
            )}
            {currentTab === 2 ? (
              <>
                {!wavesPending ? (
                  <img
                    src={waveImage ? waveImage : ""}
                    className="w-full rounded-3xl max-w-[800]"
                  />
                ) : (
                  <Skeleton className="min-h-[300] min-w-[800] w-full h-full rounded-3xl"></Skeleton>
                )}
              </>
            ) : (
              ""
            )}

            <div className="flex gap-4">
              <Button
                variant="default"
                disabled={currentTab === 0 ? true : false}
                className=" text-white/80 "
                onClick={backFun}
              >
                Back{" "}
              </Button>
              {currentTab !== 2 && (
                <Button
                  variant="secondary"
                  className="cursor-pointer"
                  disabled={!uploadedFile || analyzePending}
                  onClick={() => {
                    if (currentTab !== 1) {
                      nextFun();
                    } else {
                      handleSubmit();
                    }
                  }}
                >
                  {analyzePending ? <Spinner /> : ""}
                  {currentTab !== 1 ? "Next" : "Send"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
