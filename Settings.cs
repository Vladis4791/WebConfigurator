using Logika.Comms.Win;
using System.Management;

namespace HelloPhotino.React.AppSettings
{

    internal class AppSettings
    {

        public class ChangableSelectOptions
        {
            public ChangableSelectOptions(List<Modem> modems, ComPortRef[] comPorts) {
                Modems = modems;
                ComPorts = comPorts;
            }

            public List<Modem> Modems { get; }
            public ComPortRef[] ComPorts { get; }
        }

        public class ComPortRef
        {
            public string port;
            public string description;

            public ComPortRef(string portName, string portDesctiption)
            {
                port = portName;
                description = portDesctiption;
            }

            public override string ToString()
            {
                if (this == null) return "";
                return (port ?? "") + " (" + (description ?? "").Trim() + ")";
            }

        }

        ComPortRef[] portsData;
        List<Modem> modems;


        public Properties.Settings GetSettings()
        {
            return Properties.Settings.Default;
        }

        public ChangableSelectOptions GetChangableOptions()
        {
            modems = ModemManager.Instance.Modems.ToList();
            portsData = GetComPorts().OrderBy(x => int.Parse(x.port.Replace("COM", ""))).ToArray();

            return new ChangableSelectOptions(modems, portsData);
        }

        private static IEnumerable<ComPortRef> GetComPorts()
        {
            string[] portNames = System.IO.Ports.SerialPort.GetPortNames();
            if (portNames.Length == 0)
                yield break;
            Array.Sort(portNames, portNames.Select(x => x.Replace("COM", "")).Select(x => int.Parse(x)).ToArray());

            using (var searcher = new ManagementObjectSearcher("SELECT * FROM Win32_PnPEntity WHERE Caption like '%(COM%'"))
            {    //"SELECT  FROM WIN32_SerialPort"
                var ports = searcher.Get().Cast<ManagementBaseObject>().ToList().Select(p => p["Caption"].ToString());

                foreach (var p in portNames)
                {
                    string comParName = "(" + p + ")";
                    string portDesc = ports.FirstOrDefault(x => x.Contains(comParName));
                    if (portDesc != null && portDesc.EndsWith(comParName))
                        portDesc = portDesc.Substring(0, portDesc.Length - comParName.Length);

                    yield return new ComPortRef(p, portDesc);
                }
            }
        }



        public void SaveSettings(dynamic newSettings)
        {
            Properties.Settings.Default["SavedAutoSave"] = newSettings.SavedAutoSave.Value;
            Properties.Settings.Default["SavedGenerateFileName"] = newSettings.SavedGenerateFileName.Value;
            Properties.Settings.Default["SavedFolderPath"] = newSettings.SavedFolderPath.Value;
            Properties.Settings.Default["SavedPrintReadonly"] = newSettings.SavedPrintReadonly.Value;
            Properties.Settings.Default["SavedUseCurrentTime"] = newSettings.SavedUseCurrentTime.Value;
            Properties.Settings.Default["SavedPrintDescriptions"] = newSettings.SavedPrintDescriptions.Value;
            Properties.Settings.Default["SavedShowZoomButtons"] = newSettings.SavedShowZoomButtons.Value;
            Properties.Settings.Default["SavedKeepalive"] = newSettings.SavedKeepalive.Value;
            Properties.Settings.Default["SavedConnType"] = newSettings.SavedConnType.Value;
            
            if (newSettings.SavedComPortName.Value != "")
            {
                Properties.Settings.Default["SavedComPortName"] = newSettings.SavedComPortName.Value;
            }

            Properties.Settings.Default["SavedNetworkAddr"] = newSettings.SavedNetworkAddr.Value;
            Properties.Settings.Default["SavedNetworkPort"] = (int)newSettings.SavedNetworkPort.Value;
            Properties.Settings.Default["SavedModemPhone"] = newSettings.SavedModemPhone.Value;
            
            if (newSettings.SavedModemName.Value != "")
            {
                Properties.Settings.Default["SavedModemName"] = newSettings.SavedModemName.Value;
            }
                
            Properties.Settings.Default["SavedBaud"] = (int)newSettings.SavedBaud.Value;
            Properties.Settings.Default["SavedProtocolIndex"] = (int)newSettings.SavedProtocolIndex.Value;
            Properties.Settings.Default["SavedTimeout"] = (int)newSettings.SavedTimeout.Value;

            bool shouldDeviceAddressBeUsed = newSettings.SavedUseDeviceAddress.Value;
            Properties.Settings.Default["SavedUseDeviceAddress"] = shouldDeviceAddressBeUsed;
            
            if (shouldDeviceAddressBeUsed)
            {
                Properties.Settings.Default["SavedOwnAdr"] = newSettings.SavedOwnAdr.Value;
                Properties.Settings.Default["SavedDeviceAdr"] = newSettings.SavedDeviceAdr.Value;
            }
            else
            {
                Properties.Settings.Default["SavedOwnAdr"] = "Авто";
            }


            Properties.Settings.Default.Save();
        }
    }
}
