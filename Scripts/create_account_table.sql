/*
   Tuesday, April 02, 20139:24:55 PM
   Database: WebDashboard
*/

USE WebDashboard

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
CREATE TABLE dbo.Account
	(
	userID bigint NOT NULL,
	sessionID uniqueidentifier NULL,
	sessionExpiresAt datetime NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Account ADD CONSTRAINT
	PK_Account PRIMARY KEY CLUSTERED 
	(
	userID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.Account SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
