import Youtube from "react-youtube";

const YoutubePlayer = ({ videoId }: { videoId: string }) => {
  const validVideoId =
    videoId && videoId.length === 11 ? videoId : "4TWR90KJl84";
  return (
    <div className="w-full">
      <Youtube videoId={validVideoId} />
    </div>
  );
};
export default YoutubePlayer;
