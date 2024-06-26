import { fetchWithAuthorization } from '../../../utils/fetchWithAuthorization';

const API_URL = `${process.env.API_URL}mode/`;

class ModeService {
  static async getModeById(modeId) {
    const response = await fetchWithAuthorization(`${API_URL}${modeId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Échec de la récupération du mode');
    }

    return await response.json();
  }

  static async updateMode(name, playlist_id) {
    const updateData = {
      name: name,
      playlist_id,
    };
    const response = await fetchWithAuthorization(`${API_URL}${1}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error('Échec de la mise à jour du mode');
    }

    return await response.json();
  }
}

export default ModeService;
