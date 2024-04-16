using HelloPhotino.React;
using Logika.Comms.Connections;
using Logika.Comms.Protocols;
using Logika.Meters;
using System.Data;
using Configurator.API;
using System.util;
using HelloPhotino.React.Properties;

namespace Photino.HelloPhotino.React
{
    public class ConfiguratorInstance
    {
        public Protocol savedProtocol;
        public Connection connection;
        public ConnectionBusType connectionBus;
        public BaudRate baudrate;
        public int timeout;

        private readonly CurrentDevice currentDevice;

        public ConfiguratorInstance(CurrentDevice device)
        {
            currentDevice = device;
            ConfigurateConnection();
        }

#if DEBUG
        private readonly Meter[] supportedMeters = Meter.SupportedMeters.ToArray();
#else
        private readonly Meter[] supportedMeters = Meter.SupportedMeters.Where(x=>!x.Outdated).ToArray();
#endif


        public string fileName;

        private ConfiguratorAPI api = new ConfiguratorAPI();

        public void ConfigurateConnection()
        {

            string connectionType = (string)Settings.Default["SavedConnType"];
            int connectionTimeoutInMilliseconds = (int)Settings.Default["SavedTimeout"] * 1000;
            if (connectionType == "COM")
            {
                connection = new SerialPortConnection(connectionTimeoutInMilliseconds, (string)Settings.Default["SavedComPortName"], (BaudRate)Settings.Default["SavedBaud"], (int)Settings.Default["SavedStopBits"] == 1 ? StopBits.One : StopBits.Two);
            } 
            else if (connectionType == "MODEM")
            {
                connection = new ModemConnection(connectionTimeoutInMilliseconds, (string)Settings.Default["SavedModemName"], (string)Settings.Default["SavedModemPhone"]); 
            }
            else if (connectionType == "TCP")
            {
                connection = new TCPConnection(connectionTimeoutInMilliseconds, (string)Settings.Default["SavedNetworkAddr"], Convert.ToUInt16((int)Settings.Default["SavedNetworkPort"]));
            }
            else if (connectionType == "UDP")
            {
                connection = new UDPConnection(connectionTimeoutInMilliseconds, (string)Settings.Default["SavedNetworkAddr"], Convert.ToUInt16((int)Settings.Default["SavedNetworkPort"]));
            }


            connectionBus = (ConnectionBusType)Settings.Default["SavedProtocolIndex"];

            timeout = connectionTimeoutInMilliseconds;
            baudrate = (BaudRate)Settings.Default["SavedBaud"];

        }

        private async Task<(Protocol, string, Meter)> TryConnnection(bool transitional, int? own, int? dev, CancellationToken ct, BaudRate baud)
        {

            var met = await Task.Run(() => api.DetectMeter(connection, connectionBus, baud, transitional, own, dev));
            if (met == null)
                throw new Exception("Нет ответа прибора");


            ct.ThrowIfCancellationRequested();

            if (!supportedMeters.Contains(met))
                throw new Exception(met + " не поддерживается.");

            Protocol protocol = null;
            string ID = null;
            string ser = null;
            Meter m = null;

            ConnectionData cd = await Task.Run(() => {
                return api.AttachToMeter(met, connection, transitional, own, dev);
            });

            ct.ThrowIfCancellationRequested();

            protocol = cd.protocol;
            m = cd.meter;
            ID = cd.Id;
            ser = cd.SerialNumber;

            if (protocol == null && ID == null)
            {
                throw new Exception("Нет ответа прибора!");
            }
            if (!supportedMeters.Contains(m))
                throw new Exception(m + " не поддерживается.");

            ct.ThrowIfCancellationRequested();

            return (protocol, ID, m);
        }
        
