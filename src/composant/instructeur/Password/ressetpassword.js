import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Apinner from "../../Participants/Password/spinner";
import Alert from "../../Participants/Password/alert";
import { MDBCol } from "mdbreact";
import "../../../css/ResetPasswordPage.css"; // Importez votre fichier CSS ici
import { useHistory } from 'react-router-dom';

const initialValues = {
    email: "",
    resetCode: "",
    newPass: "",
    confirmPass: "",
};

const validationSchemaStep1 = Yup.object().shape({
    email: Yup.string().email("Adresse e-mail invalide").required("L'adresse e-mail est requise"),
});

const validationSchemaStep2 = Yup.object().shape({
    resetCode: Yup.string().required("Code de réinitialisation requis"),
    newPass: Yup.string().required("Le nouveau mot de passe est requis"),
    confirmPass: Yup.string()
        .oneOf([Yup.ref("newPass")], "Les mots de passe ne correspondent pas")
        .required("La confirmation du mot de passe est requise"),
});

export default function FormPasswordResetI() {
    const [currentStep, setCurrentStep] = useState(1);
    const [passChangeSuccess, setPassChangeSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [alertDisplayed, setAlertDisplayed] = useState(false);
    const [email, setEmail] = useState("");
    const [step2Errors, setStep2Errors] = useState({}); // État pour les erreurs de la deuxième étape
    const history = useHistory();

    const handleEmailSubmit = async (values, { setSubmitting }) => {
        setIsProcessing(true);
        try {
            // Envoi de l'e-mail pour réinitialiser le mot de passe
            const responseRequest = await fetch(
                "http://localhost:3000/instructeur/resetPasswordRequest",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: values.email }),
                }
            );
            const dataRequest = await responseRequest.json();
            console.log(dataRequest);

            if (dataRequest.message === "Un e-mail de réinitialisation de mot de passe a été envoyé.") {
                setEmail(values.email);
                setCurrentStep(2);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail:", error);
        }
        setIsProcessing(false);
    };

    const handlePasswordSubmit = async (values, { setSubmitting }) => {
        setIsProcessing(true);
        try {
            // Réinitialisation du mot de passe
            const responseResetPassword = await fetch(
                "http://localhost:3000/instructeur/resetPassword",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        resetCode: values.resetCode,
                        nouveauMotDePasse: values.newPass,
                    }),
                }
            );
            const dataResetPassword = await responseResetPassword.json();
            console.log(dataResetPassword);

            setPassChangeSuccess(true);
            setTimeout(() => {
                history.push("/login");
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de la réinitialisation du mot de passe:", error);
        }
        setIsProcessing(false);
    };

    return (
        <div className="App form-container">
            <div className="row">
                <div className="col-md-6">
                    <MDBCol col='10' md='6' className="form-image">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                    </MDBCol>
                </div>
                <div className="col-md-6">
                    <Paper className="form form--wrapper" elevation={10}>
                        {isProcessing && <Apinner />}
                        {passChangeSuccess ? (
                            <Alert
                                isOpen={passChangeSuccess}
                                handleClose={() => setPassChangeSuccess(false)}
                                title="Réinitialisation du mot de passe"
                                text="Votre mot de passe a été changé avec succès."
                                submitButtonText="OK"
                            />
                        ) : (
                            <Formik
                                initialValues={initialValues}
                                validationSchema={currentStep === 1 ? validationSchemaStep1 : validationSchemaStep2}
                                onSubmit={currentStep === 1 ? handleEmailSubmit : handlePasswordSubmit}
                            >
                                {({
                                    values,
                                    touched,
                                    errors,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    isValid,
                                }) => (
                                    <form className="form" onSubmit={handleSubmit}>
                                        {currentStep === 1 ? (
                                            <FormControl fullWidth margin="dense">
                                                <InputLabel htmlFor="email">Adresse e-mail</InputLabel>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.email && Boolean(errors.email)}
                                                    className="form-input"
                                                />
                                                <FormHelperText error={Boolean(touched.email && errors.email)}>
                                                    {touched.email && errors.email ? errors.email : ""}
                                                </FormHelperText>
                                            </FormControl>
                                        ) : (
                                            <>
                                                <FormControl fullWidth margin="dense">
                                                    <InputLabel htmlFor="resetCode">Code de réinitialisation</InputLabel>
                                                    <Input
                                                        id="resetCode"
                                                        name="resetCode"
                                                        type="text"
                                                        value={values.resetCode}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.resetCode && Boolean(errors.resetCode)}
                                                        className="form-input"
                                                    />
                                                    <FormHelperText error={Boolean(touched.resetCode && errors.resetCode)}>
                                                        {touched.resetCode && errors.resetCode ? errors.resetCode : ""}
                                                    </FormHelperText>
                                                </FormControl>
                                                <FormControl fullWidth margin="dense">
                                                    <InputLabel htmlFor="newPass">Nouveau mot de passe</InputLabel>
                                                    <Input
                                                        id="newPass"
                                                        name="newPass"
                                                        type="password"
                                                        value={values.newPass}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.newPass && Boolean(errors.newPass)}
                                                        className="form-input"
                                                    />
                                                    <FormHelperText error={Boolean(touched.newPass && errors.newPass)}>
                                                        {touched.newPass && errors.newPass ? errors.newPass : ""}
                                                    </FormHelperText>
                                                </FormControl>
                                                <FormControl fullWidth margin="dense">
                                                    <InputLabel htmlFor="confirmPass">Confirmez le mot de passe</InputLabel>
                                                    <Input
                                                        id="confirmPass"
                                                        name="confirmPass"
                                                        type="password"
                                                        value={values.confirmPass}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={touched.confirmPass && Boolean(errors.confirmPass)}
                                                        className="form-input"
                                                    />
                                                    <FormHelperText error={Boolean(touched.confirmPass && errors.confirmPass)}>
                                                        {touched.confirmPass && errors.confirmPass ? errors.confirmPass : ""}
                                                    </FormHelperText>
                                                </FormControl>
                                            </>
                                        )}
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting || !isValid}
                                            className="form-button"
                                        >
                                            {currentStep === 1 ? "Suivant" : "OK"}
                                        </Button>
                                    </form>
                                )}
                            </Formik>
                        )}
                    </Paper>
                </div>
            </div>
        </div>
    );
}
