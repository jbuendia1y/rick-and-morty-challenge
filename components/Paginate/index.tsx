import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export interface PaginateProps {
  totalPages?: number | undefined;
  currentPage?: number;
  maxItems?: number;
  OnChange?: (currentPage: number) => void;
}

const createPageArray = (total?: number) =>
  Array(total)
    .fill(0)
    .map((v, i) => i + 1);

export default function Paginate(props: PaginateProps) {
  const { currentPage = 1, totalPages, OnChange, maxItems = 5 } = props;
  const [current, setCurrent] = useState(currentPage);
  const [pages, setPages] = useState(createPageArray(totalPages));

  useEffect(() => {
    setPages(createPageArray(totalPages));
  }, [totalPages]);

  const handleClick = (page: number) => () => {
    setCurrent(page);
    if (OnChange) OnChange(page);
  };

  return (
    <div className="paginate">
      <button
        className="paginate__buttons"
        onClick={current ? handleClick(current - 1) : () => {}}
      >
        <FontAwesomeIcon size="5x" icon={faArrowLeft} />
      </button>
      <ul>
        {pages
          .slice(
            currentPage - 1 > 0 ? currentPage - 1 : 0,
            currentPage + maxItems > pages.length - 1
              ? pages.length - 1
              : currentPage + maxItems
          )
          .map((v) => (
            <li key={"page-" + v}>
              <button onClick={handleClick(v)}>{v}</button>
            </li>
          ))}
        {currentPage === pages[pages.length - 1] ? "" : <li>...</li>}
        {pages.slice(-1, pages.length).map((v) => (
          <li key={"page-" + v}>
            <button onClick={handleClick(v)}>{v}</button>
          </li>
        ))}
      </ul>
      <div>
        <button
          className="paginate__buttons"
          onClick={current ? handleClick(current + 1) : () => {}}
        >
          <FontAwesomeIcon size="5x" icon={faArrowRight} />
        </button>
      </div>
      <style jsx>{`
        .paginate {
          margin: 0 auto;
          display: flex;
          max-width: 100%;
          width: 100%;
          justify-content: center;
        }

        .paginate__buttons {
          display: inline-flex;
          width: 30px;
          height: 30px;
          align-items: center;
        }

        .paginate button {
          border: none;
        }

        .paginate__buttons:first-child {
          margin-right: 1rem;
        }

        .paginate__buttons:nth-last-child(1) {
          margin-left: 1rem;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: inline-flex;
          width: 100%;
          justify-content: space-between;
        }

        ul li {
          height: 30px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
