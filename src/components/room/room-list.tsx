import { Room } from "@/types/room";

const RoomList = ({ roomList }: { roomList: Room[] }) => {
  return (
    <>
      {roomList.map((room) => (
        <div className="h-12 cursor-pointer bg-slate-200" key={room.id}>
          {room.name}
        </div>
      ))}
    </>
  );
};
export default RoomList;
