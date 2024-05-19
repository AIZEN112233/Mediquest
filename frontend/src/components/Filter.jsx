/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import {
  FifthYear,
  FirstYear,
  FourthYear,
  SecondYear,
  ThirdYear,
  faculties,
  years,
} from "../constants";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [year, setYear] = useState();
  const [faq, setFaq] = useState();
  const [module, setModule] = useState();
  const [semester, setSemester] = useState();
  const [activeFilter, setActiveFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [unite, setUnite] = useState();

  const filterValues = {
    year: year || "all",
    faq: faq || "all",
  };
  if (searchParams.get("year") == "1") {
    filterValues.module = module || "all";
    filterValues.semester = semester || "semester 1";
  } else if (
    searchParams.get("year") == "2" &&
    searchParams.get("year") == "3"
  ) {
    filterValues.module = module || "all";
    filterValues.unite = unite || "all";
  } else if (searchParams.get("year") >= "4") {
    filterValues.module = module || "all";
  }
  // todo wrap it in useMemo
  useEffect(() => {
    setSearchParams(filterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, faq, module, semester]);

  const handleFirstYear = (e) => {
    setModule(e.target.value);
    setSemester(activeFilter);
  };
  const handleSecondYear = (e) => {
    setModule(e.target.value);
    setUnite(activeFilter);
  };

  return (
    <>
      <div
        className={`sticky top-0 z-[1000] h-full w-[300px] overflow-auto bg-primary-green/5 max-md:absolute max-md:bg-[#161616]/95 ${isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}
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
                      checked={fac === searchParams.get("faq")}
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
              {FirstYear.map((year) => (
                <div>
                  <div
                    className='flex items-center gap-2 text-2xl font-semibold'
                    onClick={() =>
                      setActiveFilter((prev) =>
                        prev === `semester ${year.semester}`
                          ? ""
                          : `semester ${year.semester}`,
                      )
                    }
                  >
                    <span>
                      <FaAngleLeft
                        size={17}
                        className={`${activeFilter === `semester ${year.semester}` && "-rotate-90"}`}
                      />
                    </span>
                    Semester {year.semester}
                  </div>
                  <ul className='ml-12'>
                    {activeFilter === `semester ${year.semester}` &&
                      year.module.map((module) => (
                        <li key={module} className='flex items-center gap-2'>
                          <span className='line-clamp-1 flex-grow'>
                            {module}
                          </span>
                          <input
                            type='radio'
                            name='module'
                            value={module}
                            checked={
                              module === searchParams.get("module") &&
                              searchParams.get("semester") ===
                                `semester ${year.semester}`
                            }
                            onChange={handleFirstYear}
                            className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </>
          ) : null}
          {/* second year filter */}
          {searchParams.get("year") == "2" ? (
            <>
              {SecondYear.map((unite) => (
                <div key={unite.unite}>
                  <div
                    className='flex items-center gap-2 text-2xl font-semibold'
                    onClick={() =>
                      setActiveFilter((prev) =>
                        prev === unite.unite ? "" : unite.unite,
                      )
                    }
                  >
                    <span>
                      <FaAngleLeft
                        size={17}
                        className={`${activeFilter === unite.unite && "-rotate-90"}`}
                      />
                    </span>
                    {unite.unite}
                  </div>
                  <ul className='ml-12'>
                    {activeFilter === unite.unite &&
                      unite.module.map((module) => (
                        <li key={module} className='flex items-center gap-2'>
                          <span className='line-clamp-1 flex-grow'>
                            {module}
                          </span>
                          <input
                            type='radio'
                            name='module'
                            value={module}
                            checked={
                              module === searchParams.get("module") &&
                              searchParams.get("unite") === unite.unite
                            }
                            onChange={handleSecondYear}
                            className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </>
          ) : null}
          {/* Third year filter */}
          {searchParams.get("year") == "3" ? (
            <>
              {ThirdYear.map((unite) => (
                <div key={unite.unite}>
                  <div
                    className='flex items-center gap-2 text-2xl font-semibold'
                    onClick={() =>
                      setActiveFilter((prev) =>
                        prev === unite.unite ? "" : unite.unite,
                      )
                    }
                  >
                    <span>
                      <FaAngleLeft
                        size={17}
                        className={`${activeFilter === unite.unite && "-rotate-90"}`}
                      />
                    </span>
                    {unite.unite}
                  </div>
                  <ul className='ml-12'>
                    {activeFilter === unite.unite &&
                      unite.module.map((module) => (
                        <li key={module} className='flex items-center gap-2'>
                          <span className='line-clamp-1 flex-grow'>
                            {module}
                          </span>
                          <input
                            type='radio'
                            name='module'
                            value={module}
                            checked={
                              module === searchParams.get("module") &&
                              searchParams.get("unite") === unite.unite
                            }
                            onChange={handleSecondYear}
                            className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </>
          ) : null}
          {searchParams.get("year") == "4" ? (
            <div>
              <div
                className='flex items-center gap-2 text-2xl font-semibold'
                onClick={() =>
                  setActiveFilter((prev) => (prev === "module" ? "" : "module"))
                }
              >
                <span>
                  <FaAngleLeft
                    size={17}
                    className={`${activeFilter === "module" && "-rotate-90"}`}
                  />
                </span>
                modules
              </div>
              <ul className='ml-6'>
                {activeFilter === "module" &&
                  FourthYear.map((module) => (
                    <li key={module} className='flex items-center gap-2'>
                      <span className='flex-grow'>{module}</span>
                      <input
                        type='radio'
                        name='module'
                        value={module}
                        checked={module == searchParams.get("module")}
                        onChange={(e) => setModule(e.target.value)}
                        className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
                      />
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}
          {searchParams.get("year") == "5" ? (
            <div>
              <div
                className='flex items-center gap-2 text-2xl font-semibold'
                onClick={() =>
                  setActiveFilter((prev) => (prev === "module" ? "" : "module"))
                }
              >
                <span>
                  <FaAngleLeft
                    size={17}
                    className={`${activeFilter === "module" && "-rotate-90"}`}
                  />
                </span>
                modules
              </div>
              <ul className='ml-6'>
                {activeFilter === "module" &&
                  FifthYear.map((module) => (
                    <li key={module} className='flex items-center gap-2'>
                      <span className='flex-grow'>{module}</span>
                      <input
                        type='radio'
                        name='module'
                        value={module}
                        checked={module == searchParams.get("module")}
                        onChange={(e) => setModule(e.target.value)}
                        className='h-4 w-4 appearance-none rounded-sm border-2 border-primary-green checked:bg-primary-green'
                      />
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}
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

//todo: make component for the filter items
