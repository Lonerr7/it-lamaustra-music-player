const API_KEY = 'a1b49d3b-662e-4426-a2ef-af15ed40e036';
const BASE_URL = 'https://musicfun.it-incubator.app/api/1.0';

const baseFetch = async (url?: string) => {
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
    const data = parsedResponse.data;

    return {
      isError: false,
      message: '',
      data
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
  getAllTracks: () => baseFetch('playlists/tracks'),
  getTrackInfo: async (trackId: string) => await baseFetch(`playlists/tracks/${trackId}`),
};
