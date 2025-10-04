import { useForm, ValidationError } from "@formspree/react";
import React, { useEffect, useId, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import { useLanguage } from "../../contexts/Language";
import { formData } from "../../data/formData";
import styles from "./Form.module.css";

export const Form = () => {
	const { translations } = useLanguage(formData);
	const [state, handleSubmit] = useForm("mgejjdoq");
	const [isHuman, setIsHuman] = useState(false);
	const [validEmail, setValidEmail] = useState(false);
	const [message, setMessage] = useState("");
	const emailId = useId();
	const messageId = useId();

	const verifyEmail = (email: string) => {
		if (validator.isEmail(email)) {
			setValidEmail(true);
		} else {
			setValidEmail(false);
		}
	};

	useEffect(() => {
		if (state.succeeded) {
			toast.success(`${translations?.toastSuccess}`, {
				position: toast.POSITION.BOTTOM_LEFT,
				pauseOnFocusLoss: false,
				closeOnClick: true,
				hideProgressBar: false,
				toastId: "succeeded",
			});
		}
	}, [translations?.toastSuccess, state]);

	const disabled = state.submitting || !validEmail || !message || !isHuman;

	if (state.succeeded) {
		return (
			<div className={styles.containerSuccess}>
				<h3>{translations?.success}</h3>
				<button
					type="button"
					className={styles.successButton}
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
				>
					{translations?.back}
				</button>
				<ToastContainer />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<input
					className={styles.input}
					placeholder={translations?.emailPlaceholder}
					id={emailId}
					type="email"
					name="email"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						verifyEmail(e.target.value);
					}}
					required
				/>
				<ValidationError prefix="Email" field="email" errors={state.errors} />
				<textarea
					className={styles.textarea}
					required
					placeholder={translations?.typePlaceholder}
					id={messageId}
					name="message"
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
						setMessage(e.target.value);
					}}
				/>
				<ValidationError
					prefix="Message"
					field="message"
					errors={state.errors}
				/>
				<div>
					{React.createElement(
						ReCAPTCHA as React.ComponentType<{
							sitekey: string;
							onChange: (token: string | null) => void;
						}>,
						{
							sitekey: "6Lf_2SIpAAAAAOJBFOnaBw9aaaGNJ5UbOGE9BTIu",
							onChange: (token: string | null) => {
								setIsHuman(!!token);
							},
						},
					)}
				</div>

				<button
					className={styles.submitButton}
					type="submit"
					disabled={disabled}
				>
					{translations?.send}
				</button>
			</form>
			<ToastContainer />
		</div>
	);
};
