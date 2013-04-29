USE [PORTAL]
GO

/****** Object:  Table [dbo].[StockComment]    Script Date: 04/28/2013 20:59:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[StockComment](
	[ID] [int] NOT NULL IDENTITY,
	[User_ID] [bigint] NOT NULL,
	[Stock] [varchar](30) NOT NULL,
	[Comment] [varchar](250) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
 CONSTRAINT [PK_StockComment] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE StockComment
add constraint StockComment_FK FOREIGN KEY (User_ID) references Account(userID)