        public async Task OnConnect(Meter m)
        {
            try
            {
                if (connection == null)
                    throw new Exception("Нет настроек подключения!");

                if (m != currentDevice.meter || currentDevice.meter == null)
                { //подключен прибор, отличный от того, для которого открыта БД или БД не открыта
                    currentDevice.meter = m;
                    currentDevice.tags = api.GetDataTagsFromMeter(m);
                    fileName = null;
                    currentDevice.MeterID = "";
                }
            }
            catch (Exception ex)
            {
                //gph.OnShowErrorMessage(BeautifyErrorMessages(ex));
            }
            finally
            {
                //gph.SetEnablingAllControls(true);
            }
        }

        public void OnDisconnect()
        {
            connection.Close();
        }


        const string emptyDbMessage = "В базе данных нет введенных параметров.";

        public async Task OnReadDbFromDevice(bool autosave, bool autonaming, string directory, CancellationToken token, bool keepAlive, bool transitional, int? own, int? dev)
        {
            ConfigurateConnection();
            await OnReadTag(false, autosave, autonaming, directory, null, token, keepAlive, transitional, own, dev);
        }
        
        public async Task OnReadTag(bool selectedTagsRead, bool autosave, bool autonaming, string directory, DataTag[] t, CancellationToken token, bool keepAlive, bool transitional, int? own, int? dev)
        {
            await StartAction(t, transitional, transitional ? own : null, transitional ? dev : null, token, keepAlive, async (protocol, id, m, tgs) => {
                if (m != currentDevice.meter && selectedTagsRead)
                    throw new Exception("Неверный прибор для считывания данных!");


                await OnConnect(m);

                if (t == null)
                {
                    t = api.GetDataTagsFromMeter(m);
                }

                //gph.SetProgressTitle("Чтение параметров с " + meter + " [" + id + "]");

                List<DataTag> updatedTags = new List<DataTag>();
                //int[] indexes = t.Select(x => gph.GetTableRowIndex(meter, x) - 1).ToArray();


                int c = 0;

                var errTags = new List<DataTag>();

                bool stopped = false;

                await Task.Factory.StartNew(() => {
                    int chunkSize = 8;

                    var ts = t.Select((x, i) => (x, i)).ToList();
                    var cnt = ts.Count();

                    for (int i = 0; i < cnt; i += chunkSize)
                    {
                        if (token.IsCancellationRequested)
                        {
                            stopped = true;
                            return;
                        }

                        var refreshTags = ts.Take(chunkSize).Select(a => a.x).ToArray();
                        try
                        {
                            Retry.Do(() => api.RefreshTags(protocol, currentDevice.meter, refreshTags, false, transitional, transitional ? own : null, transitional ? dev : null));
                            updatedTags.AddRange(refreshTags);
                        }
                        catch (Exception ex)
                        {
                            if (ex.InnerException.Message.Contains("разорвано"))
                                throw new Exception(ex.InnerException.Message);
                            else
                                throw ex;
                        }

                        //for (int ind = 0; ind < refreshTags.Length; ind++)
                        //{
                            //gph.SetTableValue(meter, refreshTags[ind], false);
                            //int indexTable = gph.GetTableRowIndex(meter, refreshTags[ind]) - 1;
                            //tags[indexTable].Value = refreshTags[ind].Value;
                            //if (meter is Logika6)
                            //    tags[indexTable].EU = refreshTags[ind].EU;
                        //}

                        c = Math.Min(c + chunkSize, cnt);
                        //gph.SetProgressBarValue(c, t.Length);
                        ts = ts.Skip(chunkSize).ToList();
                    }
                }, TaskCreationOptions.LongRunning);

                string[] sysInfo = null;

                try
                {
                    sysInfo = api.GetDeviceVersion(currentDevice.meter, protocol, currentDevice.MeterID, transitional, transitional ? own : null, transitional ? dev : null);
                }
                catch
                {

                }

                //if (sysInfo == null)
                //    gph.SetTitle(meter, id, null, null);
                //else if (sysInfo.Length < 2)
                //    gph.SetTitle(meter, id, null, null);
                //else if (sysInfo != null)
                //{
                //    if (sysInfo.Length >= 2)
                //    {
                //        gph.SetTitle(meter, id, sysInfo[0], sysInfo[1]);
                //    }
                //}



                currentDevice.MeterID = id;

                if (!stopped)
                {


                    //gph.MarkErrorTags(meter, errTags.ToArray(), t);


                    //if (autosave)
                    //{
                    //    if (autonaming)
                    //    {
                    //        string fullDir = directory + @"\" + meter + "_" + MeterID + ".xdb";
                    //        fileName = fullDir.Replace("/", " ");
                    //        gph.SetFileName(fileName);
                    //        OnSaveFile();
                    //        gph.OnShowMessage("Файл " + fileName + " сохранён!");
                    //    }
                    //    else
                    //    {
                    //        OnSaveAsFile();
                    //    }
                    //}
                }
            });
        }

