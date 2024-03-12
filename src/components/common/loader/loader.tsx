import { Card, Col, Row } from "react-bootstrap";
// import loader from "../../../assets/images/media/loader.svg";
const Loader = () => {

  return (
    <div id="loader">
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Col xl={12}>
          <Card.Body className="d-flex justify-content-center pla ">
            <div
              className="spinner-border me-4"
              style={{ width: "3rem", height: "3rem", color: "#0095EC" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </div>
  );
};

export default Loader;
