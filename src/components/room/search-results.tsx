import { YouTubeSearchResult } from "@/services/youtube-search.service";
import Image from "next/image";

interface SearchResultsProps {
  results: YouTubeSearchResult[];
  onSelectVideo: (videoId: string) => void;
}

const SearchResults = ({ results, onSelectVideo }: SearchResultsProps) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {results.map((item) => (
        <div
          key={item.id.videoId}
          className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          onClick={() => onSelectVideo(item.id.videoId)}
        >
          <Image
            src={item.snippet.thumbnails.default.url}
            alt={item.snippet.title}
            width={64}
            height={48} 
            className="object-cover rounded flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{item.snippet.title}</p>
            <p className="text-xs text-gray-500 truncate">
              {item.snippet.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
