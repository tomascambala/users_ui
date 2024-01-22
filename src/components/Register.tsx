import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext, } from "formik";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import DeleteModal from "./DeleleModal";
import { register, updateUser, logout } from "../services/user.service";
import { Button } from "react-bootstrap";

interface RegisterProps {
  account?: Account | null;
}

interface Account {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  town: string;
  postalCode: string;
  streetName: string;
  houseNumber: string;
  password?: string;
}

interface AccountWithPassword extends Omit<Account, 'id'> {
  password: string;
}

const Register: React.FC<RegisterProps> = (props) => {
  const navigate: NavigateFunction = useNavigate();
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const AutoSubmitToken = () => {
    const { values, dirty } = useFormikContext();
    React.useEffect(() => {
      setIsDirty(dirty)

    }, [values, dirty]);
    return null;
  };

  const initialValues = {
    email: props?.account?.email || "",
    password: "",
    firstName: props?.account?.firstName || "",
    lastName: props?.account?.lastName || "",
    phoneNumber: props?.account?.phoneNumber || "",
    country: props?.account?.country || "",
    town: props?.account?.town || "",
    postalCode: props?.account?.postalCode || "",
    streetName: props?.account?.streetName || "",
    houseNumber: props?.account?.houseNumber || ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    firstName: Yup.string()
      .required("This field is required!"),
    lastName: Yup.string()
      .required("This field is required!"),
    phoneNumber: Yup.string()
      .required("This field is required!"),
    country: Yup.string()
      .required("This field is required!"),
    town: Yup.string()
      .required("This field is required!"),
    postalCode: Yup.string()
      .required("This field is required!"),
    streetName: Yup.string()
      .required("This field is required!"),
    houseNumber: Yup.string()
      .required("This field is required!"),
    password: !props?.account ? (Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!")) : Yup.mixed()
  });

  const HandleRegister = (formValue: AccountWithPassword) => {
    const { email, password, firstName, lastName, phoneNumber, country, town, postalCode, streetName, houseNumber } = formValue;

    if (props?.account) {
      return updateUser(props.account.id, firstName, lastName, phoneNumber, country, town, postalCode, streetName, houseNumber).then(
        (response) => {
          setMessage("Succesfully updated");
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }

    register(email, password, firstName, lastName, phoneNumber, country, town, postalCode, streetName, houseNumber).then(

      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        navigate('/login')
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );

  };

  return (
    <div className="col-md-12">
      <div className="center-container">
        {props?.account &&
          <div className="btn-container">
            <DeleteModal id={props?.account?.id} />
            <div className="space-left"><Button onClick={() => logout()}>Log out</Button></div >
          </div>
        }
      </div>

      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={HandleRegister}
        >

          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name="email" type="email" className="form-control" disabled={props?.account} />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                {
                  !props?.account &&
                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                }

                <div className="form-group">
                  <label htmlFor="firstName"> First name </label>
                  <Field name="firstName" type="text" className="form-control" />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName"> Last name </label>
                  <Field name="lastName" type="text" className="form-control" />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber"> Phone number </label>
                  <Field name="phoneNumber" type="text" className="form-control" />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country"> Country </label>
                  <Field name="country" type="text" className="form-control" />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="town"> Town </label>
                  <Field name="town" type="text" className="form-control" />
                  <ErrorMessage
                    name="town"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="postalCode"> Postal code </label>
                  <Field name="postalCode" type="text" className="form-control" />
                  <ErrorMessage
                    name="postalCode"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="streetName"> Street name </label>
                  <Field name="streetName" type="text" className="form-control" />
                  <ErrorMessage
                    name="streetName"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="houseNumber"> House number </label>
                  <Field name="houseNumber" type="text" className="form-control" />
                  <ErrorMessage
                    name="houseNumber"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group space-btn">
                  <button type="submit" disabled={!isDirty} className="btn btn-primary btn-block">{!props?.account ? "Register" : "Save"}</button>
                </div>
              </div>
            )}

            <AutoSubmitToken />

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>

        {props?.account && successful &&
          <div className="form-group space-btn center-container">
            <button onClick={() => window.location.reload()} className="btn btn-link" >
              <span>Edit your account again</span>
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Register;
