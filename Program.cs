using System.Text.Json;
﻿using System.Text;
using PhotinoNET;
using PhotinoNET.Server;
using HelloPhotino.CustomServer;
using Photino;

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