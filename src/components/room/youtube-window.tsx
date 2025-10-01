"use client";
import { useSocketStore } from "@/store/useSocketStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import { Room } from "@/types/room";
import { useUserStore } from "@/store/useUserStore";
import YoutubePlayer from "./youtube-player";
import {
  searchYouTubeVideos,
  YouTubeSearchResult,
} from "@/services/youtube-search.service";
import SearchResults from "./search-results";

const YoutubeWindow = ({ room }: { room: Room }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<YouTubeSearchResult[]>([]);
  const [videoId, setVideoId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const socket = useSocketStore((state) => state.socket);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    socket?.emit("join-room", room.id);
  }, [socket, room.id]);

  const isHost = room.createdBy === user?.id;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchYouTubeVideos(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectVideo = (selectedVideoId: string) => {
    setVideoId(selectedVideoId);
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col justify-between space-y-4">
      {isHost && (
        <>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a YouTube video..."
              type="text"
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>

          <SearchResults
            results={searchResults}
            onSelectVideo={handleSelectVideo}
          />
        </>
      )}
      <YoutubePlayer videoId={videoId} />
    </div>
  );
};

export default YoutubeWindow;
