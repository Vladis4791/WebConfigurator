using System.Diagnostics;
using FastReport;
using FastReport.Export.PdfSimple;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace HelloPhotino.React
{
    public partial class DataBasePrinter
    {

        const string PRINTFILENAME = "Отчет.pdf";

        public CurrentDevice currentDevice { get; set; }

        public DataBasePrinter(CurrentDevice device)
        {
            currentDevice = device;
        }

        public void CreateReport()
        {
            MemoryStream ms = new MemoryStream();
            //FileStream fs = new FileStream("Chapter1_Example1.pdf", FileMode.Create, FileAccess.Write, FileShare.None);
            Rectangle page = new Rectangle(PageSize.A4);
            Document doc = new Document(page, 36, 36, 36, 36);
            PdfWriter writer = PdfWriter.GetInstance(doc, ms);
            doc.Open();
            doc.Add(new Paragraph("hello world"));
            doc.Close();
            writer.Close();
            ms.Close();

            //Response.ContentType = "pdf/application";
            //Response.AddHeader("content-disposition", "attachment;filename=First_PDF_document.pdf");
            //Response.OutputStream.Write(ms.GetBuffer(), 0, ms.GetBuffer().Length);
        } 

        public async Task PreviewReport(Report report)
        {
            report.Prepare();

            PDFSimpleExport pdfExport = new PDFSimpleExport();
            try
            {
                bool flag = true;
                await Task.Factory.StartNew(() => {
                    try
                    {
                        pdfExport.Export(report, PRINTFILENAME);
                    }
                    catch (Exception e)
                    {
                        flag = false;
                        if (!e.Message.Contains("доступ"))
                            Console.WriteLine(e.Message);
                        else
                            Console.WriteLine("Файл отчета уже открыт. Закройте открытый отчет и повторите попытку.");
                    }
                }, TaskCreationOptions.LongRunning);

                if (flag)
                    Process.Start(PRINTFILENAME);
            }
            catch (Exception e)
            {
                if (!e.Message.Contains("доступ"))
                    Console.WriteLine(e.Message);
                else
                    Console.WriteLine("Файл отчета уже открыт. Закройте открытый отчет и повторите попытку.");
            }
        }

        //private  CreateDataRowsForPrint()

        //public async Task CreateReport()
        //{
        //    Report report = new Report();

        //    var table = controlsInitializer.GetDataTable();

        //    var nt = controlsInitializer.CreateDataTableBase(ci.meter, true);

        //    int i = 0;
        //    foreach (DataGridViewRow r in dataGridViewTable.Rows)
        //    {
        //        if (!r.ReadOnly || (bool)Properties.Settings.Default["SavedPrintReadonly"])
        //        {
        //            DataRow d;

        //            var index = int.Parse(controlsInitializer.GetDataTable().Select("Канал = '{0}' AND Параметр = '{1}'".Replace("{0}", r.Cells[0].Value.ToString()).Replace("{1}", r.Cells[1].Value.ToString()))[0][TableColumnsNumbers.Number(ci.meter)].ToString()) - 1;

        //            if (ci.meter is Logika4)
        //            {
        //                d = new DataRow4(ci.tags[index]);
        //            }
        //            else
        //            {
        //                d = new DataRow6(ci.tags[index]);
        //            }

        //            //d.MakeValuePrintable();
        //            nt.Rows.Add(d.rowValuesForPrint(++i, r.Cells[TableColumnsNumbers.Description(ci.meter)].Value.ToString()));
        //        }
        //    }

        //    await Task.Factory.StartNew(() => {

        //        report.RegisterData(nt, "Tags");
        //        report.GetDataSource("Tags").Enabled = true;

        //        ReportPage page = new ReportPage();
        //        report.Pages.Add(page);
        //        page.CreateUniqueName();
        //        page.Columns.Count = (ci.meter is Logika4) ? (2) : (4);

        //        page.ReportTitle = new ReportTitleBand();
        //        page.ReportTitle.Height = Units.Centimeters * 1.65f;
        //        page.ReportTitle.CreateUniqueName();
        //        page.ReportTitle.GrowToBottom = true;


        //        TextObject titleText = new TextObject();
        //        titleText.CreateUniqueName();
        //        titleText.Bounds = new RectangleF(0, 0, Units.Centimeters * 18, Units.Centimeters * 0.5f);
        //        titleText.Height = Units.Centimeters * 1;
        //        titleText.Font = new Font("Arial", 14, FontStyle.Bold);
        //        titleText.Text = "База данных прибора " + ci.meter.Caption;
        //        titleText.HorzAlign = HorzAlign.Left;
        //        titleText.ShiftMode = ShiftMode.Always;
        //        titleText.CanGrow = true;
        //        titleText.ShiftMode = ShiftMode.Always;
        //        titleText.Border.Lines = BorderLines.Top;
        //        titleText.Border.Color = Color.Black;

        //        TextObject titleTextID = new TextObject();
        //        titleTextID.CreateUniqueName();
        //        titleTextID.Bounds = new RectangleF(0, Units.Centimeters * 0.65f, Units.Centimeters * 18, Units.Centimeters * 0.70f);
        //        titleTextID.Font = new Font("Arial", 14, FontStyle.Bold);
        //        titleTextID.Text = "Серийный номер: " + ((!string.IsNullOrEmpty(ci.MeterID)) ? (ci.MeterID) : ("_______"));
        //        titleTextID.HorzAlign = HorzAlign.Left;
        //        titleTextID.CanGrow = true;
        //        titleTextID.ShiftMode = ShiftMode.Always;
        //        titleTextID.Border.Lines = BorderLines.Bottom;
        //        titleTextID.Border.Color = Color.Black;

        //        TextObject dateTimeText = new TextObject();
        //        dateTimeText.CreateUniqueName();
        //        dateTimeText.Bounds = new RectangleF(0, 0, Units.Centimeters * 18, Units.Centimeters * 1.5f);
        //        dateTimeText.Font = new Font("Arial", 10, FontStyle.Regular);
        //        dateTimeText.Text = "Дата и время печати: " + DateTime.Now;
        //        dateTimeText.HorzAlign = HorzAlign.Right;

        //        page.ReportTitle.Objects.Add(titleText);
        //        page.ReportTitle.Objects.Add(titleTextID);
        //        page.ReportTitle.Objects.Add(dateTimeText);

        //        GroupHeaderBand group = new GroupHeaderBand();
        //        page.Bands.Add(group);
        //        group.CreateUniqueName();
        //        group.Height = ((ci.meter is Logika4) ? (0.75f) : (0.5f));
        //        group.Condition = "[Tags.Канал]";
        //        group.SortOrder = FastReport.SortOrder.None;
        //        group.GrowToBottom = true;
        //        group.CanGrow = true;

        //        TextObject groupTxt = new TextObject();
        //        groupTxt.Parent = group;
        //        groupTxt.CreateUniqueName();
        //        groupTxt.Font = new Font("Courier New", (ci.meter is Logika4) ? (12) : (8), FontStyle.Regular);
        //        groupTxt.Bounds = new RectangleF(0, 0, Units.Centimeters * 4, Units.Centimeters * ((ci.meter is Logika4) ? (0.75f) : (0.5f)));
        //        groupTxt.Text = "[[Tags.Канал]]";
        //        groupTxt.VertAlign = VertAlign.Center;
        //        groupTxt.Border.Lines = BorderLines.Bottom | BorderLines.Top;
        //        groupTxt.GrowToBottom = true;
        //        groupTxt.CanGrow = true;

        //        DataBand dataBand = new DataBand();
        //        //page.Bands.Add(dataBand);
        //        group.Data = dataBand;
        //        dataBand.CreateUniqueName();
        //        dataBand.DataSource = report.GetDataSource("Tags");
        //        dataBand.Sort.Add(new Sort("[Tags.Номер]"));
        //        dataBand.Height = Units.Centimeters * 0.5f;
        //        dataBand.CanGrow = true;
        //        dataBand.CanShrink = true;
        //        dataBand.ShiftMode = ShiftMode.Always;

        //        TextObject empNameText = new TextObject();
        //        empNameText.Parent = dataBand;
        //        empNameText.CreateUniqueName();
        //        empNameText.Bounds = new RectangleF(0, 0, Units.Centimeters * ((ci.meter is Logika4) ? (9) : (4.75f)), Units.Centimeters * 0.5f);
        //        empNameText.Font = new Font("Courier New", (ci.meter is Logika4) ? (12) : (8), FontStyle.Regular);
        //        var euVar = (ci.meter is Logika4 ? "Единицы измерения" : "Единицы");
        //        empNameText.Text = "[Tags.Параметр] = [Tags.Значение] [Tags." + euVar + "]";
        //        empNameText.CanGrow = true;
        //        empNameText.CanShrink = true;
        //        empNameText.ShiftMode = ShiftMode.Always;

        //        if (ci.meter is Logika4 && (bool)Properties.Settings.Default["SavedPrintDescriptions"])
        //        {
        //            empNameText.Text += "[Tags.Оперативный]";

        //            TextObject empNameTextDesc = new TextObject();
        //            empNameTextDesc.Parent = dataBand;
        //            empNameTextDesc.CreateUniqueName();
        //            empNameTextDesc.Bounds = new RectangleF(0, empNameText.Height + 0.0f * Units.Centimeters, Units.Centimeters * 9, Units.Centimeters * 0.75f);
        //            empNameTextDesc.Font = new Font("Courier New", 10, FontStyle.Regular);
        //            empNameTextDesc.Text = "[Tags.Описание]";
        //            empNameTextDesc.GrowToBottom = true;
        //            empNameTextDesc.CanGrow = true;
        //            empNameTextDesc.CanShrink = true;
        //            empNameTextDesc.ShiftMode = ShiftMode.Always;
        //        }

        //        page.PageFooter = new PageFooterBand();
        //        page.PageFooter.CreateUniqueName();
        //        page.PageFooter.Height = 0.5f * Units.Centimeters;

        //        TextObject fileText = new TextObject();
        //        fileText.CreateUniqueName();
        //        fileText.HorzAlign = HorzAlign.Left;
        //        fileText.VertAlign = VertAlign.Center;
        //        fileText.Bounds = new RectangleF(0.0f, 0.0f, 18.0f * Units.Centimeters, 0.5f * Units.Centimeters);
        //        fileText.Border.Lines = BorderLines.Top;
        //        fileText.Border.TopLine.Color = Color.Black;
        //        fileText.Border.TopLine.Width = 1.0f;
        //        fileText.Text = "Файл: " + ci.fileName;

        //        TextObject pagesText = new TextObject();
        //        pagesText.CreateUniqueName();
        //        pagesText.HorzAlign = HorzAlign.Right;
        //        pagesText.VertAlign = VertAlign.Center;
        //        pagesText.Bounds = new RectangleF(0.0f, 0.0f, 18.0f * Units.Centimeters, 0.5f * Units.Centimeters);
        //        pagesText.Border.Lines = BorderLines.Top;
        //        pagesText.Border.TopLine.Color = Color.Black;
        //        pagesText.Border.TopLine.Width = 1.0f;
        //        pagesText.Text = "Стр. [Page]/[TotalPages#]";

        //        page.PageFooter.Objects.Add(fileText);
        //        page.PageFooter.Objects.Add(pagesText);
        //    });

        //    await PreviewReport(report);
        //}
    }
}