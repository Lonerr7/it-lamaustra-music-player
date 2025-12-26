// Track Detail
interface TrackDetailAttributes {
  title: string;
  lyrics: string | null;
}

export interface TrackDetailsResource {
  id: string;
  type: string;
  attributes: TrackDetailAttributes;
}

// Tracks
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