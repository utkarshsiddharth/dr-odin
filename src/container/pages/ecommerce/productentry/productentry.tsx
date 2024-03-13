/* eslint-disable react/jsx-key */
import { FC, Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { _ } from "gridjs-react";
import { BASE_URL } from "../../../../utils/apis/apis";
import logoo from "../../../../assets/images/brand-logos/logoo.png";
interface ProductlistProps {
  id?: string;
}
const schema = yup
  .object({
    moddleNo: yup.string().required(),
    name: yup.string().required(),
    price: yup.string().required(),
    originalPrice: yup.string().required(),
    image: yup.string().required(),
    link: yup.string().required(),
  })
  .required();
const Productlist: FC<ProductlistProps> = () => {
  const [product, setProduct] = useState({
    image: "",
    moddleNo: "",
    name: "",
    originalPrice: 0,
    price: 0,
    link: "",
    products: [],
    pageInfo: { currentPage: 0, totalPages: 0 },
  });
  console.log("prodycut", product);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [xlShow, setXlShow] = useState(false);
  const [image, setImage] = useState("");
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);
  //  token
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  // get card api
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        BASE_URL + `product?page=${currentPage}&limit=8`,
        config
      );
      setProduct(res?.data);
    } catch (error) {
      console.error("error fetching products:", error);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // create add api
  const formSubmit = async (data: any) => {
    if (parseFloat(data.originalPrice) < parseFloat(data.price)) {
      setError("originalPrice", {
        type: "manual",
        message: "Original price must be greater than actual price.",
      });
      return null;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("moddleNo", data.moddleNo);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("originalPrice", data.originalPrice);
    formData.append("link", data.link);

    try {
      setLoading(true);
      const res = await axios.post(BASE_URL + "product", formData, config);
      reset();
      console.log("res", res);
      fetchProducts();
      setXlShow(false);
    } catch (error) {
      console.log("error fetching products:", error);
    }
    setShow(true);
  };
  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(BASE_URL + `product/${productId}`, config);
      const res = await axios.get(BASE_URL + "product", config);
      setProduct(res.data);
    } catch (error) {
      console.error("Error deleting product:", error);
      setLoading(false);
    }
  };

  const handleFile = (event: any) => {
    setImage(event.target.files[0]);
  };

  return (
    <Fragment>
      <Col>
        <Card.Header className="d-flex align-items-center justify-content-between flex-wrap gap-3  p-3"></Card.Header>
      </Col>
      <Col xl={12}>
        <Card className="custom-card">
          <Card.Body className="">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex flex-wrap gap-1">
                <h1 className="fs-6 fw-bold">Product Addition</h1>
              </div>
              <div className="col-sm-auto">
                <div className="d-flex flex-sm-row">
                  <div className="d-flex flex-column flex-sm-row" role="search">
                    <InputGroup className="me-2 mt-2">
                      <Form.Control
                        type="text"
                        className="bg-light btn-sm border-0"
                        style={{ color: "#0095EC" }}
                        placeholder="Search Product"
                      />
                      <Button
                        variant=""
                        className="btn btn-sm bg-light"
                        type="button"
                      >
                        <i className="ri-search-line text-muted"></i>
                      </Button>
                    </InputGroup>
                  </div>

                  <button
                    className="btn text-white buyNow btn-sm text-nowrap mt-2 ms-2"
                    type="submit"
                    onClick={() => setXlShow(true)}
                  >
                    Create Card
                  </button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <div className="  " style={{overflowX:'scroll' ,height:'64vh' ,scrollBehavior:'smooth'}}>
        <Row className="d-flex">
          {product?.products.map((product: any, index: number) => (
            <Col xl={3} id="draggable-left">
              <div className="" style={{ height: "98%" }}>
                <Card
                  key={index}
                  className="custom-card"
                  style={{ height: "94%" }}
                >
                  <Card.Body className="rounded-3 mt-3">
                    <Dropdown className="d-flex justify-content-between">
                      <div
                        className="buyNow rounded-5 p-1 text-center"
                        style={{ width: 31, height: 32 }}
                      >
                        <h5 className=" text-white text-center">
                          {product?.position}
                        </h5>
                      </div>
                      <Dropdown.Toggle
                        variant="light"
                        className="btn btn-icon btn-wave waves-light no-caret"
                        type="button"
                      >
                        <i className="bi bi-three-dots-vertical buyNoww fs-14 "></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          className="text-info  "
                          href={`/editform/editform/${product?._id}`}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-info"
                          href="#"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <img
                      src={product?.image}
                      className="rounded mx-auto d-block  w-50 __se__dashed"
                      alt="..."
                      // style={{ maxWidth: "60%",maxHeight:"40%"  }}
                    />
                    <p className="d-flex justify-content-end fs-13 text-muted ">
                      {product.moddleNo}
                    </p>
                  </Card.Body>

                  <Card.Footer className="pb-5">
                    <p className="fs-14 buyNoww fw-semibold mb-0 d-flex align-items-center">
                      ₹ {product.price}
                    </p>
                    <div className="d-flex justify-content-between">
                      <span className={product.price === product.originalPrice ? '' : 'op-7 text-decoration-line-through'}>
                        MRP {product.originalPrice}
                      </span>
                      <a
                        href={product.link}
                        className="btn  rounded-5 buyNow text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(product.link, "_blank");
                        }}
                      >
                        Buy Now
                      </a>
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Modal
        size="xl"
        show={xlShow}
        onShow={() => setLoading(false)}
        onHide={() => setXlShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title as="h6" id="example-modal-sizes-title-sm">
            Add your Content
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(formSubmit)}>
          <Modal.Body>
            <Col xl={12}>
              <Card className="custom-card">
                <Card.Body>
                  <Form.Label htmlFor="input-file" className="fs-14">
                    Image Upload
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="input-file"
                    // accept="image/jpeg ,image/png"
                    {...register("image", { required: true })}
                    onChange={handleFile}
                  />
                  <p className="text-danger ">{errors.image?.message}</p>

                  <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                    Model Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    // name="photo"
                    id="input-text"
                    placeholder="Enter your model number"
                    {...register("moddleNo", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                  <p className="text-danger ">{errors.moddleNo?.message}</p>
                  <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="input-text"
                    placeholder="Enter your name"
                    {...register("name", { required: true, maxLength: 20 })}
                  />
                  <p className="text-danger ">{errors.name?.message}</p>

                  <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                    Price
                  </Form.Label>
                  <Form.Control
                    type="number"
                    id="input-text"
                    placeholder="Enter your price"
                    {...register("price", {
                      required: true,
                      minLength: 0,
                      maxLength: 10,
                    })}
                  />

                  <p className="text-danger ">{errors.price?.message}</p>

                  <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                    Original Price
                  </Form.Label>
                  <Form.Control
                    type="number"
                    id="input-text"
                    placeholder="Enter your original price"
                    {...register("originalPrice", {
                      required: true,
                      minLength: 0,
                      maxLength: 10,
                    })}
                  />
                  <p className="text-danger">{errors.originalPrice?.message}</p>

                  <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                    Product Link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="input-text"
                    placeholder="Enter the product link"
                    {...register("link", {
                      required: true,
                      maxLength: 30,
                    })}
                  />
                  <p className="text-danger ">{errors.link?.message}</p>
                </Card.Body>
              </Card>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex align-items-center buyNow rounded-2 justify-content-center">
              {loading && (
                <div
                  className="spinner-border spinner-border-sm ms-2 text-white "
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              <button
                className="btn text-white border-0 btn-sm text-nowrap"
                type="submit"
                // disabled={loading}
                // onClick={() => setXlShow(true)}
              >
                Add Product
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      {show && (
        <ToastContainer className="toast-container position-fixed top-0 end-0 me-4 mt-4">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={2000}
            autohide
            bg="primary-transparent"
            className="toast colored-toast"
          >
            <Toast.Header className="toast-header buyNow text-fixed-white mb-0">
              <img
                className="bd-placeholder-img rounded me-2"
                src={logoo}
                alt="..."
              />
              <strong className="me-auto">Dr.Odin</strong>
            </Toast.Header>
            <Toast.Body className="text-buyNoww bg-info-transparent">
              {Object.keys(errors).length === 0
                ? "Card Added Successfully!!"
                : "Please fill required fields"}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Col xl={12}>
        <Card.Body className="d-flex justify-content-end  card-body d-flex flex-wrap">
          <nav aria-label="..." className="me-3 mt-2">
            <Pagination className="">
              <Pagination.Item
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Pagination.Item>
              {Array.from({
                length: Math.ceil(product.products.length / productsPerPage),
              }).map((_, index) => (
                <div
                  key={index}
                  // active={index + 1 === currentPage}
                  // onClick={() => paginate(index + 1)}
                  className="h-25 text-center p-2 text-white"
                  style={{ width: "", background: "#0095EC" }}
                >
                  {index + 1}
                </div>
              ))}
              <Pagination.Item
                disabled={
                  product?.pageInfo?.currentPage ==
                  product?.pageInfo?.totalPages
                }
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Pagination.Item>
            </Pagination>
          </nav>
        </Card.Body>
      </Col>
    </Fragment>
  );
};

export default Productlist;
