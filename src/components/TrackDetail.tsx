import {type FC, useEffect, useState} from "react";
import {api} from "../api/api.ts";

interface TrackDetailAttributes {
  title: string;
  lyrics: string | null;
}

interface TrackDetailsResource {
  id: string;
  type: string;
  attributes: TrackDetailAttributes;
}

interface TrackDetailProps {
  trackId: string | null;
}

export const TrackDetail:FC<TrackDetailProps> = ({trackId}) => {
  const [track, setTrack] = useState<TrackDetailsResource | null>(null);
  const [isTrackFetching, setIsTrackFetching] = useState(false);

  const fetchTrackInfo = async (trackId: string) => {
    setIsTrackFetching(true);
    const response = await api.getTrackInfo(trackId);
    if (response.isError) {
      return;
    }

    setTrack(response.data);
    setIsTrackFetching(false);
  };

  useEffect(() => {
    if (!trackId) {
      setTrack(null);
      return;
    }

    fetchTrackInfo(trackId);
  }, [trackId]);

  return (
    <div style={{width: '300px'}}>
      <h2>Track details:</h2>
      {isTrackFetching ? (
        <div>Загрузка трека...</div>
      ) : track ? (
        <div>
          <h3>{track.attributes.title}</h3>
          <div>
            <h4>Lyrics:</h4>
            {track.attributes.lyrics ? <p>{track.attributes.lyrics}</p> : null}
          </div>
        </div>
      ) : (
        <div>Track is not selected</div>
      )}
    </div>
  );
};