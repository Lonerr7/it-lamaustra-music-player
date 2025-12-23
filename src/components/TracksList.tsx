import {type FC, useEffect, useState} from "react";
import {api} from "../api/api.ts";
import {TrackItem} from "./TrackItem.tsx";
import {type TrackListItemResource} from './TrackItem.tsx';

interface TracksListProps {
  selectedTrackId: string | null;
  onTrackSelect: (newTrackId: string | null) => void;
}

export const TracksList: FC<TracksListProps> = ({selectedTrackId, onTrackSelect}) => {
  const [tracks, setTracks] = useState<TrackListItemResource[] | null | false>(null);

  useEffect(() => {
    (async () => {
      const response = await api.getAllTracks();

      if (response.isError) {
        setTracks(false);
        return;
      }

      setTracks(response.data);
    })()
  }, []);

  if (tracks === false) {
    return <div>
      Ошибка запроса на сервер
    </div>
  }

  const handleTrackClick = (trackId: string) => {
    onTrackSelect(trackId);
  }

  const handleResetSelection = () => {
    onTrackSelect(null);
  }

  return (
    <div>
      <button onClick={handleResetSelection}>Reset</button>
      <hr/>
      <ul>
        {tracks ? tracks.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            isSelected={track.id === selectedTrackId}
            onTrackClick={handleTrackClick}
          />
        )) : (
          <div>Загрузка</div>
        )}
      </ul>
    </div>
  );
};

