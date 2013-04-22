USE [PORTAL]
GO

/****** Object:  Table [dbo].[StockComment]    Script Date: 04/21/2013 11:00:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[StockComment](
	[ID] [int] NOT NULL,
	[User_ID] [int] NOT NULL,
	[Stock] [varchar](30) NOT NULL,
	[Comment] [varchar](250) NOT NULL,
	[Timestamp] [datetime] NOT NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


