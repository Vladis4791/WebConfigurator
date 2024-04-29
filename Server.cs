using PhotinoNET;
using Logika.Meters;
using Configurator.API;
using Newtonsoft.Json;
using HelloPhotino.React.AppSettings;
using HelloPhotino.React;
using Newtonsoft.Json.Linq;
using System.util;
using HelloPhotino.React.Properties;
using System.Runtime.InteropServices;


namespace HelloPhotino.CustomServer
{

    public class DirectoryEntries
    {

        public DirectoryEntries(string[] filesNames,string[] subdirectoriesNames)
        {
            FilesNames = filesNames;
            SubdirectoriesNames = subdirectoriesNames;
        }

        public string[] FilesNames { get; }
        public string[] SubdirectoriesNames { get; }
    }

    public class RequestParams
    {

        public string Path { get; set; }
        public string RequestId { get; set; }
        public object Params { get; set; }
        public string Method { get; set; }
    }

    public class Response
    {

        public Response()
        {
            Path = "";
            RequestId = "";
            Data = "";
        }

        public string Path { get; set; }
        public string RequestId { get; set; }
        public object Data { get; set; }
    }

    internal class Server
    {
        
        static private CurrentDevice currentDevice = new CurrentDevice();
        static private DeviceAPI deviceAPI = new(currentDevice);
        static private AppSettings appSettings = new AppSettings();
        //static private Properties.Settings a = appSettings.GetSettings();
        static private Photino.HelloPhotino.React.ConfiguratorInstance ci = new Photino.HelloPhotino.React.ConfiguratorInstance(currentDevice);
        static private FileSystem fileSystem = new FileSystem();

        private static CancellationTokenSource cts;
        private static CancellationToken token;

        public void handleRequest(PhotinoWindow window, string request)
        {

            RequestParams requestParams = JsonConvert.DeserializeObject<RequestParams>(request);

            if (requestParams.Method == "GET")
            {
                handleGetRequest(window, requestParams);
            }

            if(requestParams.Method == "ACTION")
            {
                handleActionRequest(window, requestParams);
            }
            
        }

        private void handleGetRequest(PhotinoWindow window, RequestParams requestParams)
        {
            string path = requestParams.Path;

            Response response = new()
            {
                RequestId = requestParams.RequestId,
                Path = requestParams.Path,
            };

            switch (path)
            {
                case "/allDevicesCaptions":
                    response.Data = deviceAPI.GetAllDevicesCaptions();
                    break;
                case "/getNewDevice":
                    string deviceCaption = requestParams.Params.ToString()!;
                    response.Data = deviceAPI.GetWebDeviceWithEmptyTagsByDeviceCaption(deviceCaption);
                    break;
                case "/getDeviceFromFile":
                    string filePath = requestParams.Params.ToString()!;
                    response.Data = deviceAPI.GetWebDeviceFromFile(filePath);
                    break;
                case "/getSettings":
                    response.Data = appSettings.GetSettings();
                    break;
                case "/getDirectoryEntries":
                    string directoryPath = requestParams.Params.ToString()!;
                    response.Data = fileSystem.GetDirectoryEntriesByDirPath(directoryPath);
                    break;
                case "/readDataFromDevice":
                    GetDataFromDevice();
                    break;
                case "/rootDirectories":
                    response.Data = fileSystem.GetRootDirectoriesNames();

                    break;
                case "/getChangableSelectOptions":
                    response.Data = appSettings.GetChangableOptions();
                    break;
                default:
                    break;
            }

            string response_to_send = JsonConvert.SerializeObject(response);

            window.SendWebMessage(response_to_send);
        }

        private async void GetDataFromDevice()
        {
            token = ResetCancellationTokens();
            var (trans, own, dev) = GetTransitionalDeviceData();
            await ci.OnReadDbFromDevice((bool)Settings.Default["SavedAutoSave"], (bool)Settings.Default["SavedGenerateFileName"], Settings.Default["SavedFolderPath"].ToString(), token, (bool)Settings.Default["SavedKeepalive"], trans, own, dev);
        }

        private (bool, int?, int?) GetTransitionalDeviceData()
        {
            bool transitional = (bool)Settings.Default["SavedUseDeviceAddress"];
            int? own = null;
            int? dev = null;

            if (transitional)
            {
                if (int.TryParse(Settings.Default["SavedDeviceAdr"].ToString(), out int d))
                {
                    dev = d;
                }
                else
                {
                    dev = null; //null stands for Авто
                }

                if (int.TryParse(Settings.Default["SavedOwnAdr"].ToString(), out int o))
                {
                    own = o;
                }
                else
                {
                    if (dev != null)
                    {
                        own = 0x80 + dev;
                    }
                    else
                    {
                        own = null; //null stands for Авто
                    }
                }
            }

            return (transitional, own, dev);
        }


        public CancellationToken ResetCancellationTokens()
        {
            cts = new CancellationTokenSource();
            token = cts.Token;
            return token;
        }

        private void handleActionRequest(PhotinoWindow window, RequestParams requestParams)
        {
            string path = requestParams.Path;
            string actionParams = requestParams.Params.ToString();

            Response response = new()
            {
                RequestId = requestParams.RequestId,
                Path = requestParams.Path,
            };

            switch (path)
            {
                case "/saveSettings":
                    dynamic settings = JsonConvert.DeserializeObject(actionParams);
                    //React.Properties.Settings settings = JsonConvert.DeserializeObject<React.Properties.Settings>(actionParams);
                    object c = settings.SavedAutoSave.Value;
                    appSettings.SaveSettings(settings!);
                    break;
                case "/saveDevice":
                    SaveDeviceParams saveDeviceParams = JsonConvert.DeserializeObject<SaveDeviceParams>(actionParams);
                    deviceAPI.SaveCurrentDeviceToFile(saveDeviceParams!);
                    break;
                case "/printParams": 
                    object someParams = JsonConvert.DeserializeObject<SaveDeviceParams>(actionParams);  
                    break;
                case "/createNewFile":
                    string newFilePath = actionParams!;
                    fileSystem.CreateNewFile(newFilePath);
                    break;
                default:
                    break;
            }

            string response_to_send = JsonConvert.SerializeObject(response);

            window.SendWebMessage(response_to_send);
        }

    }
}
