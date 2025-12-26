import type {TrackDetailsResource, TrackListItemResource} from "./schema.ts";

const API_KEY = 'a1b49d3b-662e-4426-a2ef-af15ed40e036';
const BASE_URL = 'https://musicfun.it-incubator.app/api/1.0';

const baseFetch = async <T>(url?: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      headers: {
        'api-key': API_KEY
      }
    });

    if (!response.ok) {
      console.error(response);
      throw new Error(`HTTP Error, status ${response.status} ${response.statusText}`);
    }

    const parsedResponse = await response.json();

    return {
      isError: false,
      message: '',
      data: parsedResponse.data as T,
    }
  } catch (err: any) {
    return {
      isError: true,
      message: err.message,
      data: null,
    }
  }
};

export const api = {
  getAllTracks: () => baseFetch<TrackListItemResource[]>('playlists/tracks'),
  getTrackInfo: (trackId: string) => baseFetch<TrackDetailsResource>(`playlists/tracks/${trackId}`),
};
