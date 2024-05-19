import { Row, Col } from "react-bootstrap";
import { useGetUserProfileQuery } from "../../slices/usersApiSlice";
import "./ProfileScreen.css";
import { Message, ExamCard, Loader } from "../../components";
import "../exams/ExamsSCreen.css";
import { BsFillHeartFill } from "react-icons/bs";
const ProfileScreen = () => {
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery();

  return (
    <>
      <Row className='exams-row'>
        <Col
          className='content-side'
          style={{ backgroundColor: "#161616", minHeight: "100vh" }}
        >
          <Row className='mt-2 flex items-center justify-between  p-3'>
            <h2 className='w-fit text-3xl font-bold'>Liked</h2>
            <h2 className='flex  w-fit items-center gap-2 text-3xl font-bold'>
              {userProfile?.favourites.length}{" "}
              <span>
                <BsFillHeartFill size={27} className='text-primary-green' />
              </span>
            </h2>
          </Row>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error.data.message}</Message>
          ) : userProfile?.favourites.length === 0 ? (
            <Row className='justify-content-center'>
              <Col md={10}>
                <Message>You have no Favourites !</Message>
              </Col>
            </Row>
          ) : (
            <Row className='  justify-content-center'>
              {userProfile?.favourites.map((document) => (
                <Col key={document._id} sm={6} md={5} lg={4} xl={3}>
                  <div className='card-container'>
                    <ExamCard document={document} />
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
