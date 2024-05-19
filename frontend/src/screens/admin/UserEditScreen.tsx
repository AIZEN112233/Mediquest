import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FormContainer, Loader, Message } from "../../components";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("user updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: "white",
          padding: "2rem 5rem",
          color: "black",
          paddingTop: "7rem",
          minHeight: "100vh",
        }}
      >
        <Link to='/admin/userlist' className='btn btn-light my-3'>
          Go Back
        </Link>
        <FormContainer>
          <h1>Edit User</h1>
          {loadingUpdate && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='isadmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <Button
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
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </div>
    </>
  );
};

export default UserEditScreen;
