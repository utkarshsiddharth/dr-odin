import { FC, Fragment } from "react";
import { Card, Col, Form,} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
interface OrdersProps {}

const schema = yup
  .object({
    moddleNo: yup.string().required(),
    name: yup.string().required(),
    heading: yup.string().required(),
    price: yup.string().required(),
    originalPrice: yup.string().required(),
    image: yup.string().required(),
  })
  .required();
const Orders: FC<OrdersProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => console.log(data);

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
                <h1 className="fs-6 fw-bold">Edit your Content</h1>
              </div>
              <div className="col-sm-auto">
                <div className="d-flex flex-sm-row">
                <button
                    className="btn btn-primary btn-sm text-nowrap mt-2"
                    type="submit"
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card.Body>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form.Label htmlFor="input-file">Image Upload</Form.Label>
                <Form.Control
                  type="file"
                  id="input-file"
                  accept="image/jpeg ,image/png"
                  {...register("image", { required: true })}
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
                <p className="text-danger ">{errors.originalPrice?.message}</p>
                {/* <Form.Label htmlFor="input-text " className="mt-2 fs-14">
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
                  <p className="text-danger ">{errors.productLink?.message}</p> */}
              </Card.Body>
            </Card>
          </Col>
        </Card.Body>
      </form>
    </Fragment>
  );
};

export default Orders;
