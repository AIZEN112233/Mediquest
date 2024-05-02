import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import {
  useGetDocumentsQuery,
  useFilterDocumentsMutation,
} from "../../slices/documentApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import "./ExamsSCreen.css";
import ExamCard from "../../components/ExamCard";
import Year from "../../components/year/filterRadio";
import Filter from "../../components/Filter";

const ExamsScreen = () => {
  const [exams, setExams] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetDocumentsQuery({
    keyword,
    pageNumber,
    category: "exam",
  });

  const [filterDocuments, { isLoading: loadingFiltered }] =
    useFilterDocumentsMutation();

  const handleChange = async (event) => {
    event.preventDefault();
    if (!event.target.value) {
      setExams(data);
    } else {
      try {
        const newDocuments = await filterDocuments({
          keyword,
          pageNumber,
          category: "exam",
          year: event.target.value,
        }).unwrap();
        setExams(newDocuments);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setExams(data);
    }
  }, [data]);
  return (
    <main className='flex h-dvh overflow-auto pt-[77px]'>
      <div className='sticky top-0 h-dvh bg-red-500'>
        <Filter />
      </div>
      <div className='h-[calc(199vh)] overflow-scroll'>main</div>
    </main>
  );
};

export default ExamsScreen;
