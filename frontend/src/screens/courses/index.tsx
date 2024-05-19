/* eslint-disable eqeqeq */
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../exams/ExamsSCreen.css";
import ExamCard from "../../components/ExamCard";
import axios from "axios";
import data from "../../db/data.json";
import { Filter } from "../../components";
//todo fix import for css

const CoursesScreen = () => {
  const [courses, setCourses] = useState([]);
  const { pageNumber, keyword } = useParams();
  const [searchParams] = useSearchParams();

  const year =
    searchParams.get("year") !== "all" ? searchParams.get("year") : null;
  const faq =
    searchParams.get("faq") !== "all" ? searchParams.get("faq") : null;
  const module =
    searchParams.get("module") !== "all" ? searchParams.get("module") : null;
  const semester =
    searchParams.get("semester") !== "semester 1"
      ? searchParams.get("semester")
      : null;

  const unite =
    (year === "2" || year === "3") && searchParams.get("unite") !== "all"
      ? searchParams.get("unite")
      : null;

  const filtered = useMemo(() => {
    if (courses.length > 0) {
      //fix courses type
      return courses.filter((item: any) => {
        const yearMatch = item.year == year || !year;
        const faqMatch = item.faq == faq || !faq;
        const moduleMatch = item.module == module || !module;
        const semesterMatch = item.semester == semester || !semester;
        const uniteMatch = item.unite == unite || !unite;
        return (
          yearMatch && faqMatch && moduleMatch && semesterMatch && uniteMatch
        );
      });
    }
    return courses;
  }, [year, faq, module, semester, unite, courses]);

  useEffect(() => {
    // Uncomment below axios call when backend is available
    // axios
    //   .get(`http://localhost:5000/api/documents?category=course`)
    //   .then((res) => {
    //     setCourses(res.data.categorizedDocs);
    //   });

    // Simulate a promise with new filtered data
    const fetchCourses = async () => {
      //fix response type
      const response: any = await new Promise((resolve) =>
        setTimeout(
          () => resolve({ data: { categorizedDocs: data.categorizedDocs } }),
          1000,
        ),
      );
      setCourses(response?.data.categorizedDocs);
    };
    fetchCourses();
  }, []);

  return (
    <div className='mt-[77px] flex h-[calc(100dvh-77px)] overflow-auto'>
      {/* Filter component */}
      <Filter />
      <div className='max-md:w-screen'>
        <div className='bg-red mt-3 flex justify-between p-3'>
          <strong className='text-3xl'>Courses</strong>
          <strong className='text-3xl'>{filtered.length}</strong>
        </div>
        <ul className='grid list-none grid-cols-5 gap-4 p-4 max-xl:grid-cols-3 max-md:grid-cols-2'>
          {filtered.length !== 0 ? (
            // fix document type
            filtered.map((document: any) => (
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
  );
};

export default CoursesScreen;
