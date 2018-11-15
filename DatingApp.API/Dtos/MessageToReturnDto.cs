using System;

namespace DatingApp.API.Dtos
{
    public class MessageToReturnDto
    {
        public int Id { get; set; }

        // It is important for all 'Sender' property to have the 'Sender' as prefix
        // and the rest of the string like 'KnownAs', 'PhotoUrl' to be the same
        // as the property names we used in the 'User' class because AutoMapper
        // is pretty clever to determine if the 'Sender'+'Id' relates to a User ID,
        // then it will grab the properties with 'Sender' as prefix and then 
        // map the User class based on the rest of the string after the 'Sender' prefix.
        // So 'SenderKnownAs' is actually equivalent to 'Sender'+'KnownAs' in the mapping.
        public int SenderId { get; set; }

        public string SenderKnownAs { get; set; }

        public string SenderPhotoUrl { get; set; }
        //-----------------------------------------

        public int RecipientId { get; set; }

        public string RecipientKnownAs { get; set; }

        public string RecipientPhotoUrl { get; set; }

        public string Content { get; set; }

        public bool IsRead { get; set; }

        public DateTime? DateRead { get; set; }

        public DateTime MessageSent { get; set; }
    }
}
