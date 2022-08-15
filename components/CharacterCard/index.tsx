import { Character } from "rickmortyapi/dist/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMars,
  faVenus,
  faGenderless,
  faCircleQuestion,
  faHeartPulse,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";

export type GenderType = "Female" | "Male" | "Genderless" | "unknown";

export function GenderIcon(props: { gender: GenderType }) {
  const { gender } = props;
  let icon: IconProp = faCircleQuestion;

  if (gender === "Female") icon = faVenus;
  if (gender === "Male") icon = faMars;
  if (gender === "Genderless") icon = faGenderless;

  return <FontAwesomeIcon icon={icon} />;
}

export type StatusType = "Dead" | "Alive" | "unknown";

export function StatusIcon(props: { status: StatusType }) {
  const { status } = props;
  let icon: IconProp = faCircleQuestion;
  let color = "black";

  if (status === "Alive") {
    icon = faHeartPulse;
    color = "var(--bg-secondary)";
  }
  if (status === "Dead") {
    icon = faSkull;
    color = "var(--red)";
  }

  return <FontAwesomeIcon color={color} icon={icon} />;
}

export default function CharacterCard(props: { character: Character }) {
  const { character } = props;
  return (
    <article>
      <div className="character__image">
        <Image
          width={200}
          height={200}
          layout="responsive"
          src={character.image}
          alt={character.name}
        />
      </div>
      <div className="character__info">
        <h1 className="character__name">{character.name}</h1>
        <div>
          <p>{character.location.name}</p>
          <p>{character.origin.name}</p>
        </div>
        <div className="character__species">
          <p className="gender-icon">
            <GenderIcon gender={character.gender} />
          </p>
          <p>{character.species}</p>
        </div>
        <p className="status">
          <span className="status__icon">
            <StatusIcon status={character.status} />
          </span>{" "}
          {character.status}
        </p>
      </div>
      <style jsx>{`
        article {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: max-content 1fr;
          max-width: 300px;
          margin: 0 auto 1rem auto;

          border-radius: 10px;
          overflow: hidden;
          --shadow-color: #e7e7e7e7;
          box-shadow: 2.5px 2.5px 10px 0px var(--shadow-color);
        }

        .character__image {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .character__info > p {
          margin: 0;
        }

        .character__name {
          font-size: 2rem;
          margin: 0;
        }

        .character__species {
          display: flex;
          align-items: center;
        }

        .character__species > p {
          margin: 0;
        }

        .gender-icon {
          margin-right: 0.5rem;
          width: 20px;
          height: 20px;
        }

        .status {
          display: flex;
          align-items: center;
        }

        .status__icon {
          display: inline-block;
          width: 20px;
          height: 20px;
        }

        @media (min-width: 500px) {
          article {
            max-width: 400px;
            grid-template-columns: 1fr 1fr;
          }

          .character__image {
            width: 200px;
            height: 200px;
          }
          .character__info {
            margin-left: 1rem;
          }
        }
      `}</style>
    </article>
  );
}
