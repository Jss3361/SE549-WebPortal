USE [PORTAL]
GO

/****** Object:  Table [dbo].[StockTransaction]    Script Date: 04/21/2013 11:08:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[StockTransaction](
	[Trans_ID] [int] NOT NULL,
	[User_ID] [int] NOT NULL,
	[Ticker_Symbol] [varchar](50) NOT NULL,
	[Quantity] [int] NOT NULL,
	[Rate] [money] NOT NULL,
	[Timestamp] [datetime] NOT NULL,
	[Stock_Name] [varchar](50) NOT NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


