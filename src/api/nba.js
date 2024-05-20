export const fetchTeams = async () => {
  try {
    const response = await fetch("https://api.balldontlie.io/v1/teams", {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_NBA_API_KEY,
      },
    });
    const data = await response.json();
    return [undefined, data.data];
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [error, undefined];
  }
};

export const getTeam = async (id) => {
  try {
    const response = await fetch(`https://api.balldontlie.io/v1/teams/${id}`, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_NBA_API_KEY,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching team:", error);
    return error;
  }
};

export const fetchPlayers = async (teamId) => {
  try {
    const response = await fetch(
      `https://api.balldontlie.io/v1/players?team_ids[]=${teamId}&per_page=100`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_NBA_API_KEY,
        },
      }
    );
    const data = await response.json();
    return [
      undefined,
      data.data.sort((a, b) => a.last_name.localeCompare(b.last_name)),
    ];
  } catch (error) {
    console.error("Error fetching players:", error);
    return [error, undefined];
  }
};
