import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { FC, Fragment, useEffect, useState } from "react";
import { Card, Col, Form, Toast, ToastContainer } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
interface OrdersProps {
  id: string;
  onClose: () => void;
}
const schema = yup
  .object({
    image: yup.string().required(),
    moddleNo: yup.string().required(),
    name: yup.string().required(),
    heading: yup.string().required(),
    price: yup.number().required(),
    originalPrice: yup.number().required(),
    productLink: yup.string().required(),
  })
  .required();
const Orders: FC<OrdersProps> = () => {
  const [formData, setFormData] = useState<any>(null);
  const [show, setShow] = useState(false);
  const preset_key = "ngujniat";
  const cloud_name = "dgmpifw8b";
  const [image, setImage] = useState("");
  const { productId: id } = useParams();
  const token = localStorage.getItem("token");
  console.log(token);
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
      setValue("heading", formData?.heading);
      setValue("image", formData?.image);
      setValue("moddleNo", formData?.moddleNo);
      setValue("name", formData?.name);
      setValue("originalPrice", formData?.originalPrice);
      setValue("price", formData?.price);
      setValue("productLink", formData?.link);
    }
  }, [formData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://doctorodinbackend.onrender.com/product/${id}`,
          config
        );
        console.log("data", id);
        console.log(res);
        setFormData(res.data);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [id]);
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
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      heading: "",
      image: "",
      moddleNo: "",
      name: "",
      originalPrice: 0,
      price: 0,
      productLink: "",
    },
  });
  const handleCancel = () => {
    reset();
  };
  const onSubmit = async (data: any) => {
    data.image = image;
    try {
      await axios.put(
        `https://doctorodinbackend.onrender.com/product/${id}`,
        data,
        config
      );
      setShow(true);
      setTimeout(() => {
        routeChange();
      }, 1000);
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <Fragment>
      <Col>
        <Card.Header className="d-flex align-items-center justify-content-between flex-wrap gap-3  p-3"></Card.Header>
      </Col>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Col xl={12}>
          <Card className="custom-card">
            <Card.Body className="">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex flex-wrap gap-1">
                  <h1 className="fs-6 fw-bold">Edit your Content</h1>
                </div>
                <div className="col-sm-auto">
                  <div className="d-flex flex-sm-row">
                    <button
                      className="btn btn-primary btn-sm text-nowrap mt-2"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary btn-sm text-nowrap mt-2 ms-2"
                      type="submit"
                    >
                      Save Changes
                    </button>
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
                <Form.Label htmlFor="input-file" className="fs-14">
                  Image Upload
                </Form.Label>
                <Form.Control
                  type="file"
                  id="input-file"
                  accept="image/jpeg ,image/png"
                  required
                  // {...register("image",{required:true})}
                  onChange={handleFile}
                />
                {/* <p className="text-danger">{errors.image?.message}</p> */}

                <Form.Label htmlFor="input-text " className="mt-2 fs-14">
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
                  Heading
                </Form.Label>
                <Form.Control
                  type="text"
                  id="input-text"
                  placeholder="Enter your heading"
                  {...register("heading", { maxLength: 20 })}
                />
                <p className="text-danger">{errors.heading?.message}</p>

                <Form.Label htmlFor="input-text " className="mt-2 fs-14">
                  Price
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
                  {...register("productLink", {
                    maxLength: 30,
                  })}
                />
                <p className="text-danger">{errors.productLink?.message}</p>
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
            delay={2000}
            autohide
            bg="primary-transparent"
            className="toast colored-toast"
          >
            <Toast.Header className="toast-header bg-primary text-fixed-white mb-0">
              {/* <img
                className="bd-placeholder-img rounded me-2"
                src={favicon}
                alt="..."
              /> */}
              <strong className="me-auto">Dr.Odin</strong>
            </Toast.Header>
            <Toast.Body>
              {Object.keys(errors).length === 0
                ? "Fields are updated sucessfully!!"
                : "Please fill required fields"}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Fragment>
  );
};

export default Orders;
