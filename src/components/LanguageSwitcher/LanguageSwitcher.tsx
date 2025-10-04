import { useState } from "react";
import { useLanguage } from "../../contexts/Language";
import { CheckClickOutside } from "../../utils/ClickOutside";
import { Dropdown } from "../Dropdown/Dropdown";
import styles from "./LanguageSwitcher.module.css";

export const LanguageSwitcher = () => {
	const { language } = useLanguage();
	var isMobile = navigator.userAgent.match(
		/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i,
	);

	const [toggleDropdown, setToggleDropdown] = useState(false);

	const handleClickSwitcher = () => {
		setToggleDropdown((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			{!toggleDropdown && (
				<button
					type="button"
					className={styles.button}
					onMouseEnter={() => !isMobile && handleClickSwitcher()}
					onClick={() => handleClickSwitcher()}
				>
					<img src={language.flag} alt="language" />
				</button>
			)}
			{toggleDropdown && (
				<CheckClickOutside onClickOutside={() => handleClickSwitcher()}>
					<Dropdown handleClickSwitcher={handleClickSwitcher} />
				</CheckClickOutside>
			)}
		</div>
	);
};
