import { TrackListResponse } from "../models/track-list-response.interface";
import { Track } from "../../models/track.interface";

export const transformTrackList = (
  trackList: TrackListResponse | null,
): Track[] => {
  return (
    trackList?.references.edges.map((edge) => {
      return {
        gid: edge.node.id,
        position: Number(edge.node.position.value),
        title: edge.node.title.value,
        previewUrl: edge.node.previewUrl?.value,
      };
    }) ?? []
  );
};
