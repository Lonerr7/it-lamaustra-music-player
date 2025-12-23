import {TracksList} from "./TracksList.tsx";
import {TrackDetail} from "./TrackDetail.tsx";
import {useState} from "react";

export const MainPage = () => {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const handleTrackSelect = (trackId: string | null) => {
    setSelectedTrackId(trackId);
  }

  return (
    <div>
      <h1>Musicfun</h1>
      <div className="box">
        <TracksList
          selectedTrackId={selectedTrackId}
          onTrackSelect={handleTrackSelect}
        />
        <TrackDetail trackId={selectedTrackId}/>
      </div>
    </div>
  )
};