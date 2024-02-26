import dayjs from "dayjs";
import { useCollection, useDoc } from "@squidcloud/react";

const GameCard = () => {
  const collection = useCollection("randomGame");
  const { data, loading, error } = useDoc(collection.doc("randomGame"));

  if (error) return <span>{error.message}</span>;
  if (loading) return null;

  return (
    <div className="bg-slate-200 rounded-2xl w-[700px] h-[600px] p-5 flex flex-col justify-center">
      <span className={"text-lg"}>
        {dayjs(data.date).format("ddd - MMMM DD YYYY")}
      </span>
      <span className={"text-lg mb-5"}>
        {data.city} {data.state}
      </span>
      <div className="flex flex-row justify-between">
        <Team {...data.home} />
        <Team {...data.away} />
      </div>
    </div>
  );
};

const Team = ({ tid, name, score, playerStats }) => {
  return (
    <div className="flex flex-col basis-1/2">
      <div className="flex flex-col items-center">
        <img
          src={`https://cdn.nba.com/logos/nba/${tid}/primary/logo.svg`}
          height={96}
          width={96}
        />
        <span className={"text-xl"}>{name}</span>
        <p className={"text-3xl"}>{score || "-"}</p>
      </div>

      <div className="p-4 m-2 mt-5 bg-slate-300 rounded-xl">
        <table className="h-[200px] align-top w-full">
          <thead className="w-full">
            <tr align="left">
              <th width="70%">Name</th>
              <th width="15%">Min</th>
              <th width="15%">Pts</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {playerStats.map((p) => (
              <tr align="left" key={p.pid}>
                <td width="70%" className={"whitespace-nowrap pr-2 truncate"}>
                  <img
                    className="inline mr-1"
                    src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${p.pid}.png`}
                    width={32}
                  />
                  <span className="inline whitespace-nowrap truncate">
                    {p.fn} {p.ln}
                  </span>
                </td>
                <td width="15%">{p.min}</td>
                <td width="15%">{p.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameCard;
