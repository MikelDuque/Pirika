import { ElementType } from "../enums";
import { Artist, BasicElement, Music} from "../types";

export const artistMapper = {
  toBasic(artist?: Artist): BasicElement | undefined {
    if (!artist) return undefined;

    return {
      id: artist.id,
      name: artist.name,
      image: artist.avatar,
      type: ElementType.Artist
    };
  }
};

export const musicMapper = {
  toBasic(music?: Music): BasicElement | undefined {
    if (!music) return undefined;

    return {
      id: music.id,
      name: music.title,
      image: music.cover,
      type: ElementType.Collection,
      subElements: getSubElementsArray(music)
    };
  }
};

function getSubElementsArray(music: Music) {
  return [
    ...(music.author ? [music.author] : []),
    ...(music.collaborators ?? [])
  ];
}