import React from "react";
import Icon from "../../../icon/Icon";
import disabled_right_arrow from '../../assets/images/arrow_right_disabled.svg';
import right_arrow from '../../assets/images/arrow_right.svg';
import new_file_image from '../../assets/images/new_file.svg';
import IconButton from "../../../IconButton/IconButton";

const FileObserverActions = () => {

    const styleToRotateIconBy180Degrees: React.CSSProperties = { "transform": "rotate(180deg)" };

    const goForwardIcon = (disabled: boolean) => !disabled 
    ? <Icon url={right_arrow} /> 
    : <Icon url={disabled_right_arrow} />;

    const goBackIcon = (disabled: boolean) => !disabled 
    ? <Icon style={styleToRotateIconBy180Degrees} url={right_arrow} /> 
    : <Icon style={styleToRotateIconBy180Degrees} url={disabled_right_arrow} />;

    const backForwardButtonsSize: React.CSSProperties = {
        "width": "35px",
        "height": "35px"
    };

	return (
		<div className="backForwardButtons">
			{/* <IconButton
				disabled={previousPaths.current.length === 0}
				renderIcon={goBackIcon}
				style={backForwardButtonsSize}
				onClick={onGoBackButtonClicked}
			/>
			<IconButton
				disabled={followingPaths.current.length === 0}
				renderIcon={goForwardIcon}
				style={backForwardButtonsSize}
				onClick={onGoForwardButtonClicked}
			/>
			{fileObserverType === FileObserverType.SAVE_AS_FILE ? (
				<IconButton renderIcon={() => <Icon url={new_file_image} />} />
			) : null} */}
		</div>
	);
};

export default FileObserverActions;
