import { useEffect, useRef, useState } from "react";
import Youtube, { YouTubeEvent } from "react-youtube";
import { VideoState } from "@/types/youtube";
import { useSocketStore } from "@/store/useSocketStore";

const YoutubePlayer = ({
  videoId,
  roomId,
  userId,
}: {
  videoId: string;
  roomId: string;
  userId: string;
}) => {
  const [videoState, setVideoState] = useState<VideoState | null>(null);
  const socket = useSocketStore((state) => state.socket);

  const validVideoId =
    videoId && videoId.length === 11 ? videoId : "4TWR90KJl84";
  const playerRef = useRef<YT.Player | null>(null);

  const handlePlayerReady = (event: YouTubeEvent<"ready">) => {
    playerRef.current = event.target;
  };

  useEffect(() => {
    socket?.on("new-video-state", (state: VideoState) => {
      if (!playerRef.current) return;
      if (state.lastUpdatedAt < (videoState?.lastUpdatedAt ?? 0) && videoState)
        return;
      if (state.lastUpdatedBy === userId) return;

      setVideoState(state);

      const player = playerRef.current;

      const drift = Math.abs(
        player.getCurrentTime() - (state.currentTime || 0)
      );
      if (drift > 0.8) {
        player.seekTo(state.currentTime || 0, true);
      }
      if (state.paused) player.pauseVideo();
      else player.playVideo();

      if (state.volume !== undefined) player.setVolume(state.volume);
      if (state.playbackRate !== undefined)
        player.setPlaybackRate(state.playbackRate);
    });

    return () => {
      socket?.off("new-video-state");
    };
  }, [socket, userId, videoState]);

  const emitState = () => {
    if (!playerRef.current) return;
    const player = playerRef.current;

    const state: VideoState = {
      roomId,
      videoId: validVideoId,
      paused: player.getPlayerState() === YT.PlayerState.PAUSED,
      currentTime: player.getCurrentTime(),
      volume: player.getVolume(),
      playbackRate: player.getPlaybackRate(),
      lastUpdatedBy: userId,
      lastUpdatedAt: new Date(),
    };

    setVideoState(state);
    socket?.emit("update-video-state", state);
  };

  const handleStateChange = () => emitState();
  const handlePlaybackRateChange = () => emitState();

  return (
    <div className="w-full">
      <Youtube
        videoId={validVideoId}
        onReady={handlePlayerReady}
        onStateChange={handleStateChange}
        onPlaybackRateChange={handlePlaybackRateChange}
      />
    </div>
  );
};
export default YoutubePlayer;
