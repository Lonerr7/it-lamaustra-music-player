import type {FC} from "react";
import type {TrackListItemResource} from "../dal/schema";

interface TrackItemProps {
  track: TrackListItemResource;
  isSelected: boolean;
  onTrackClick: (trackId: string) => void;
}

export const TrackItem: FC<TrackItemProps> = ({track, isSelected, onTrackClick}) => {
  return (
    <li
      key={track.id}
      style={{
        border: isSelected ? '1px solid orange' : 'none'
      }}>
      <div onClick={() => {
        onTrackClick(track.id);
      }}>
        {track.attributes.title}
      </div>
      <audio src={track.attributes.attachments[0].url} controls></audio>
    </li>
  );
};