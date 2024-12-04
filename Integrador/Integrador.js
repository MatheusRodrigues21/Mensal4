// app.js

document.addEventListener('DOMContentLoaded', () => {
    const reportList = document.getElementById('report-list');
    const addReportButton = document.querySelector('.add-report-btn');

    const reports = [
        { id: 1, item: 'Monitor', description: 'Tela trincada', date: '2024-10-01', status: 'Pendente' },
        { id: 2, item: 'Teclado', description: 'Teclas não funcionando', date: '2024-10-05', status: 'Em análise' },
        { id: 3, item: 'Cadeira', description: 'Perna quebrada', date: '2024-10-07', status: 'Resolvido' },
    ];

    const loadReports = () => {
        reportList.innerHTML = '';
        reports.forEach(report => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${report.id}</td>
                <td>${report.item}</td>
                <td>${report.description}</td>
                <td>${report.date}</td>
                <td>${report.status}</td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Excluir</button>
                </td>
            `;
            reportList.appendChild(row);
        });
    };

    addReportButton.addEventListener('click', () => {
        const newReport = {
            id: reports.length + 1,
            item: 'Novo Item',
            description: 'Descrição do dano',
            date: new Date().toISOString().split('T')[0],
            status: 'Pendente'
        };
        reports.push(newReport);
        loadReports();
    });

    loadReports();
});
