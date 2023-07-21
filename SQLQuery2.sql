INSERT INTO Pet (UserProfileId, [Name], SpeciesCommon, SpeciesLatin, DOB, FoodInterval, ImageUrl, SexId, Archive)
VALUES (1, 'Aloysius', 'Northern Blue-Tongued Skink', 'Tiliqua Scincoides Intermedia', '2017', 7, 'https://i.pinimg.com/originals/c0/d9/f6/c0d9f60d35bdb6e16cf5c8ee92ae3d78.jpg', 1, 0 );

 SELECT p.Id AS PetId, p.UserProfileId AS PetUserProfileId, p.[Name] AS PetName, SpeciesCommon, SpeciesLatin, DOB, FoodInterval, ImageUrl, SexId, Notes, s.Description AS Sex, g.Id AS GeneId, g.Name AS GeneName,
                        IsCoDominant, Percentage, t.Id AS TraitId, t.Name AS TraitName, Food, f.Date AS FeedingDate, pg.Id AS PetGeneId, pt.Id AS PetTraitId, f.Id AS FeedingId
                 FROM Pet p 
                 JOIN Sex s ON SexId = s.Id
                 left JOIN PetGene pg ON p.Id = pg.PetId
                 left JOIN Gene g ON pg.GeneId = g.Id
                 left JOIN PetTrait pt ON pt.PetId = p.Id
                 left JOIN Trait t ON pt.TraitId = t.Id
                 left JOIN Feeding f ON f.PetId = p.Id
                 WHERE p.UserProfileId = 1 AND p.Archive = 0

                 SELECT * FROM Pet