        public DataTag OnGetTag(int n)
        {
            return currentDevice.tags[n];
        }

        private async Task StartAction(DataTag[] tgs, bool transitional, int? own, int? dev, CancellationToken token, bool keepAlive, Func<Protocol, string, Meter, DataTag[], Task> processCommand)
        {
            try
            {
                DeinitKeepaliveTimer();

                //gph.ClearDateTime();

                if (connection == null)
                    throw new Exception("Нет настроек подключения!");

                //gph.StartProgress("Подключение к прибору");
                //gph.SetEnablingAllControls(false);

                if (connection.State == Logika.Comms.Connections.ConnectionState.NotConnected)
                {
                    try
                    {
                        await Task.Factory.StartNew(() => connection.Open());
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
                }


                (Protocol protocol, string mId, Meter m) = await TryConnnection(transitional, own, dev, token, baudrate);
                savedProtocol = protocol;

                await processCommand(protocol, mId, m, tgs);
            }
            catch (OperationCanceledException ex)
            {

            }
            catch (Exception ex)
            {
                //gph.OnShowErrorMessage(BeautifyErrorMessages(ex));
            }
            finally
            {
                //gph.HighlightErrorsAndModifications();
                //gph.SetEnablingAllControls(true);

                //gph.EndProgress();
                if (connection != null && keepAlive == false)
                    connection.Close();

                //if (currentDevice.tags == null && currentDevice.meter == null)
                //    gph.BlockButtons();

                //OnUpdateEus();

                //gph.DisableUnserviced();

                if (keepaliveTimer == null && keepAlive)
                {
                    InitKeepaliveTimer(transitional, transitional ? own : null, transitional ? dev : null);
                }
            }
        }

        public async void GetDeviceInfo(bool transitional, int? own, int? dev, CancellationToken token, bool keepalive)
        {
            await StartAction(currentDevice.tags, transitional, transitional ? own : null, transitional ? dev : null, token, keepalive, async (protocol, id, met, _) => {
                if (met != currentDevice.meter)
                    throw new Exception("Неверный прибор для считывания данных!");

                currentDevice.MeterID = id;

                string info = api.GetDeviceInfo(currentDevice.meter, protocol, currentDevice.MeterID, transitional, transitional ? own : null, transitional ? dev : null);

                //gph.OnShowMessage(info);
            });
        }


        private string BeautifyErrorMessages(Exception ex)
        {
            if (ex.Message.Contains("andle"))
                return "Соединение было сброшено.";

            return ex.Message;
        }

        #region TimerTimeRead

        System.Threading.Timer keepaliveTimer;

        public void InitKeepaliveTimer(bool transitional, int? own, int? dev)
        {
            keepaliveTimer = new System.Threading.Timer(new TimerCallback((obj) => {
                try
                {
                    if (connection.State == Logika.Comms.Connections.ConnectionState.Connected)
                    {
                        var info = savedProtocol.GetDeviceClock(currentDevice.meter, (byte?)(transitional ? own : null), (byte?)(transitional ? dev : null));
                        //gph.ShowDateTime(info);
                    }
                }
                catch
                {

                }
            }), this, 1000, 1000);
        }

        public void DeinitKeepaliveTimer()
        {
            if (keepaliveTimer != null)
                keepaliveTimer.Dispose();
            keepaliveTimer = null;
        }

        #endregion
    }
}
