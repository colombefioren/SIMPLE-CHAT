import { Room } from "@/types/room";

const RoomList = ({
  roomList,
  selectRoom,
}: {
  roomList: Room[];
  selectRoom: (room: Room) => void;
}) => {
  return (
    <>
      {roomList.map((room) => (
        <div
          onClick={() => selectRoom(room)}
          className="h-12 cursor-pointer bg-slate-200"
          key={room.id}
        >
          {room.name}
        </div>
      ))}
    </>
  );
};
export default RoomList;
