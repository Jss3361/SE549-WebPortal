/*
   Friday, April 12, 20134:20:57 PM
   User: 
   Server: LOPES-PC\LOPESSQLSERVER
   Database: WebDashboard
   Application: 
*/

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.ChatMessage
	(
	chatMsgId uniqueidentifier NOT NULL,
	chatMsgText varchar(MAX) NOT NULL,
	timeStamp datetime NOT NULL,
	author varchar(MAX) NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.ChatMessage ADD CONSTRAINT
	PK_ChatMessage PRIMARY KEY CLUSTERED 
	(
	chatMsgId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.ChatMessage SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
select Has_Perms_By_Name(N'dbo.ChatMessage', 'Object', 'ALTER') as ALT_Per, Has_Perms_By_Name(N'dbo.ChatMessage', 'Object', 'VIEW DEFINITION') as View_def_Per, Has_Perms_By_Name(N'dbo.ChatMessage', 'Object', 'CONTROL') as Contr_Per 