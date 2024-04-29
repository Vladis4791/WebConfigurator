using HelloPhotino.CustomServer;
using System.Runtime.InteropServices;
using System.IO;

namespace HelloPhotino.React
{
    public class FileSystem
    {
        public DirectoryEntries GetDirectoryEntriesByDirPath(string dirPath)
        {
            string[] filesNames = Directory.EnumerateFiles(dirPath, "*.xdb", new EnumerationOptions
            {
                IgnoreInaccessible = false,
                RecurseSubdirectories = false
            }).Select((string filePath) => Path.GetFileName(filePath)).ToArray();
            string[] subdirectoriesNames = Directory.EnumerateDirectories(dirPath, "*", new EnumerationOptions
            {
                IgnoreInaccessible = false,
                RecurseSubdirectories = false
            }).Select((string subdirectoryPath) => Path.GetFileName(subdirectoryPath)).ToArray();

            return new DirectoryEntries(filesNames, subdirectoriesNames);
        }
    
        public List<string> GetRootDirectoriesNames()
        {

            List<string> rootDirectoriesNames = new();

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                rootDirectoriesNames = DriveInfo.GetDrives().Select(drive => drive.Name).ToList();
            }
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                rootDirectoriesNames.Add("/");
            }

            return rootDirectoriesNames;
        }
    
        public void CreateNewFile(string path)
        {
            File.Create(path).Dispose();
        }
    }
}
