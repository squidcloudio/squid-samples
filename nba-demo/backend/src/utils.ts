export function getRandomScheduleGame(response) {
  const games = response.data.gscd.g;
  const gameIds = games.filter((g) => g.st !== "1").map((g) => g.gid);
  const randomIndex = Math.floor(Math.random() * gameIds.length);
  return gameIds[randomIndex];
}

export function parseBoxScoreResponse(response) {
  const game = response.data.g;
  const { gid, gdtutc, utctm, ac, as, vls, hls } = game;

  return {
    gid,
    date: new Date(`${gdtutc}T${utctm}:00Z`),
    home: {
      tid: hls.tid,
      score: Number(hls.s),
      name: `${hls.tc} ${hls.tn}`,
      playerStats: (hls.pstsg || []).filter((p) => p.isStarter),
    },
    away: {
      tid: vls.tid,
      score: Number(vls.s),
      name: `${vls.tc} ${vls.tn}`,
      playerStats: (vls.pstsg || []).filter((p) => p.isStarter),
    },
    city: ac,
    state: as,
  };
}
