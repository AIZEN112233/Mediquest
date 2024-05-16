import React, { useState, useEffect } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetDocumentsQuery,
  useFilterDocumentsMutation,
} from "../../slices/documentApiSlice";
import "../exams/ExamsSCreen.css";
import { Year, ExamCard, Loader, Message } from "../../components";

const SummariesScreen = () => {
  const [summaries, setSummaries] = useState();
  const [isOpen, setIsOpen] = useState(true);

  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetDocumentsQuery({
    keyword,
    pageNumber,
    category: "summary",
  });

  const [filterDocuments, { isLoading: loadingFiltered }] =
    useFilterDocumentsMutation();

  const handleChange = async (event) => {
    event.preventDefault();

    if (!event.target.value) {
      setSummaries(data);
    } else {
      try {
        const newDocuments = await filterDocuments({
          keyword,
          pageNumber,
          category: "summary",
          year: event.target.value,
        }).unwrap();
        setSummaries(newDocuments);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setSummaries(data);
    }
  }, [data]);

  return (
    <>
      <Row className='exams-row'>
        <button
          className='fixed bottom-0 right-0 m-3 hidden w-fit rounded bg-primary-green px-3 py-2 font-bold text-black max-md:inline'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Filter
        </button>
        {isOpen && (
          <Col className='filter-side' md={2}>
            <Year handleChange={handleChange} />
          </Col>
        )}

        <Col
          className='content-side'
          style={{ backgroundColor: "#161616", minHeight: "100vh" }}
          md={10}
        >
          <Row className='mt-3 p-3'>
            <div className='flex justify-between'>
              <strong className='text-3xl'>Summaries</strong>
              <strong className='text-3xl'>
                {summaries?.categorizedDocs.length}
              </strong>
            </div>
            {/*<Col>
                <strong>16 exams</strong>
              </Col> */}
          </Row>
          {loadingFiltered && <Loader />}
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Message variant='danger'>
              {isError?.data?.message || isError?.error}
            </Message>
          ) : (
            <Row className='m-2'>
              {summaries?.categorizedDocs.map((document) => (
                <Col key={document._id} sm={12} md={5} lg={4} xl={3}>
                  <div className='card-container'>
                    <ExamCard document={document} className='m-3' />
                  </div>
                </Col>
              ))}

              {summaries?.categorizedDocs.length === 0 && (
                <Row className='justify-content-center'>
                  <Col md={10}>
                    <Message>no matches were found!</Message>
                  </Col>
                </Row>
              )}
            </Row>
          )}
          {summaries?.pages > 1 && (
            <Pagination className='mx-auto my-2'>
              {[...Array(summaries?.pages).keys()].map((x) => (
                <LinkContainer key={x + 1} to={`/summaries/page/${x + 1}`}>
                  <Pagination.Item active={x + 1 === summaries?.page}>
                    {x + 1}
                  </Pagination.Item>
                </LinkContainer>
              ))}
            </Pagination>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SummariesScreen;
