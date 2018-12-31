import Axios from 'axios';

export function loadSchedule(day) {
    return Axios.get('https://api.jikan.moe/v3/schedule/' + day);
}

export function loadCharacters(id) {
    return Axios.get('https://api.jikan.moe/v3/anime/' + id + '/characters_staff');
}

export function loadEpisodes(id) {
    return Axios.get('https://api.jikan.moe/v3/anime/' + id + '/episodes');
}