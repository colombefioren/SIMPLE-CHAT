import { useRef, useState } from "react";
import Youtube, { YouTubeEvent } from "react-youtube";
import { VideoState } from "@/types/youtube";

const YoutubePlayer = ({ videoId }: { videoId: string }) => {
  const [videoState, setVideoState] = useState<VideoState | null>(null);

  const validVideoId =
    videoId && videoId.length === 11 ? videoId : "4TWR90KJl84";
  const playerRef = useRef<YT.Player | null>(null);

  console.log(videoState);

  const handlePlayerReady = (e: YouTubeEvent<YT.Player>) => {
    playerRef.current = e.target;

    setVideoState({
      videoId,
      paused: true,
      currentTime: playerRef.current?.getCurrentTime(),
      volume: playerRef.current?.getVolume(),
      playbackRate: playerRef.current?.getPlaybackRate(),
    });
  };

  const handleStateChange = () => {
    if (!playerRef.current) return;

    const player = playerRef.current;
    const state = player.getPlayerState();

    const isPause =
      state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED;

    setVideoState((prev) => ({
      ...prev,
      videoId: validVideoId,
      paused: isPause,
      currentTime: player.getCurrentTime(),
      volume: player.getVolume(),
      playbackRate: player.getPlaybackRate(),
    }));
  };

  const handlePlaybackRateChange = () => {
    if (!playerRef.current) return;

    const player = playerRef.current;
    const playbackRate = player.getPlaybackRate();

    setVideoState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        playbackRate,
      };
    });
  };

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
