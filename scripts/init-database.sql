-- Script para criar as tabelas necessárias no banco de dados

-- Tabela pessoas (já deve existir)
CREATE TABLE IF NOT EXISTS pessoas (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    data_entrada DATE NOT NULL,
    telefone VARCHAR(20),
    nome_responsavel VARCHAR(100),
    telefone_responsavel VARCHAR(20),
    usa_medicamento BOOLEAN DEFAULT false,
    info_medicamentos TEXT,
    status VARCHAR(20) CHECK (status IN ('ativo', 'inativo')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela avaliacoes
CREATE TABLE IF NOT EXISTS avaliacoes (
    id BIGSERIAL PRIMARY KEY,
    pessoa_id BIGINT NOT NULL,
    data_avaliacao DATE NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('inicial','acompanhamento')),
    professor_responsavel VARCHAR(100),
    q01 VARCHAR(10),
    q02 VARCHAR(10),
    q03 VARCHAR(10),
    q04 VARCHAR(10),
    q05 VARCHAR(10),
    q06 VARCHAR(10),
    q07 VARCHAR(10),
    q08 VARCHAR(10),
    q09 VARCHAR(10),
    q10 VARCHAR(10),
    q11 VARCHAR(10),
    q12 VARCHAR(10),
    q13 VARCHAR(10),
    q14 VARCHAR(10),
    q15 VARCHAR(10),
    q16 VARCHAR(10),
    q17 VARCHAR(10),
    q18 VARCHAR(10),
    q19 VARCHAR(10),
    q20 VARCHAR(10),
    q21 VARCHAR(10),
    q22 VARCHAR(10),
    q23 VARCHAR(10),
    q24 VARCHAR(10),
    q25 VARCHAR(10),
    q26 VARCHAR(10),
    q27 VARCHAR(10),
    q28 VARCHAR(10),
    q29 VARCHAR(10),
    q30 VARCHAR(10),
    q31 VARCHAR(10),
    q32 VARCHAR(10),
    q33 VARCHAR(10),
    q34 VARCHAR(10),
    q35 VARCHAR(10),
    q36 VARCHAR(10),
    q37 VARCHAR(10),
    q38 VARCHAR(10),
    q39 VARCHAR(10),
    q40 VARCHAR(10),
    q41 VARCHAR(10),
    q42 VARCHAR(10),
    q43 VARCHAR(10),
    q44 VARCHAR(10),
    q45 VARCHAR(10),
    q46 VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pessoa_id) REFERENCES pessoas(id) ON DELETE CASCADE
);

-- Criar índices para melhorar performance de buscas
CREATE INDEX IF NOT EXISTS idx_avaliacoes_pessoa_id ON avaliacoes(pessoa_id);
CREATE INDEX IF NOT EXISTS idx_avaliacoes_data_avaliacao ON avaliacoes(data_avaliacao);
CREATE INDEX IF NOT EXISTS idx_avaliacoes_tipo ON avaliacoes(tipo);
