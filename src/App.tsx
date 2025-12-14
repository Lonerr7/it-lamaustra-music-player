import {useEffect, useState} from "react";
import './App.css';
import {api} from "./api/api.ts";

// https://musicfun.it-incubator.app/api
// https://youtu.be/fdltuW8PDfg?si=_2aiFrMGMbB10_zv&t=1775
// TODO: Задание: отобразить прелодер когда нажали на трек (когда грузим информацию трека)

function App() {
  const [tracks, setTracks] = useState<any[] | null | false>(null);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [isTrackFetching, setIsTrackFetching] = useState(false);
  const [trackId, setTrackId] = useState(null);

  console.log(selectedTrack);

  const fetchTrackInfo = async (trackId: string) => {
    setIsTrackFetching(true);
    const response = await api.getTrackInfo(trackId);
    if (response.isError) {
      return;
    }

    setSelectedTrack(response.data);
    setIsTrackFetching(false);
  }

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

  return (
    <div>
      <h1>Musicfun</h1>
      <div>
        <button onClick={() => setSelectedTrack(null)}>Reset selection</button>
      </div>
      <div className="box">
        <ul>
          {tracks ? tracks.map((track: any) => (
            <li
              key={track.id}
              style={{
                border: (!trackId || trackId !== track.id) ? 'none' : '1px solid orange'
              }}>
              <div onClick={() => {
                setTrackId(track.id);
                fetchTrackInfo(track.id);
              }}>
                {track.attributes.title}
              </div>
              <audio src={track.attributes.attachments[0].url} controls></audio>
            </li>
          )) : (
            <div>Загрузка</div>
          )}
        </ul>
        <div style={{ width: '300px' }}>
          <h2>Track details:</h2>
          {isTrackFetching ? (
            <div>Загрузка трека...</div>
          ) : selectedTrack ? (
            <div>
              <h3>{selectedTrack.attributes.title}</h3>
              <div>
                <h4>Lyrics:</h4>
                <p>{selectedTrack.attributes.lyrics}</p>
              </div>
            </div>
          ) : (
            <div>Track is not selected</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
