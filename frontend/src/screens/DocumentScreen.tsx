import { FormEvent, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Card,
  Modal,
  Spinner,
} from "react-bootstrap";
import { IoMdEye } from "react-icons/io";
import { FaDownload, FaTrash, FaFolderPlus } from "react-icons/fa";
import { Rating } from "../components";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  useGetDocumentDetailsQuery,
  useCreateReviewMutation,
  useDeleteCommentMutation,
  useDownloadDocumentMutation,
} from "../slices/documentApiSlice";
import {
  useCreateCollectionMutation,
  useAddMoreDocsMutation,
  useGetMyCollectionsQuery,
} from "../slices/collectionsApiSlice";
import { Meta, Message, Loader } from "../components";
const DocumentScreen = () => {
  const { id: documentId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showCols, setShowCol] = useState(false);
  const [loadingDownload, setLoading] = useState(false);

  const [createCollection, { isLoading: loandingCollectionCreation, error }] =
    useCreateCollectionMutation();

  const [addMoreDocs, { isLoading: loandingAddingToCollection }] =
    useAddMoreDocsMutation();

  const navigate = useNavigate();

  const { data, isLoading, refetch, isError } =
    useGetDocumentDetailsQuery(documentId);

  const [downloadDocument] = useDownloadDocumentMutation();
  //const {data:downloadedDocument} =   useGetDownloadDocumentQuery(documentId)

  const { userInfoMediquest } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const [deleteComment, { isLoading: loadingDelete }] =
    useDeleteCommentMutation();

  const downloadFile2 = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await downloadDocument({ documentId });

      //const blob = await res.blob();
      const blob = res.data;

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(
        new Blob([res.data], { type: res.data.type }),
      );
      link.download = "file.pdf";
      // link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const downloadFile = async (e: FormEvent) => {
    e.preventDefault();
    if (userInfoMediquest) {
      setLoading(true);
      axios({
        url: `/api/documents/${documentId}/download`,
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          setLoading(false);
          // Extract filename from Content-Disposition header
          const contentDisposition = response.headers["content-disposition"];
          const filenameMatch =
            contentDisposition && contentDisposition.match(/filename="(.+?)"/);
          const filename = filenameMatch ? filenameMatch[1] : "downloadedFile";
          // Access the response data directly
          const blob = response.data;
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);

          // Append to html link element page
          document.body.appendChild(link);
          setLoading(false);
          // Start download
          link.click();

          // Clean up and remove the link
          link?.parentNode?.removeChild(link);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setLoading(false);
            toast.error("Sorry, no PDF file available for download now.");
          } else {
            // Handle other errors
            setLoading(false);
            toast.error(
              `An error occurred: ${error.response.data.message || "Unknown error"}`,
            );
          }
        });
    } else {
      toast.error("Please sign in to your account to enable downloads.");
    }
  };
  const {
    data: collections,
    isLoading: loadingCollections,
    errorCollections,
  } = useGetMyCollectionsQuery();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createReview({
        documentId,
        rating,
        comment,
      }).unwrap();
      refetch();
      setRating(0);
      setComment("");
      toast.success("Review created successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteReview = async () => {
    try {
      await deleteComment({
        documentId,
      }).unwrap();
      refetch();
      toast.success("Review deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addToCollectionHandler = async (id: string) => {
    try {
      await addMoreDocs({
        collectionId: id,
        _id: documentId,
        name: data.name,
        image: data.image,
      }).unwrap();
      navigate(`/collection/${id}`);
      toast.success("Added to collection successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const addToNewCollectionHandler = async () => {
    try {
      const res = await createCollection({
        collectionItems: { ...data },
      }).unwrap();
      navigate(`/collection/${res._id}`);
      toast.success("collection created successfully");
    } catch (err: any) {
      toast.error(err);
    }
  };

  const showCollections = () => {
    setShowCol(!showCols);
  };

  const btnStyle = {
    padding: "1rem 3rem",
    margin: "auto",
    color: "black",
    backgroundColor: "#75dab4",
    borderRadius: "5px",
    fontWeight: "bolder",
    fontSize: "1rem",
    border: "transparent",
  };

  // image resizing
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(data);

  return (
    <>
      <div className='document-container'>
        <Link className='btn btn-light my-3' to='/exams'>
          Go Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant='danger'>
            "Something went wrong, please try again later!"
          </Message>
        ) : (
          <>
            <Meta title={data.name} />
            <Row
              style={{
                marginBottom: "2rem",
                color: "black",
                backgroundColor: "white",
              }}
            >
              <Modal
                size='lg'
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Image
                    src={data.image}
                    alt={data.name}
                    style={{ margin: "auto", width: "100%", height: "100%" }}
                  />
                </Modal.Body>
              </Modal>

              <Col
                sm={12}
                md={6}
                lg={4}
                className='d-flex justify-content-center align-items-center'
              >
                <Link to={`${data.file}`} target='_blank'>
                  <Image
                    src={data.image}
                    alt={data.name}
                    style={{ cursor: "pointer" }}
                    fluid
                    // onClick={handleShow}
                  />
                </Link>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{data.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={data.rating}
                      text={`${data.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Year :{" "}
                    <span style={{ fontWeight: "bold" }}>{data.year} </span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description: {data.description}
                  </ListGroup.Item>
                  <ListGroup.Item className='ga-5 flex items-center'>
                    <Link to={`${data.file}`} target='_blank'>
                      <IoMdEye
                        color='rgb(72 175 140)'
                        onClick={handleShow}
                        size={40}
                        style={{ marginRight: "1rem", cursor: "pointer" }}
                      />
                    </Link>
                    <FaDownload
                      onClick={(e) => downloadFile(e)}
                      color='rgb(72 175 140)'
                      size={28}
                      style={{ cursor: "pointer" }}
                    />{" "}
                    {loadingDownload && (
                      <Spinner animation='border' variant='dark' />
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={12} md={12} lg={4}>
                <Card
                  className='d-flex align-items-center  
                        justify-content-center rounded'
                  style={{ color: "black" }}
                >
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <button
                        className='btn-block mb-3 flex items-center gap-2'
                        onClick={showCollections}
                        style={btnStyle}
                      >
                        Add To Collection <FaArrowRightLong color='black' />
                      </button>

                      {showCols &&
                        (loadingCollections ? (
                          <Loader />
                        ) : errorCollections ? (
                          <Message variant='danger'>
                            {error?.data?.message || error.error}
                          </Message>
                        ) : userInfoMediquest ? (
                          <>
                            {/* fix collection type */}
                            {collections?.map((collection: any) => (
                              <Row key={collection._id} className='mt-2 p-2'>
                                <Col md={9}>
                                  <strong>{collection.title}</strong>
                                </Col>
                                <Col md={2}>
                                  <Button
                                    style={{
                                      backgroundColor: "#0b1e33",
                                      border: "#0b1e33",
                                    }}
                                    className='btn-sm'
                                    onClick={() =>
                                      addToCollectionHandler(collection._id)
                                    }
                                  >
                                    <FaFolderPlus
                                      size={18}
                                      style={{ cursor: "pointer" }}
                                    />
                                  </Button>
                                </Col>{" "}
                              </Row>
                            ))}
                            {loandingAddingToCollection && (
                              <Spinner
                                animation='border'
                                role='status'
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  margin: "auto",
                                  display: "block",
                                  color: "black",
                                }}
                              ></Spinner>
                            )}
                            <Button
                              type='button'
                              className='btn-block mt-3'
                              onClick={addToNewCollectionHandler}
                              style={{
                                padding: "0.5rem 2rem",
                                color: "#75dab4",
                                backgroundColor: "black",
                                borderRadius: "5px",
                                fontWeight: "bold",
                                border: "transparent",
                              }}
                            >
                              {loandingCollectionCreation ? (
                                <Spinner
                                  animation='border'
                                  role='status'
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    margin: "0 4rem",
                                    display: "block",
                                  }}
                                ></Spinner>
                              ) : (
                                "Add To New Collection"
                              )}
                            </Button>
                          </>
                        ) : (
                          <Message>
                            Please <Link to='/login'>sign in</Link> So you can
                            add the document to your collections
                          </Message>
                        ))}
                      {}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row
              className='review'
              style={{
                color: "black",
                margin: "auto",
              }}
            >
              <Col md={12} lg={8}>
                <h2>Reviews</h2>
                {data.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {/* fix review type */}
                  {data.reviews.map((review: any) => (
                    <ListGroup.Item key={review._id}>
                      <Row>
                        <Col md={10}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                        </Col>
                        <Col md={2} className='justify-content-end'>
                          {userInfoMediquest &&
                            userInfoMediquest._id === review.user && (
                              <Button
                                variant='danger'
                                className='btn-sm'
                                onClick={() => deleteReview()}
                              >
                                {loadingDelete ? (
                                  <Spinner
                                    animation='border'
                                    role='status'
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      margin: "auto",
                                      display: "block",
                                      color: "white",
                                    }}
                                  ></Spinner>
                                ) : (
                                  <FaTrash color='white' size={20} />
                                )}
                              </Button>
                            )}
                        </Col>
                      </Row>

                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Review</h2>

                    {loadingProductReview && <Loader />}

                    {userInfoMediquest ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            required
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group className='my-2' controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            rows={3}
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          type='submit'
                          variant='primary'
                          style={{
                            marginTop: "1rem",
                            backgroundColor: "#75D4B4",
                            border: "none",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default DocumentScreen;
