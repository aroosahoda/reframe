"use client";

import { useState } from "react";
import { useVideoEditor } from "@/hooks/useVideoEditor";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import FileUpload from "./FileUpload";
import VideoPreview from "./VideoPreview";
import PresetSelector from "./PresetSelector";
import FramingControl from "./FramingControl";
import TrimControl from "./TrimControl";
import RotateControl from "./RotateControl";
import TextControls from "./TextControls";
import AudioSpeedControl from "./AudioSpeedControl";
import FormatSelector from "./FormatSelector";
import ExportSettings from "./ExportSettings";
import ExportOverlay from "./ExportOverlay";
import DownloadResult from "./DownloadResult";
import OnboardingTour from "./OnboardingTour";

export default function VideoEditor() {
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);

  const {
    file,
    duration,
    recipe,
    updateRecipe,
    handleFileSelect,
    fileError,
    status,
    progress,
    exportStartedAt,
    handleExport,
    cancelExport,
    result,
    reset,
    resetSettings,
    toggleSound,
    videoRef,
  } = useVideoEditor();

  useKeyboardShortcuts({
    file,
    recipe,
    resetSettings,
    updateRecipe,
    handleExport,
    status,
    cancelExport,
    onToggleShortcutsModal: () => undefined,
  });

  const handleTextUpdate = (id: string, updates: Partial<NonNullable<typeof recipe.textOverlays>[number]>) => {
    updateRecipe({
      textOverlays: (recipe.textOverlays ?? []).map((overlay) =>
        overlay.id === id ? { ...overlay, ...updates } : overlay
      ),
    });
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-4 md:px-6 lg:px-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <div className="flex min-w-0 flex-col gap-4">
            <FileUpload
              onFileSelect={handleFileSelect}
              currentFile={file}
              fileError={fileError}
              duration={duration}
            />

            <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
              <VideoPreview
                file={file}
                duration={duration}
                recipe={recipe}
                videoRef={videoRef}
                selectedTextId={selectedTextId}
                onSelectText={setSelectedTextId}
                onUpdateText={handleTextUpdate}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 sm:sticky sm:top-4 sm:self-start sm:max-h-[calc(100vh-2rem)] sm:overflow-y-auto">
            <PresetSelector recipe={recipe} onChange={updateRecipe} />
            <FramingControl recipe={recipe} onChange={updateRecipe} />
            <TrimControl recipe={recipe} onChange={updateRecipe} duration={duration} file={file} />
            <RotateControl recipe={recipe} onChange={updateRecipe} />
            <TextControls
              recipe={recipe}
              onChange={updateRecipe}
              selectedTextId={selectedTextId}
              onSelectText={setSelectedTextId}
            />
            <AudioSpeedControl recipe={recipe} onChange={updateRecipe} />
            <FormatSelector recipe={recipe} onChange={updateRecipe} />
            <ExportSettings recipe={recipe} duration={duration} onChange={updateRecipe} />

            {result && (
              <DownloadResult
                result={result}
                onReset={reset}
                soundOnCompletion={recipe.soundOnCompletion}
                onToggleSound={toggleSound}
              />
            )}
          </div>
        </div>
      </div>

      <ExportOverlay
        status={status}
        progress={progress}
        exportStartedAt={exportStartedAt}
        onCancel={cancelExport}
      />

      <OnboardingTour />
    </>
  );
}
