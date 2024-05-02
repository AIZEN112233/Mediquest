import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [year, setYear] = useState(undefined);
  const [faq, setFaq] = useState(undefined);
  const [activeFilter, setActiveFilter] = useState("");

  const filterValues = {
    year: year || "all",
    faq: faq || "all",
  };
  useEffect(() => {
      setSearchParams(filterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, faq]);

  let years = ["all", 1, 2, 3, 4, 5, 6, 7];
  let faculties = [
    "all",
    "oran",
    "mostaganem",
    "alger",
    "blida",
    "siding bel abbes",
    "constantine",
    "tlemcen",
    "annaba",
    "batna",
    "Tizi ouzou",
  ];

  return (
    <div className='sticky top-0 w-[300px] bg-primary-green/5'>
      <div className='mx-auto w-[200px] items-center'>
        <h1 className='m-3 p-4 text-4xl font-bold'>Filter</h1>
        <div>
          <div>
            <div
              className='flex items-center text-2xl font-semibold'
              onClick={() =>
                setActiveFilter((prev) => (prev === "year" ? "" : "year"))
              }
            >
              <span>
                <FaAngleLeft
                  size={17}
                  className={`${activeFilter === "year" && "-rotate-90"}`}
                />
              </span>
              Year
            </div>
            <ul className='ml-6'>
              {activeFilter === "year" &&
                years.map((year) => (
                  <li key={year} className='flex items-center gap-2'>
                    <span className='flex-grow'>{year}</span>
                    <input
                      type='radio'
                      name='year'
                      value={year}
                      checked={year == searchParams.get("year")}
                      onChange={(e) => setYear(e.target.value)}
                      className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <div
              className='flex items-center text-2xl font-semibold'
              onClick={() =>
                setActiveFilter((prev) => (prev === "faq" ? "" : "faq"))
              }
            >
              <span>
                <FaAngleLeft
                  size={17}
                  className={`${activeFilter === "faq" && "-rotate-90"}`}
                />
              </span>
              Faq
            </div>
            <ul className='ml-12'>
              {activeFilter === "faq" &&
                faculties.map((fac) => (
                  <li key={fac} className='flex items-center gap-2'>
                    <span className='line-clamp-1 flex-grow'>{fac}</span>
                    <input
                      type='radio'
                      name='fac'
                      value={fac}
                      checked={fac == searchParams.get('faq')}
                      onChange={(e) => setFaq(e.target.value)}
                      className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;

//todo: make it responsive
