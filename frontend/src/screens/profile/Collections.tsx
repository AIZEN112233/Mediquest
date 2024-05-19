import { Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { PiFoldersFill } from "react-icons/pi";
import { Loader, Message } from "../../components";
import { useGetMyCollectionsQuery } from "../../slices/collectionsApiSlice";
import "./ProfileScreen.css";
import "../exams/ExamsSCreen.css";
const ProfileScreen = () => {
  const { data, isLoading, error } = useGetMyCollectionsQuery();

  return (
    <>
      <Row className='exams-row' style={{}}>
        <Col
          className='content-side'
          style={{ backgroundColor: "#161616", minHeight: "100vh" }}
        >
          <Row className='mt-2 p-3'>
            <Col>
              <h2 className='text-3xl font-bold'>Collections</h2>
            </Col>
          </Row>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error.data.message}</Message>
          ) : data.length === 0 ? (
            <Row className='justify-content-center'>
              <Col md={6}>
                <Message>you have no collections, create new one now!</Message>
              </Col>
            </Row>
          ) : (
            <Row className='m-2'>
              {/* fix collection type */}
              {data?.map((collection: any) => (
                <Col key={collection._id} sm={6} md={4}>
                  <div className='collection-card mx-3'>
                    <LinkContainer
                      to={`/collection/${collection._id}`}
                      style={{ cursor: "pointer" }}
                    >
                      <PiFoldersFill size={170} />
                    </LinkContainer>
                    <h6>{collection.title}</h6>

                    <Col>Created At</Col>
                    <Col>{collection.createdAt.substring(0, 10)}</Col>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
