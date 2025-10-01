export type VideoState = {
  videoId: string;
  paused: boolean;
  currentTime?: number;
  volume?: number;
  playbackRate?: number;
  roomId: string;
  lastUpdatedBy: string;
};
