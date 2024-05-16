/* eslint-disable eqeqeq */
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../exams/ExamsSCreen.css";
import { Filter, ExamCard } from "../../components";
import { FaAngleLeft } from "react-icons/fa6";
import axios from "axios";
import data from "../../db/data.json";
//todo fix import for css

let CoursesScreen = () => {
  let [courses, setCourses] = useState([]);
  let [filtered, setFiltered] = useState([]);
  let [isOpen, setIsOpen] = useState(true);
  //this state tracks the active section of the filter and it should be only one opened
  let [activeFilter, setActiveFilter] = useState("");
  let { pageNumber, keyword } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const year =
    searchParams.get("year") !== "all" ? searchParams.get("year") : null;
  const faq =
    searchParams.get("faq") !== "all" ? searchParams.get("faq") : null;

  filtered = useMemo(() => {
    if (courses) {
      return courses?.filter((item) => {
        // Filter by both year and faq
        return (item.year == year || !year) && (item.faq == faq || !faq);
      });
    }
    return courses;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, faq, courses]);

  useEffect(() => {
    // axios
    //   .get(`http://localhost:5000/api/documents?category=course`)
    //   .then((res) => {
    //     setCourses(res.data.categorizedDocs);
    //   });

    //simulate a promise with new filtered data
    Promise.resolve(setTimeout(() => setCourses(data.categorizedDocs), 1000));
  }, []);

  return (
    <>
      <div className='mt-[77px] flex h-[calc(100dvh-77px)] overflow-auto'>
        {/* here is where we filter stuff currently its not performant and not shareable in the future i will solve it */}
        <Filter />
        <div>
          <div className='bg-red mt-3 flex justify-between p-3'>
            <strong className='text-3xl'>Courses</strong>
            <strong className='text-3xl'>{filtered?.length}</strong>
          </div>
          <ul className='grid list-none grid-cols-5 gap-4 p-4 max-xl:grid-cols-3 max-md:grid-cols-2'>
            {filtered.length !== 0 ? (
              filtered?.map((document) => (
                <li key={document._id}>
                  <div className='card-container'>
                    <ExamCard document={document} className='m-3' />
                  </div>
                </li>
              ))
            ) : (
              <h1>NO Documents to Show Here</h1>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CoursesScreen;
