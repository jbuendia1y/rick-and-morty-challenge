import Image from "next/image";
import useRandomCharacter from "../../hooks/useRandomCharacter";
import TypedMachine from "../TypedMachine";

const getStatusClass = (status: "Alive" | "Dead" | "unknown") => {
  const dictionary = {
    Alive: "green",
    Dead: "red",
    unknown: "gray",
  };
  return dictionary[status];
};

export default function RandomCharacter() {
  const { character } = useRandomCharacter();

  return (
    <div className="character">
      <div className="character__image">
        <Image
          src={character ? character.image : "/images/rick-down.png"}
          width={100}
          height={100}
          layout="responsive"
          alt={character ? character.name : "loading"}
        />
      </div>
      <h2 className="character__name">
        {character ? <TypedMachine>{character.name}</TypedMachine> : "..."}
      </h2>
      {character ? (
        <p className={"character__status " + getStatusClass(character.status)}>
          <TypedMachine>{`Status: ${character.status}`}</TypedMachine>
        </p>
      ) : (
        <p> ... </p>
      )}
      <style jsx>{`
        .character {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .character__image {
          display: inline-block;
          border: 5px solid var(--bg-secondary);
          border-radius: 50%;
          overflow: hidden;

          width: 180px;
          height: 180px;
        }

        .character__name {
          font-size: 2rem;
          margin: 0;
        }

        .character__status {
          font-size: 1.25rem;
          margin: 0;
        }

        .green {
          color: green;
        }

        .red {
          color: red;
        }

        .gray {
          color: gray;
        }
      `}</style>
    </div>
  );
}
