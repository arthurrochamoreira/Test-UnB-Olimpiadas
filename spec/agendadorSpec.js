// spec/agendadorSpec.js

describe("Agendador", function() {
    let Agendador, Evento;

    beforeEach(function() {
        Agendador = require('../src/agendador').Agendador;
        Evento = require('../src/agendador').Evento;
    });

    it("deve adicionar um evento sem conflitos", function() {
        let agendador = new Agendador();
        let evento = new Evento("100m Final", "2024-07-28 10:00", "2024-07-28 11:00");

        expect(agendador.adicionarEvento(evento)).toBe("Evento adicionado com sucesso");
        expect(agendador.eventos.length).toBe(1);
    });

    it("não deve adicionar um evento com conflito de horário", function() {
        let agendador = new Agendador();
        let evento1 = new Evento("100m Final", "2024-07-28 10:00", "2024-07-28 11:00");
        let evento2 = new Evento("200m Final", "2024-07-28 10:30", "2024-07-28 11:30");

        agendador.adicionarEvento(evento1);
        expect(agendador.adicionarEvento(evento2)).toBe("Conflito de agendamento detectado");
        expect(agendador.eventos.length).toBe(1);
    });

    it("deve adicionar eventos sem conflitos de horário", function() {
        let agendador = new Agendador();
        let evento1 = new Evento("100m Final", "2024-07-28 10:00", "2024-07-28 11:00");
        let evento2 = new Evento("200m Final", "2024-07-28 11:00", "2024-07-28 12:00");

        agendador.adicionarEvento(evento1);
        expect(agendador.adicionarEvento(evento2)).toBe("Evento adicionado com sucesso");
        expect(agendador.eventos.length).toBe(2);
    });

    it("deve lançar um erro para horários de evento inválidos", function() {
        expect(function() {
            new Evento("Evento Inválido", "2024-07-28 10:00", "2024-07-28 25:00"); // Hora inválida
        }).toThrowError("Formato de data inválido");
    });

    it("deve lançar um erro se o horário de término for antes do horário de início", function() {
        expect(function() {
            new Evento("Evento Inválido", "2024-07-28 12:00", "2024-07-28 11:00");
        }).toThrowError("O horário de término deve ser depois do horário de início");
    });
});
