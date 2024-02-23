import { FC, Fragment, useEffect, useRef, useState } from "react";
import { Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { FilePond } from "react-filepond";
import layer from "../../../../assets/images/ecommerce/png/layer.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

interface ProductlistProps {}
const schema = yup
  .object({
    modelNumber: yup.string().required(),
    heading: yup.string().required(),
    price: yup.string().required(),
    originalPrice: yup.string().required(),
    productLink: yup.string().required(),
  })
  .required();
const Productlist: FC<ProductlistProps> = () => {
  const [product, setProduct] = useState([]);
  const [BasicExpanded, setBasicExpanded] = useState(true);
  const [Basicshow, setBasicshow] = useState(true);
  const BasicHandleExpandClick = () => {
    setBasicExpanded(!BasicExpanded);
  };
  const [files2, setFiles2] = useState<any>([]);
  const [xlShow, setXlShow] = useState(false);

  const leftContainerRef = useRef<HTMLDivElement | null>(null);
  const rightContainerRef = useRef<HTMLDivElement | null>(null);
  const windowElement: any = window;

  useEffect(() => {
    fetchProducts();
    if (leftContainerRef.current && rightContainerRef.current) {
      windowElement.dragula([
        leftContainerRef.current,
        rightContainerRef.current,
      ]);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://odinbackend.onrender.com/products");
      setProduct(res.data);
    } catch (error) {
      console.error("error fetching products:", error);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    try {
      await axios.post("https://odinbackend.onrender.com/product", data);
      fetchProducts();
    } catch (error) {
      console.log("error fetching products:", error);
    }
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
                  <button
                    className="btn btn-primary btn-sm text-nowrap mt-2"
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

      <Row className="d-flex">
        <Col xl={3} ref={leftContainerRef} id="draggable-left">
          {Basicshow ? (
            <div>
              {product.map((product: any, index: number) => (
                <Card key={index} className="custom-card">
                  <Card.Body className="rounded-3 mt-3 ">
                    <Dropdown className="d-flex justify-content-end">
                      <Dropdown.Toggle
                        variant="light"
                        className="btn btn-icon  btn-wave waves-light no-caret"
                        type="button"
                      >
                        <i className=" bi bi-three-dots-vertical text-primary fs-14"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#">Edit</Dropdown.Item>
                        <Dropdown.Item href="#">Delete All</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <img
                      src={layer}
                      className="rounded mx-auto d-block"
                      alt="..."
                    />

                    <p className=" d-flex justify-content-end product-description fs-13 text-muted ">
                      (JPD-FR202)
                    </p>
                  </Card.Body>

                  <Card.Footer>
                    <span className="fs-14 fw-bold">
                      Contact Less Thermometer
                    </span>
                    <p className="fs-14  text-primary fw-semibold mb-0 d-flex align-items-center">
                      ₹ 3999
                    </p>
                    <div className="d-flex justify-content-between">
                      <span className="op-7 text-decoration-line-through">
                        MRP 4999
                      </span>
                      <button className="btn btn-primary rounded-5">
                        Buy Now
                      </button>
                    </div>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          ) : null}
          {Basicshow ? (
            <Card className="custom-card">
              <Card.Body className="rounded-3 mt-3 ">
                <Dropdown className="d-flex justify-content-end">
                  <Dropdown.Toggle
                    variant="light"
                    className="btn btn-icon  btn-wave waves-light no-caret"
                    type="button"
                  >
                    <i className=" bi bi-three-dots-vertical text-primary fs-14"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Edit</Dropdown.Item>
                    <Dropdown.Item href="#">Delete All</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <img
                  src={layer}
                  className="rounded mx-auto d-block"
                  alt="..."
                />
                <p className="d-flex justify-content-end product-description fs-13 text-muted">
                  (JPD-FR202)
                </p>
              </Card.Body>

              <Card.Footer>
                <span className="fs-14 fw-bold">Contact Less Thermometer</span>
                <p className="fs-14  text-primary fw-semibold mb-0 d-flex align-items-center">
                  ₹ 3999
                </p>
                <div className="d-flex justify-content-between">
                  <span className="op-7 text-decoration-line-through">
                    MRP 4999
                  </span>
                  <button className="btn btn-primary rounded-5">Buy Now</button>
                </div>
              </Card.Footer>
            </Card>
          ) : null}
        </Col>

        <Col xl={3} ref={rightContainerRef} id="draggable-right">
          {Basicshow ? (
            <Card className="custom-card">
              <Card.Body className="rounded-3 mt-3 ">
                <Dropdown className="d-flex justify-content-end">
                  <Dropdown.Toggle
                    variant="light"
                    className="btn btn-icon  btn-wave waves-light no-caret"
                    type="button"
                  >
                    <i className=" bi bi-three-dots-vertical text-primary fs-14"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Edit</Dropdown.Item>
                    <Dropdown.Item href="#">Delete All</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <img
                  src={layer}
                  className="rounded mx-auto d-block"
                  alt="..."
                />
                <p className="d-flex justify-content-end product-description fs-13 text-muted">
                  (JPD-FR202)
                </p>
              </Card.Body>

              <Card.Footer>
                <span className="fs-14 fw-bold">Contact Less Thermometer</span>
                <p className="fs-14  text-primary fw-semibold mb-0 d-flex align-items-center">
                  ₹ 3999
                </p>
                <div className="d-flex justify-content-between">
                  <span className="op-7 text-decoration-line-through">
                    MRP 4999
                  </span>
                  <button className="btn btn-primary rounded-5">Buy Now</button>
                </div>
              </Card.Footer>
            </Card>
          ) : null}
          {Basicshow ? (
            <Card className="custom-card">
              <Card.Body className="rounded-3 mt-3 ">
                <Dropdown className="d-flex justify-content-end">
                  <Dropdown.Toggle
                    variant="light"
                    className="btn btn-icon  btn-wave waves-light no-caret"
                    type="button"
                  >
                    <i className=" bi bi-three-dots-vertical text-primary fs-14"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Edit</Dropdown.Item>
                    <Dropdown.Item href="#">Delete All</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <img
                  src={layer}
                  className="rounded mx-auto d-block"
                  alt="..."
                />
                <p className="d-flex justify-content-end product-description fs-13 text-muted">
                  (JPD-FR202)
                </p>
              </Card.Body>

              <Card.Footer>
                <span className="fs-14 fw-bold">Contact Less Thermometer</span>
                <p className="fs-14  text-primary fw-semibold mb-0 d-flex align-items-center">
                  ₹ 3999
                </p>
                <div className="d-flex justify-content-between">
                  <span className="op-7 text-decoration-line-through">
                    MRP 4999
                  </span>
                  <button className="btn btn-primary rounded-5">Buy Now</button>
                </div>
              </Card.Footer>
            </Card>
          ) : null}
          {Basicshow ? (
            <Card className="custom-card">
              <Card.Body className="rounded-3 mt-3 ">
                <Dropdown className="d-flex justify-content-end">
                  <Dropdown.Toggle
                    variant="light"
                    className="btn btn-icon  btn-wave waves-light no-caret"
                    type="button"
                  >
                    <i className=" bi bi-three-dots-vertical text-primary fs-14"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Edit</Dropdown.Item>
                    <Dropdown.Item href="#">Delete All</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <img
                  src={layer}
                  className="rounded mx-auto d-block"
                  alt="..."
                />
                <p className="d-flex justify-content-end product-description fs-13 text-muted">
                  (JPD-FR202)
                </p>
              </Card.Body>

              <Card.Footer>
                <span className="fs-14 fw-bold">Contact Less Thermometer</span>
                <p className="fs-14  text-primary fw-semibold mb-0 d-flex align-items-center">
                  ₹ 3999
                </p>
                <div className="d-flex justify-content-between">
                  <span className="op-7 text-decoration-line-through">
                    MRP 4999
                  </span>
                  <button className="btn btn-primary rounded-5">Buy Now</button>
                </div>
              </Card.Footer>
            </Card>
          ) : null}
        </Col>
      </Row>

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Col xl={12}>
              <Card className="custom-card">
                <Card.Body>
                  <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                    Upload Image
                  </Form.Label>
                  <FilePond
                    className="multiple-filepond"
                    files={files2}
                    onupdatefiles={setFiles2}
                    maxFiles={1}
                    server="/api"
                    acceptedFileTypes={["image/jpeg", "image/png"]}
                    // name="files"
                    labelIdle="Drag & Drop your Images here or click"
                  />

                  <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                    Model Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="input-text"
                    placeholder="Enter your model number"
                    {...register("modelNumber", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                  <p className="text-danger ">{errors.modelNumber?.message}</p>
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
                  <p className="text-danger ">
                    {errors.originalPrice?.message}
                  </p>
                  <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                    Product Link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="input-text"
                    placeholder="Enter the product link"
                    {...register("productLink", {
                      required: true,
                      maxLength: 30,
                    })}
                  />
                  <p className="text-danger ">{errors.productLink?.message}</p>
                </Card.Body>
              </Card>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-primary btn-sm text-nowrap mt-2"
              type="submit"
              onClick={() => setXlShow(true)}
            >
              Add Product
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

export default Productlist;
