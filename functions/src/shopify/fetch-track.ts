import { Track } from "../models/track.interface";
import { TrackResponse } from "../models/track-response.interface";
import { getShopifyClient } from "./get-shopify-client";
import { fetchTrackQuery } from "./queries/fetch-track.query";

export async function fetchTrack(gid: string): Promise<Track | null> {
  const client = getShopifyClient();
  const { data, errors } = await client.request<TrackResponse>(
    fetchTrackQuery,
    { variables: { gid } },
  );

  if (errors) {
    console.error(errors);
    throw new Error(errors.message);
  }

  const track = data?.metaobject;
  if (!track) {
    return null;
  }

  return {
    gid,
    position: Number(track.position.value),
    title: track.title.value,
    previewUrl: track.preview_url?.value,
  };
}
