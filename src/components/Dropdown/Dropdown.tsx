import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "../../contexts/Language";
import type { LanguageData } from "../../data/dropdownData";
import { languageData } from "../../data/dropdownData";
import styles from "./Dropdown.module.css";

interface DropdownProps {
	handleClickSwitcher: (value?: boolean) => void;
}

export const Dropdown = ({ handleClickSwitcher }: DropdownProps) => {
	const { setLanguage, language } = useLanguage();
	const [finalFlags, setFinalFlags] = useState(languageData);

	const updateFlagsData = useCallback(
		(arr: Array<LanguageData>, a: number, b: number) => {
			[arr[a], arr[b]] = [arr[b], arr[a]];
			setFinalFlags([...arr]);
		},
		[],
	);

	useEffect(() => {
		const newIndex = languageData.findIndex(
			(item) => item.language === language.language,
		);
		updateFlagsData(finalFlags, 0, newIndex);
	}, [finalFlags, language, updateFlagsData]);

	const handleClick = (data: LanguageData) => {
		setLanguage(data);
		handleClickSwitcher();
	};

	return (
		<div className={styles.dropdownContainer}>
			<div className={styles.dropdownContent}>
				{finalFlags.map((flag, i) => (
					<button
						className={`${styles.styledButton} dropdown-button`}
						key={`flag-${flag.language}-${i}`}
						onClick={() => handleClick(flag)}
						type="button"
					>
						<img src={flag.flag} alt="language" />
					</button>
				))}
			</div>
		</div>
	);
};
