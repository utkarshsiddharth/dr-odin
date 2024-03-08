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
interface ProductlistProps {
  id?: string;
}
const schema = yup
  .object({
    moddleNo: yup.string().required(),
    name: yup.string().required(),
    heading: yup.string().required(),
    price: yup.string().required(),
    originalPrice: yup.string().required(),
    image: yup.string().required(),
    link: yup.string().required(),
  })
  .required();
const Productlist: FC<ProductlistProps> = () => {
  const [product, setProduct] = useState({
    heading: "",
    image: "",
    moddleNo: "",
    name: "",
    originalPrice: 0,
    price: 0,
    productLink: "",
    products: [],
  });
  console.log("prodycut", product);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  // const [id, setId] = useState("");
  const [xlShow, setXlShow] = useState(false);
  const preset_key = "ngujniat";
  const cloud_name = "dgmpifw8b";
  const [image, setImage] = useState("");
  useEffect(() => {
    fetchProducts();
  }, []);
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
        "https://doctorodinbackend.onrender.com/product",
        config
      );
      // console.log("res", res);
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
  function handleFile(e: any) {
    const file = e.target.files[0];
    // console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => setImage(res.data.secure_url))
      // .then(res => console.log(res))
      .catch((err) => console.log(err));
  }
  // create add api
  const formSubmit = async (data: any) => {
    if (data.originalPrice <= data.price) {
      setError("originalPrice", {
        type: "manual",
        message: "Original price must be greater than actual price.",
      });
      return;
    }  
    data.image = image;
    try {
      const res = await axios.post(
        "https://doctorodinbackend.onrender.com/product",
        data,
        config
      );
      // console.log("data",data);
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
      await axios.delete(
        `https://doctorodinbackend.onrender.com/product/${productId}`,
        config
      );
      const res = await axios.get(
        "https://doctorodinbackend.onrender.com/product",
        config
      );
      setProduct(res.data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  // function handleChange(event: any) {
  //   setId(event.target.value);
  //   console.log("dataswfa", id);
  // }
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
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
                        className="bg-light btn-sm border-0 text-primary"
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
      <div>
        <Row className="d-flex overflow-auto">
          {currentProducts.map((product: any, index: number) => (
            <Col xl={3} id="draggable-left">
              <div className="" style={{ height: "98%" }}>
                <Card
                  key={index}
                  className="custom-card "
                  style={{ height: "94%" }}
                >
                  <Card.Body className="rounded-3 mt-3">
                    <Dropdown className="d-flex justify-content-end">
                      {/* <Form.Control type="text" className="border border-primary text-nowrap" style={{width:"16%"}} 
                      onClick={handleChange}
                       /> */}
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
                      className="rounded mx-auto d-block h-75 w-50"
                      alt="..."
                      // style={{ maxWidth: "60%",maxHeight:"40%"  }}
                    />
                    <p className="d-flex justify-content-end fs-13 text-muted ">
                      {product.moddleNo}
                    </p>
                  </Card.Body>

                  <Card.Footer className="pb-5">
                    <span className="fs-14 fw-bold ">{product.heading}</span>
                    <p className="fs-14 buyNoww fw-semibold mb-0 d-flex align-items-center">
                      ₹ {product.price}
                    </p>
                    <div className="d-flex justify-content-between">
                      <span className="op-7 text-decoration-line-through">
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
                    Heading
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="input-text"
                    placeholder="Enter your heading"
                    {...register("heading", { required: true, maxLength: 20 })}
                  />
                  <p className="text-danger ">{errors.heading?.message}</p>

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
                    <p className="text-danger">
                    {errors.originalPrice?.message}
                    </p>
                
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
            <button
              className="btn buyNow text-white btn-sm text-nowrap mt-2"
              type="submit"
              // onClick={() => setXlShow(true)}
            >
              Add Product
            </button>
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
              {/* <img
                className="bd-placeholder-img rounded me-2"
                src={favicon}
                alt="..."
              /> */}
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
          <nav aria-label="..." className="me-3 mt-2 ">
            <Pagination className="pagination">
              <Pagination.Item
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Pagination.Item>
              {Array.from({
                length: Math.ceil(product.products.length / productsPerPage),
              }).map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                  className=""
                >
                  {index + 1}
                  
                </Pagination.Item>
              ))}
              <Pagination.Item
                disabled={
                  currentPage ===
                  Math.ceil(product.products.length / productsPerPage)
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
