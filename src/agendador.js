// src/agendador.js

class Evento {
    constructor(nome, horarioInicio, horarioTermino) {
        this.nome = nome;
        this.horarioInicio = new Date(horarioInicio);
        this.horarioTermino = new Date(horarioTermino);

        // Verificação do formato de data
        if (isNaN(this.horarioInicio.getTime()) || isNaN(this.horarioTermino.getTime())) {
            throw new Error("Formato de data inválido");
        }

        // Verificação do horário de término
        if (this.horarioInicio >= this.horarioTermino) {
            throw new Error("O horário de término deve ser depois do horário de início");
        }
    }
}

class Agendador {
    constructor() {
        this.eventos = [];
    }

    adicionarEvento(evento) {
        for (let e of this.eventos) {
            if (e.horarioInicio < evento.horarioTermino && e.horarioTermino > evento.horarioInicio) {
                return "Conflito de agendamento detectado"; // Conflito detectado
            }
        }
        this.eventos.push(evento);
        return "Evento adicionado com sucesso";
    }
}

module.exports = { Agendador, Evento };
