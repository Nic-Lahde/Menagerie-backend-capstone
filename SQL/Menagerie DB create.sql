CREATE DATABASE Menagerie;
GO

-- Switch to the 'Menagerie' database context
USE Menagerie;
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(50) NOT NULL,
  [Email] nvarchar(50) NOT NULL,
  [FirebaseId] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Pet] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserProfileId] int NOT NULL,
  [Name] nvarchar(50) NOT NULL,
  [SpeciesCommon] nvarchar(100) NOT NULL,
  [SpeciesLatin] nvarchar(100),
  [DOB] nvarchar(50),
  [FoodInterval] int NOT NULL,
  [ImageUrl] nvarchar(255),
  [SexId] int NOT NULL,
  [Notes] text,
  [Archive] bit NOT NULL
)
GO

CREATE TABLE [Gene] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(50) NOT NULL,
  [IsCoDominant] bit NOT NULL
)
GO

CREATE TABLE [PetGene] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PetId] int NOT NULL,
  [GeneId] int NOT NULL
)
GO

CREATE TABLE [PetTrait] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PetId] int NOT NULL,
  [TraitId] int NOT NULL,
  [Percentage] int NOT NULL
)
GO

CREATE TABLE [Trait] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Feeding] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PetId] int NOT NULL,
  [Food] text NOT NULL,
  [Date] Date NOT NULL
)
GO

CREATE TABLE [MedicalEvent] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PetId] int NOT NULL,
  [Description] text NOT NULL,
  [Date] Date NOT NULL
)
GO

CREATE TABLE [Listing] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PetId] int NOT NULL,
  [Price] int,
  [Text] text NOT NULL
)
GO

CREATE TABLE [Sex] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Description] nvarchar(50) NOT NULL
)
GO

ALTER TABLE [Pet] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [PetGene] ADD FOREIGN KEY ([PetId]) REFERENCES [Pet] ([Id])
GO

ALTER TABLE [PetGene] ADD FOREIGN KEY ([GeneId]) REFERENCES [Gene] ([Id])
GO

ALTER TABLE [Feeding] ADD FOREIGN KEY ([PetId]) REFERENCES [Pet] ([Id])
GO

ALTER TABLE [MedicalEvent] ADD FOREIGN KEY ([PetId]) REFERENCES [Pet] ([Id])
GO

ALTER TABLE [PetTrait] ADD FOREIGN KEY ([PetId]) REFERENCES [Pet] ([Id])
GO

ALTER TABLE [PetTrait] ADD FOREIGN KEY ([TraitId]) REFERENCES [Trait] ([Id])
GO

ALTER TABLE [Pet] ADD FOREIGN KEY ([Id]) REFERENCES [Listing] ([PetId])
GO

ALTER TABLE [Pet] ADD FOREIGN KEY ([SexId]) REFERENCES [Sex] ([Id])
GO
DROP TABLE Listing

