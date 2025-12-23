import type {FC} from "react";

interface TrackAttachment {
  id: string;
  addedAt: string;
  updatedAt: string;
  version: number;
  url: string;
  contentType: string;
  originalName: string;
  fileSize: number;
}

interface TrackListItemAttributes {
  title: string;
  attachments: Array<TrackAttachment>
}

export interface TrackListItemResource {
  id: string;
  type: string;
  attributes: TrackListItemAttributes;
}


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