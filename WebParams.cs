using Logika.Meters;

namespace HelloPhotino.CustomServer
{

    public class WebDevice
    {
        public WebDevice(string deviceName, string deviceType, List<WebChannel> channels)
        {
            DeviceName = deviceName;
            Channels = channels;
            DeviceType = deviceType;
        }

        public string DeviceName { get; }
        public List<WebChannel> Channels { get; }
        public string DeviceType { get; }
    }

    public class WebChannel
    {
        public WebChannel(Channel channel)
        {
            ChannelName = channel.Name;
            Description = channel.Description;
            ChannelNumber = channel.No;
            Tags = new List<AbstractWebTag>();
        }

        public string ChannelName { get; }
        public string Description { get; }
        public int ChannelNumber { get; }
        public List<AbstractWebTag> Tags { get; set; }

    }

    public abstract class AbstractWebTag
    {
        public AbstractWebTag(int ordinal, string kind)
        {
            Ordinal = ordinal;
            Kind = kind;    
        }

        public int Ordinal { get; }
        public string Kind { get; }
    }

    public class WebTag : AbstractWebTag
    {
        public WebTag(DataTag tag) : base(tag.Ordinal, "Tag")
        {

            DataTagDef def = (DataTagDef)tag.def;

            Value = tag.Value;
            TagName = tag.FieldName;
            MeasurementUnit = tag.EU;
            IsOperative = tag.Oper;
            Description = tag.Description;
            Address = tag.Address;
            DetailedDescription = def.DescriptionEx;
            ValueRange = def.Range;
        }

        public object Value { get; }
        public string TagName { get; }
        public string MeasurementUnit { get; }
        public bool IsOperative { get; }
        public string Description { get; }
        public string Address { get; }
        public string DetailedDescription { get; }
        public string ValueRange { get; }

    }

    public class WebGroupTag : AbstractWebTag
    {
        public WebGroupTag(int ordinal, List<DataTag> tags) : base(ordinal, "GroupTag")
        {
            Tags = tags.Select(tag => new WebTag(tag)).ToList();
        }

        public WebGroupTag(int ordinal, List<WebTag> tags) : base(ordinal, "GroupTag")
        {
            Tags = tags;
        }

        public List<WebTag> Tags { get; }

    }

    internal class WebParams
    {

        public static List<WebChannel> GetWebChannelsWithCorrespondingTagsAndTagGroups(DataTag[] tags)
        {
            List<Channel> deviceChannels = new();

            var channelsWithCorrespondingTags = tags.GroupBy((tag) =>
            {

                bool alreadyExists = deviceChannels.Any((channel) => channel.Name == tag.Channel.Name);

                if (!alreadyExists)
                {
                    deviceChannels.Add(tag.Channel);
                }

                return tag.Channel.Name;
            }).ToList();

            List<WebChannel> webChannels = deviceChannels.Select((currentChannel) =>
            {
                List<DataTag> currentChannelTags = channelsWithCorrespondingTags.Single((g) => g.Key == currentChannel.Name).ToList();
                var tagsGroupedByOrdinalInCurrentChannel = currentChannelTags.GroupBy((tag) => tag.Ordinal).ToList();
                List<AbstractWebTag> currentChannelWebTagsAndWebTagGroups = Convert_DataTags_Grouped_By_Ordinals_In_List_Of_WebTags_And_WebTagGroups(tagsGroupedByOrdinalInCurrentChannel);

                WebChannel newWebChannel = new(currentChannel);
                newWebChannel.Tags = currentChannelWebTagsAndWebTagGroups;
                return newWebChannel;
            }).ToList();

            return webChannels;

        }

        private static List<AbstractWebTag> Convert_DataTags_Grouped_By_Ordinals_In_List_Of_WebTags_And_WebTagGroups(List<IGrouping<int, DataTag>> tagsGroupedByOrdinal)
        {

            List<AbstractWebTag> webTags = new();

            foreach (var TagsWithCurrentOrdinal in tagsGroupedByOrdinal)
            {
                int ordinal = TagsWithCurrentOrdinal.Key;
                List<DataTag> tagsWithSameOrdinal = tagsGroupedByOrdinal.Single(g => ordinal == g.Key).ToList();

                if(tagsWithSameOrdinal.Count == 1)
                {
                    WebTag singleTagWithThatOrdinal = new WebTag(tagsWithSameOrdinal[0]);
                    webTags.Add(singleTagWithThatOrdinal);
                } else
                {
                    webTags.Add(new WebGroupTag(ordinal, tagsWithSameOrdinal));
                }
            }

            return webTags;
        }
    }
}
