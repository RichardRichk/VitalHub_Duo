USE [VitalHub_G13M(C)];

-- Selecionando todos os endereços
SELECT * FROM dbo.Enderecos;

INSERT INTO
	dbo.Enderecos
VALUES
	(NEWID(), '57000000', 'Alagoas', 100, -35.7351,  -9.66625),
	(NEWID(), '09510200', 'Rua Niterói', 180, -46.6388, -23.5489),
	(NEWID(), '69000000', 'Amazonas', 600,  -60.0261, -3.10719);




-- Selecionando todos os tipos de usuários
SELECT * FROM dbo.TiposUsuario;

INSERT INTO dbo.TiposUsuario VALUES (NEWID(), 'Medico'), (NEWID(), 'Paciente');




-- Selecionando todos os usuários
SELECT * FROM dbo.Usuarios;

INSERT INTO
	dbo.Usuarios
VALUES
	(NEWID(), 'CFC0C3FF-09E2-45F4-ACD6-DCC261AB5739', 'Lucas Silveira Portal', 'medico@email.com', 'medico123', 'string'),
	(NEWID(), 'CFC0C3FF-09E2-45F4-ACD6-DCC261AB5739', 'Carlos Roque', 'medico2@email.com', 'medico123', 'string'),
	(NEWID(), '676F07F1-73CC-4B59-83E6-F07064DB4C4F', 'Martin Lorenzo', 'paciente@email.com', 'paciente123', 'string'),
	(NEWID(), '676F07F1-73CC-4B59-83E6-F07064DB4C4F', 'Heitor Paulo Campos', 'paciente2@email.com', 'paciente123', 'string');

UPDATE dbo.Usuarios SET senha = '$2y$10$kZROpWHidaGEbQdfvq3SpeVPGiNcpLQHAOcENJbblYV0aAqXoHnYO' WHERE id = 'F63A83C9-35C7-4BDE-940D-5B07303D8F02';


-- Selecionando todas as especialidades
SELECT * FROM dbo.Especialidades;

INSERT INTO
	dbo.Especialidades
VALUES
	(NEWID(), 'Pediatra'),
	(NEWID(), 'Cardio');


-- Selecionando todos os médicos
SELECT * FROM dbo.Medicos;

INSERT INTO
	dbo.Medicos
VALUES
	('897FC1D2-EF7E-49F1-A322-B0B5257C45BE', 'B3A90F75-BFCE-4785-B6CA-5C8A5FCF394C', '123456789', '4E8132FC-446D-421E-B995-DB6DB10CA339'),
	('856A41AE-C591-44A8-A9BA-E953038CAF0C', '149BCD82-94A8-4CAF-97AE-EA89BEFEC5D6', '987654321', '4E8132FC-446D-421E-B995-DB6DB10CA339');



-- Selecionando todos os pacientes
SELECT * FROM dbo.Pacientes;

INSERT INTO
	dbo.Pacientes
VALUES
	('FC6D2A91-5D8B-4F00-9C8C-6706E5B613D1', '2000-01-01', '391166037', '01318181801', '4CEC1FA1-857A-450C-980A-5A818C1F53B8'),
	('C1DAAD30-2120-4AED-A9F3-FC1DDAF952A5', '2001-02-02', '473972438', '25319361815', '4CEC1FA1-857A-450C-980A-5A818C1F53B8');



-- Selecionando todos os niveis
SELECT * FROM dbo.NiveisPrioridade;

INSERT INTO 
	dbo.NiveisPrioridade
VALUES
	(NEWID(), 0), -- Rotina
	(NEWID(), 1), -- Exame
	(NEWID(), 2); -- Urgencia



-- Selecionando todas as situasões
SELECT * FROM dbo.Situacoes;

INSERT INTO
	dbo.Situacoes
VALUES
	(NEWID(), 'Pendentes'),
	(NEWID(), 'Realizados'),
	(NEWID(), 'Cancelados');



-- Selecionando todas as clínicas
SELECT * FROM dbo.Clinicas;

INSERT INTO
	dbo.Clinicas
VALUES
	(NEWID(), 'Clínica Médica Vida & Saúde', '12345678000190', 'Clínica Médica Vida & Saúde', 'clinica.vidasaude@gmail.com', '74AFF17C-B35E-4EEE-8E6C-C236D1C5A901'),
	(NEWID(), 'Centro Médico São Paulo', '23456789000101', 'Centro Médico São Paulo', 'medico.saopaulo@gmail.com', '4E8132FC-446D-421E-B995-DB6DB10CA339');
