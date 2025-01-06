import { useEffect, useState } from "react";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

function Programs() {
  const [programsList, setProgramsList] = useState<Program[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`).then((response) =>
      response.json().then((dataFromApi) => setProgramsList(dataFromApi)),
    );
  }, []);
  return (
    <>
      <h1>Programs</h1>
      <div className="programs">
        {programsList.map((program) => (
          <>
            <h2 key={`${program.title}-title`}>{program.title}</h2>
            <p key={`${program.title}-synopsis`}> {program.synopsis} </p>
            <img
              key={`${program.title}-poster`}
              src={program.poster}
              alt={program.title}
            />
            <p key={`${program.title}-country`}>{program.country} </p>
            <p key={`${program.title}-year`}>{program.year} </p>
          </>
        ))}
      </div>
    </>
  );
}

export default Programs;
