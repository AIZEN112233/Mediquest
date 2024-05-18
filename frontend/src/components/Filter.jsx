import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import {
  faculties,
  firstYearFirstHalfModules,
  firstYearSecondHalfModules,
  years,
} from "../constants";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [year, setYear] = useState(undefined);
  const [faq, setFaq] = useState(undefined);
  const [module, setModule] = useState(undefined);
  const [semester, setSemester] = useState(undefined);
  const [activeFilter, setActiveFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filterValues = {
    year: year || "all",
    faq: faq || "all",
  };
  if (searchParams.get("year") == "1") {
    filterValues.module = module || "all";
    filterValues.semester = semester || "semester";
  }
  // todo wrap it in useMemo
  useEffect(() => {
    setSearchParams(filterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, faq, module, semester]);

  const handleFirstYear = (e) => {
    setModule(e.target.value);
    setSemester(activeFilter);
    console.log(activeFilter);
  };

  return (
    <>
      <div
        className={`sticky top-0 z-[1000] h-full w-[300px] bg-primary-green/5 max-md:absolute max-md:bg-[#161616]/95 ${isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}
      >
        <div className='mx-auto w-[200px] items-center'>
          <h1 className='m-3 p-4 text-4xl font-bold'>Filter</h1>
          <div>
            <div
              className='flex items-center gap-2 text-2xl font-semibold'
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
              className='flex items-center gap-2 text-2xl font-semibold'
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
                      checked={fac == searchParams.get("faq")}
                      onChange={(e) => setFaq(e.target.value)}
                      className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
                    />
                  </li>
                ))}
            </ul>
          </div>
          {/* the first year filter */}
          {searchParams.get("year") == 1 ? (
            <>
              <div>
                <div
                  className='flex items-center gap-2 text-2xl font-semibold'
                  onClick={() =>
                    setActiveFilter((prev) =>
                      prev === "semester 1" ? "" : "semester 1",
                    )
                  }
                >
                  <span>
                    <FaAngleLeft
                      size={17}
                      className={`${activeFilter === "semester 1" && "-rotate-90"}`}
                    />
                  </span>
                  Semester 1
                </div>
                <ul className='ml-12'>
                  {activeFilter === "semester 1" &&
                    firstYearFirstHalfModules.map((module) => (
                      <li key={module} className='flex items-center gap-2'>
                        <span className='line-clamp-1 flex-grow'>{module}</span>
                        <input
                          type='radio'
                          name='module'
                          value={module}
                          checked={module == searchParams.get("module")}
                          onChange={handleFirstYear}
                          className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
                        />
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <div
                  className='flex items-center gap-2 text-2xl font-semibold'
                  onClick={() =>
                    setActiveFilter((prev) =>
                      prev === "semester 2" ? "" : "semester 2",
                    )
                  }
                >
                  <span>
                    <FaAngleLeft
                      size={17}
                      className={`${activeFilter === "semester 2" && "-rotate-90"}`}
                    />
                  </span>
                  Semester 2
                </div>
                <ul className='ml-12'>
                  {activeFilter === "semester 2" &&
                    firstYearSecondHalfModules.map((module) => (
                      <li key={module} className='flex items-center gap-2'>
                        <span className='line-clamp-1 flex-grow'>{module}</span>
                        <input
                          type='radio'
                          name='module'
                          value={module}
                          checked={module == searchParams.get("module")}
                          onChange={handleFirstYear}
                          className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </>
          ) : null}
          {/* second year filter */}
        </div>
      </div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='text-md bottom-5 right-5 z-[100] hidden rounded-md bg-primary-green px-4 py-2 font-semibold text-black max-md:absolute max-md:flex'
      >
        Filter
      </button>
    </>
  );
};

export default Filter;

//todo: make it responsive
