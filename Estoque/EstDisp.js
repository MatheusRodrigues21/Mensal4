let estoque = [];

        function addItem() {
            const codigo = document.getElementById('codigo').value;
            const item = document.getElementById('item').value;
            const descricao = document.getElementById('descricao').value;
            const quantidade = parseInt(document.getElementById('quantidade').value, 10);
            const condicao = document.getElementById('condicao').value;
            const status = quantidade > 0 ? 'Disponível' : 'Indisponível';

            // Adiciona novo item ao array de estoque
            estoque.push({ codigo, item, descricao, quantidade, condicao, status });
            
            // Limpa o formulário
            document.getElementById('codigo').value = '';
            document.getElementById('item').value = '';
            document.getElementById('descricao').value = '';
            document.getElementById('quantidade').value = '';
            document.getElementById('condicao').value = 'Boa';

            // Atualiza a tabela
            updateTable();
        }

        function updateTable() {
            const estoqueBody = document.getElementById('estoqueBody');
            estoqueBody.innerHTML = ''; // Limpa a tabela

            // Preenche a tabela com os dados do array
            estoque.forEach(item => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${item.codigo}</td>
                    <td>${item.item}</td>
                    <td>${item.descricao}</td>
                    <td>${item.quantidade}</td>
                    <td>${item.condicao}</td>
                    <td class="${item.status === 'Disponível' ? 'status-disponivel' : 'status-indisponivel'}">${item.status}</td>
                `;
                
                estoqueBody.appendChild(row);
            });
        }

        function generateReport() {
            let report = 'Relatório de Estoque:\n\n';
            estoque.forEach(item => {
                report += `Código: ${item.codigo}\nItem: ${item.item}\nDescrição: ${item.descricao}\nQuantidade: ${item.quantidade}\nCondição: ${item.condicao}\nStatus: ${item.status}\n\n`;
            });
            alert(report); // Exibe o relatório como alerta (pode ser adaptado para download de arquivo)
        }