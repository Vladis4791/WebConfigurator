using Configurator.API;
using HelloPhotino.CustomServer;
using Logika.Meters;


namespace HelloPhotino.React
{

    public class TagInfo
    {

        public TagInfo()
        {
            measurementUnits = "";
            isOperative = false;
            value = "";
        }

        public string measurementUnits { get; set; }
        public string value { get; set; }
        public bool isOperative { get; set; }
    }

    public class SaveDeviceParams
    {
        public TagInfo[]? TagsInfo { get; set; }
        public string? FileName { get; set; }
    }

    internal class DeviceAPI
    {

        private readonly ConfiguratorAPI api = new ConfiguratorAPI();
        private readonly Meter[] supportedMeters = Meter.SupportedMeters;
        private readonly AppSettings.AppSettings settings = new AppSettings.AppSettings();

        public CurrentDevice currentDevice { get; set; }

        public DeviceAPI(CurrentDevice currentDeviceInstance)
        {
            currentDevice = currentDeviceInstance;
        }

        public List<string> GetAllDevicesCaptions()
        {

            List<string> supportedMetersCaptions = new();

            supportedMetersCaptions = supportedMeters.Select(meter => meter.Caption).ToList();       

            return supportedMetersCaptions;

        }

        public WebDevice GetWebDeviceWithEmptyTagsByDeviceCaption(string deviceCaption)
        {
            ConfigurateCurrentDeviceWithDeviceInstanceReceivedByDeviceCaption(deviceCaption);



            WebDevice webDevice = new(deviceCaption, GetDeviceType(currentDevice.meter), GetChannelsWithEmptyTagsOfDevice(currentDevice.meter));

            return webDevice;

        }

        private string GetDeviceType(Meter device)
        {
            if(device is Logika4)
            {
                return "Logika4";
            }

            if(device is Logika6)
            {
                return "Logika6";
            }

            return "Logika";
        }

        private void ConfigurateCurrentDeviceWithDeviceInstanceReceivedByDeviceCaption(string deviceCaption)
        {
            Meter deviceInstance = GetDeviceByDeviceCaption(deviceCaption);

            currentDevice.meter = deviceInstance;
            currentDevice.tags = api.GetDataTagsFromMeter(deviceInstance);
            currentDevice.valuesOfTags = Array.Empty<string>();
            currentDevice.isOperativeOfTags = Array.Empty<bool>();
            currentDevice.measurementUnitsOfTags = Array.Empty<string>();
        }

        private List<WebChannel> GetChannelsWithEmptyTagsOfDevice(Meter device)
        {
            DataTag[] emptyTags = api.GetDataTagsFromMeter(device);

            List<WebChannel> channelsWithEmptyTags = WebParams.GetWebChannelsWithCorrespondingTagsAndTagGroups(emptyTags);

            return channelsWithEmptyTags;
        }

        private static Meter GetDeviceByDeviceCaption(string deviceCaption)
        {
            return Array.Find(Meter.SupportedMeters, (m) => m.Caption == deviceCaption);
        }

        public WebDevice GetWebDeviceFromFile(string filePath)
        {

            ConfigurateCurrentDeviceWithEmptyTagsFromDBFile(filePath);
            FillEmptyTagsOfCurrentDeviceWithValuesMeasurementUnitsAndOpers();

            List<WebChannel> channels = WebParams.GetWebChannelsWithCorrespondingTagsAndTagGroups(currentDevice.tags);

            WebDevice webDevice = new(currentDevice.meter.Caption, GetDeviceType(currentDevice.meter), channels);

            return webDevice;
        }

        private void ConfigurateCurrentDeviceWithEmptyTagsFromDBFile(string filePath)
        {
            Meter deviceInstance = api.GetMeterFromFile(filePath);
            DataTag[] emptyTags = api.GetDataTagsFromMeter(deviceInstance); // tags without values, isOperative and measurementUnits properties

            currentDevice.meter = deviceInstance;
            currentDevice.tags = emptyTags;

            (currentDevice.valuesOfTags, currentDevice.isOperativeOfTags, currentDevice.measurementUnitsOfTags) = api.ReadFile(currentDevice.meter, currentDevice.tags, filePath);    
        }

        private void FillEmptyTagsOfCurrentDeviceWithValuesMeasurementUnitsAndOpers()
        {
            string[] values = currentDevice.valuesOfTags;
            bool[] isOperative = currentDevice.isOperativeOfTags;
            string[] measurementUnits = currentDevice.measurementUnitsOfTags;

            for (int i = 0; i < values.Length; i++)
            {
                DataTag currentTag = currentDevice.tags[i];
                currentTag.Value = values[i];
                currentTag.EU = measurementUnits[i];
                currentTag.Oper = isOperative[i];
            }
        }

        public void SaveCurrentDeviceToFile(SaveDeviceParams saveDeviceParams)
        {

            TagInfo[] tagsInfo = saveDeviceParams.TagsInfo!;

            currentDevice.valuesOfTags = tagsInfo.Select(tagInfo => tagInfo.value).ToArray();

            currentDevice.isOperativeOfTags = tagsInfo.Select(tagInfo => tagInfo.isOperative).ToArray();
            currentDevice.measurementUnitsOfTags = tagsInfo.Select(tagInfo => tagInfo.measurementUnits).ToArray();

            api.SaveFile(
                currentDevice.meter, 
                currentDevice.valuesOfTags, 
                currentDevice.isOperativeOfTags, 
                currentDevice.measurementUnitsOfTags, 
                currentDevice.tags,
                string.Format("{0}/{1}.xdb", settings.GetSettings().SavedFolderPath, "db"),
                "", 
                "serialNumber", 
                "id"
           );
        }

    }
}
