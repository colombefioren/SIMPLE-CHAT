import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CreateRoomModal from "./create-room-modal";
import YoutubePlayer from "./youtube-player";

const YoutubeWindow = () => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex">
        <Input placeholder="Place the youtube link here" type="text" />
        <Button>Load</Button>
      </div>
      <CreateRoomModal/>
    </div>
  );
};
export default YoutubeWindow;
