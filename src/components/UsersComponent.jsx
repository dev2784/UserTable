import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Form, FormControl, Navbar, Row, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../redux/actions/users';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const loading = useSelector(state => state.users.loading);
    const error = useSelector(state => state.users.error);
    const [searchValue, setSearchValue] = useState('')

    const searchData = (searchValue) => {
      (searchValue.length > 2 || searchValue.length === 0) &&
      setSearchValue(searchValue)
    }
  
    useEffect(() => {
      dispatch(getUsers(searchValue));
    }, [dispatch,searchValue])

  return (
    <div className="main">
      <Container>
        <Row>
          <Col>
            <Navbar bg="primary" variant="dark">
              <Container>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="mr-2"
                    aria-label="Search"
                    onChange={e => searchData(e.target.value)}
                  />
                </Form>
              </Container>
            </Navbar>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
              {users.loading && <tr><td colSpan="4">Loading...</td></tr>}
              {users.length === 0 && !loading && <tr><td colSpan="4">No users available!</td></tr>}
              {error && !loading && <tr><td colSpan="4">{error}</td></tr>}
              {users.length > 0 && users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index +1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.website}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
    
  )
}

export default Users;