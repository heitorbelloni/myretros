﻿using Retros.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Retros.DataAccess
{
    class RetrosModel
    {
        public RetrosModel() { }
        public IDictionary<Guid, Retro> Retros { get; } = new Dictionary<Guid, Retro>();
    }
}
