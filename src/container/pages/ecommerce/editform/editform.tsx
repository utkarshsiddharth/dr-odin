import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { FC, Fragment, useEffect, useState } from "react";
import { Card, Col, Form, Toast, ToastContainer } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { BASE_URL } from "../../../../utils/apis/apis";
import logoo from "../../../../assets/images/brand-logos/logoo.png";
interface OrdersProps {
  id?: string;
  onClose?: () => void;
}
const schema = yup
  .object({
    image: yup.string().required(),
    moddleNo: yup.string().required(),
    name: yup.string().required(),
    price: yup.number().required(),
    originalPrice: yup.number().required(),
    link: yup.string().required(),
  })
  .required();

const Orders: FC<OrdersProps> = () => {
  const [position, setPosition] = useState("");
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [image, setImage] = useState("");
  const { productId: id } = useParams();
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `${import.meta.env.BASE_URL}productentry/productentry/`;
    navigate(path);
  };
  useEffect(() => {
    if (formData) {
      setValue("image", formData?.image);
      setValue("moddleNo", formData?.moddleNo);
      setValue("name", formData?.name);
      setValue("originalPrice", formData?.originalPrice);
      setValue("price", formData?.price);
      setValue("link", formData?.link);
      setPosition(formData?.position);
    }
  }, [formData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL + `product/${id}`, config);
        console.log("data", id);
        console.log(res);
        setFormData(res.data);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [id]);
  const handleFile = (event: any) => {
    setImage(event.target.files[0]);
  };
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      image: "",
      moddleNo: "",
      name: "",
      originalPrice: 0,
      price: 0,
      link: "",
    },
  });
  const handleCancel = () => {
    reset();
  };
  const onSubmit = async (data: any) => {
    if (parseFloat(data.originalPrice) < parseFloat(data.price)) {
      setError("originalPrice", {
        type: "manual",
        message: "Original price must be greater than actual price.",
      });
      return;
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
      await axios.put(BASE_URL + `product/${id}`, formData, config);
      setShow(true);
      setTimeout(() => {
        routeChange();
      }, 1000);
    } catch (error) {
      console.log("error ", error);
      setLoading(false);
    }
  };

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setPosition(value);
  };

  const upDatePostion = async () => {
    if (position === "0") {
      return;
    }

    try {
      setLoading1(true);
      const data = { position: position };
      const res = await axios.patch(BASE_URL + `product/${id}`, data, config);
      console.log(res);
      setTimeout(() => {
        routeChange();
      }, 1000);
      setUpdate(true);
    } catch (error) {
      console.log("Error Fetching Data", error);
      setLoading1(false);
    }
  };

  return (
    <Fragment>
      <Col>
        <Card.Header className="d-flex align-items-center justify-content-between flex-wrap gap-3  p-3"></Card.Header>
      </Col>
      <div className="d-flex justify-content-end">
        <div className="d-flex  mt-2 ms-2 buyNow rounded-2  justify-content-center">
          {loading1 && (
            <div
              className="spinner-border spinner-border-sm ms-1 text-white "
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <button
            className="btn  text-white btn-sm text-nowrap ms-2"
            type="submit"
            // disabled={position.trim().length === 0}
            onClick={upDatePostion}
          >
            Update Position
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Col xl={12}>
          <Card className="custom-card mt-2">
            <Card.Body className="">
              <div className="d-flex align-items-center justify-content-between flex-wra">
                <div className="d-flex flex-wrap gap-1">
                  <h1 className="fs-6 fw-bold">Edit your Content</h1>
                </div>
                <div className="col-sm-auto">
                  <div className="d-flex flex-sm-row">
                    <button
                      className="btn buyNow text-white btn-sm text-nowrap mt-2"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <div className="d-flex align-items-center mt-2 ms-2 buyNow rounded-2 justify-content-center">
                      {loading && (
                        <div
                          className="spinner-border spinner-border-sm ms-1 text-white "
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      <button
                        className="btn text-white border-0 btn-sm text-nowrap"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Card.Body>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <div>
                  <Form.Label htmlFor="input-text" className=" fs-14">
                    Position
                  </Form.Label>

                  <Form.Control
                    type="number"
                    id="input-text"
                    placeholder="Enter your position"
                    value={position}
                    onChange={handleInputChange}
                  />
                  <p className="text-danger ">
                    {position === "0" && "Position zero is not acceptable"}
                  </p>
                  <Form.Label htmlFor="input-file" className="fs-14 mt-2">
                    Image Upload
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="input-file"
                    // required
                    onChange={handleFile}
                  />
                  <img
                    src={formData?.image}
                    style={{ height: "6%", width: "8%" }}
                    alt="done"
                  ></img>
                </div>

                <Form.Label htmlFor="input-text " className="mt-4 fs-14">
                  Model Number
                </Form.Label>
                <Form.Control
                  type="text"
                  // name="photo"
                  id="input-text"
                  placeholder="Enter your model number"
                  {...register("moddleNo", {
                    maxLength: 20,
                  })}
                />
                <p className="text-danger">{errors.moddleNo?.message}</p>

                <Form.Label htmlFor="input-text" className="mt-2 fs-14">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  id="input-text"
                  placeholder="Enter your name"
                  {...register("name", { maxLength: 20 })}
                />
                <p className="text-danger">{errors.name?.message}</p>

                <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                  Actual Price
                </Form.Label>
                <Form.Control
                  type="number"
                  id="input-text"
                  placeholder="Enter your price"
                  {...register("price", {
                    minLength: 0,
                    maxLength: 10,
                  })}
                />
                <p className="text-danger">{errors.price?.message}</p>

                <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                  Original Price
                </Form.Label>
                <Form.Control
                  type="number"
                  id="input-text"
                  placeholder="Enter your original price"
                  {...register("originalPrice", {
                    minLength: 0,
                    maxLength: 10,
                  })}
                />
                <p className="text-danger">{errors.originalPrice?.message}</p>

                <Form.Label htmlFor="input-text" className="mt-2 fs-14">
                  Product Link
                </Form.Label>
                <Form.Control
                  type="text"
                  id="input-text"
                  placeholder="Enter the product link"
                  {...register("link", {
                    maxLength: 30,
                  })}
                />
                <p className="text-danger">{errors.link?.message}</p>
              </Card.Body>
            </Card>
          </Col>
        </Card.Body>
      </form>

      {show && (
        <ToastContainer className="toast-container position-fixed top-0 end-0 me-4 mt-4">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={1000}
            autohide
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
                ? "Fields are updated sucessfully!!"
                : "Please fill required fields"}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}

      {update && (
        <ToastContainer className="toast-container position-fixed top-0 end-0 me-4 mt-4">
          <Toast
            onClose={() => setUpdate(false)}
            show={update}
            delay={1000}
            autohide
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
                ? "Position Updated Sucessfully!!"
                : "Please fill required fields"}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Fragment>
  );
};

export default Orders;
