USE [PORTAL]
GO

/****** Object:  Table [dbo].[StockTransaction]    Script Date: 04/28/2013 20:54:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[StockTransaction](
	[Trans_ID] [int] NOT NULL IDENTITY,
	[User_ID] [bigint] NOT NULL,
	[Ticker_Symbol] [varchar](50) NOT NULL,
	[Quantity] [int] NOT NULL,
	[Rate] [money] NOT NULL,
	[Timestamp] [datetime] NOT NULL,
	[Stock_Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_StockTransaction] PRIMARY KEY CLUSTERED 
(
	[Trans_ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

alter table StockTransaction
add constraint StockTransaction_UserID_FK FOREIGN KEY (User_ID) references Account(userID)


