import React, { useEffect, useState } from "react";
import "./App.scss";
import HomePage from "./pages/home/HomePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import Settings from "./pages/settings/Settings";
import DeviceSelectPage from "./pages/deviceSelect/DeviceSelectPage";
import Workspace from "./pages/workspace/Workspace";
import WaitingPage from "./pages/waitingPage/WaitingPage";
import ErrorPage from "./pages/error/ErrorPage";
import Menu from "./components/menu/Menu";
import ConnectionSettings from "./components/ConnectionSettings/ConnectionSettings";
import ParamsSettings from "./components/ParamsSettings/ParamsSettings";
import SettingsProvider, { useSettings } from "./contexts/SettingsContext";
import NewDeviceParamTable from "./components/workspaceUI/ParamsTable/ParamTableTypes/NewDeviceParamTable";
import SavedDeviceParamTable from "./components/workspaceUI/ParamsTable/ParamTableTypes/SavedDeviceParamTable";

const App = () => {

    const appSettings = useSettings();
    const navigate = useNavigate();


    useEffect(() => {
        const { settings } =  appSettings;
        document.body.style.fontSize = `${settings.FontSize}px`;
    }, [appSettings]);

    useEffect(() => {
        // navigate('/');
    }, [])

    return (
        <div>
            <Menu />
            <div className="content">
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='workspace' element={<Workspace />}>
                        <Route path="new" element={<NewDeviceParamTable />} />
                        <Route path="saved" element={<SavedDeviceParamTable />} />
                    </Route>
                    {/* <Route path='waitingDownload' element={<WaitingPage />} />
                    <Route path='waitingUpload' element={<WaitingPage />} />
                    <Route path='error' element={<ErrorPage />} /> */}
                </Routes>
            </div>
        </div>
    );
};



export default App;
