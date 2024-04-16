import React, { useEffect, useState } from 'react'
import ToolMenuButton from '../ToolMenuButton/ToolMenuButton'
import zoomIn from './../../../../assets/images/zoom_in.svg';
import zoomOut from './../../../../assets/images/zoom_out.svg';
import { FONT_SIZE_CHANGE_STEP, MAX_FONT_SIZE, MIN_FONT_SIZE } from '../../../../constants/Settings';
import { useSettings } from '../../../../contexts/SettingsContext';

const ZoomButtons = () => {

    const [isShown, setIsShown] = useState(false);
    const { settings, saveSettings } = useSettings();

    useEffect(() => {
        setIsShown(settings.SavedShowZoomButtons);
    }, [settings]);

	const onIncreaseFontSize = () => {
		const currentFontSize = settings.FontSize;
		if(currentFontSize + FONT_SIZE_CHANGE_STEP <= MAX_FONT_SIZE) {
			saveSettings({
				...settings,
				FontSize: settings.FontSize + FONT_SIZE_CHANGE_STEP
			})
		} 
	}

	const onDecreaseFontSize = () => {
		const currentFontSize = settings.FontSize;
		if(currentFontSize - FONT_SIZE_CHANGE_STEP >= MIN_FONT_SIZE) {
			saveSettings({
				...settings,
				FontSize: settings.FontSize - FONT_SIZE_CHANGE_STEP
			})
		} 
	}

    if(!isShown) return null;

    return (
        <>
            <ToolMenuButton imageURL={zoomIn} onClick={onIncreaseFontSize} />
			<ToolMenuButton imageURL={zoomOut} onClick={onDecreaseFontSize} />
        </>
    )
}

export default ZoomButtons