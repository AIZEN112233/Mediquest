import React from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetDocumentsQuery } from "../../slices/documentApiSlice";
import "./ExamsSCreen.css";
import { ExamCard, Paginate, Message, Loader } from "../../components";

const ExamsScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetDocumentsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      <Row className='exams-row'>
        {/* <Col className="filter-side" md={2} style={{ height: "100vh" }}>
          first
        </Col> */}

        <Col
          className='content-side mx-3'
          style={{ backgroundColor: "#161616", minHeight: "100vh" }}
        >
          <Row className='mt-3 p-3'>
            <Col>
              <strong>Results</strong>
            </Col>
            <Col>
              <strong></strong>
            </Col>
          </Row>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Message variant='danger'>
              {isError?.data?.message || isError?.error}
            </Message>
          ) : (
            <Row className='m-1'>
              {data?.documents.map((document) => (
                <Col key={document._id} sm={12} md={5} lg={4} xl={3}>
                  <div
                    className='card-container'
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <ExamCard document={document} className='m-2' />
                  </div>
                </Col>
              ))}
            </Row>
          )}

          <Paginate
            pages={data?.pages}
            page={data?.page}
            keyword={keyword ? keyword : ""}
          />
        </Col>
      </Row>
    </>
  );
};

export default ExamsScreen;
