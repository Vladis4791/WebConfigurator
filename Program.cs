using PhotinoNET;
using PhotinoNET.Server;
using HelloPhotino.CustomServer;


namespace Photino.HelloPhotino.React;


class Program
{


    [STAThread]
    static void Main(string[] args)
    {

        Server server = new Server();

        PhotinoServer
            .CreateStaticFileServer(args, out string baseUrl)
            .RunAsync();

        string path = "/";
        string fullPath = Path.GetFullPath(path);


        //Process.Start("explorer.exe", fullPath);

        //ReactiveCommand<string, Unit> RevealInFolderCommand = ReactiveCommand.CreateFromTask<string>(async path =>
        //{

           
        //    if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        //    {

        //        //using Process fileOpener = new Process();
        //        //fileOpener.StartInfo.FileName = "explorer";
        //        //fileOpener.StartInfo.Arguments = "/select," + path + "\"";
        //        //fileOpener.Start();
        //        //await fileOpener.WaitForExitAsync();
        //        //return;
        //    }
        //    if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
        //    {
        //        using Process fileOpener = new Process();
        //        fileOpener.StartInfo.FileName = "explorer";
        //        fileOpener.StartInfo.Arguments = "-R " + path;
        //        fileOpener.Start();
        //        await fileOpener.WaitForExitAsync();
        //        return;
        //    }
        //    if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
        //    {
        //        using Process dbusShowItemsProcess = new Process
        //        {
        //            StartInfo = new ProcessStartInfo
        //            {
        //                FileName = "dbus-send",
        //                Arguments = "--print-reply --dest=org.freedesktop.FileManager1 /org/freedesktop/FileManager1 org.freedesktop.FileManager1.ShowItems array:string:\"file://" + path + "\" string:\"\"",
        //                UseShellExecute = true
        //            }
        //        };
        //        dbusShowItemsProcess.Start();
        //        await dbusShowItemsProcess.WaitForExitAsync();

        //        if (dbusShowItemsProcess.ExitCode == 0)
        //        {
        //            // The dbus invocation can fail for a variety of reasons:
        //            // - dbus is not available
        //            // - no programs implement the service,
        //            // - ...
        //            return;
        //        }
        //    }

        //    using Process folderOpener = new Process();
        //    folderOpener.StartInfo.FileName = Path.GetDirectoryName(path);
        //    folderOpener.StartInfo.UseShellExecute = true;
        //    folderOpener.Start();
        //    await folderOpener.WaitForExitAsync();
        //});

        //RevealInFolderCommand.Execute(fullPath).Subscribe();

        string windowTitle = "Photino.React Demo App";

        var window = new PhotinoWindow()
            .SetTitle(windowTitle)
            .Center()
            .SetResizable(true)
            .RegisterWebMessageReceivedHandler((object sender, string request) =>
            {
                var window = (PhotinoWindow)sender;
                 
                server.handleRequest(window, request);
                
            })
            .Load("http://localhost:3000/");
            //.Load($"{baseUrl}/index.html");


        window.WaitForClose();
    }
}