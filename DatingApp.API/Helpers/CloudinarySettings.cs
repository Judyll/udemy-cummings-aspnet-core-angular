using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    // We will be strongly-typing the CloudinarySettings found in appsettings.json

    public class CloudinarySettings
    {
        public string CloudName { get; set; }

        public string ApiKey { get; set; }

        public string ApiSecret { get; set; }
    }
}
