import api from "./api";

export interface EpisodeDto {
  id: number;
  title: string;
  description: string;
  seasonNumber: number;
  episodeNumber: number;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
}

export interface EpisodesWrapperDto {
  episodes: EpisodeDto[];
  contentId: number;
  totalSeasons: number;
}

export async function getEpisodes(contentId: number): Promise<EpisodeDto[]> {
  const { data } = await api.get<EpisodesWrapperDto>(`/episodes/${contentId}`);
  return data.episodes;
}