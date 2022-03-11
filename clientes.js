(function () {

    // Inicializa o objeto do Conector do Tableau
    var myConnector = tableau.makeConnector();

    // Define o esquema da tabelas que serão carregadas pela api
    myConnector.getSchema = function (schemaCallback) {

        var tb_schema_cliente = {
            id: "tb_cliente",
            alias: "Cliente",
            columns: [
                {
                    "id": "id_cliente",
                    "dataType": "int"
                },
                {
                    "id": "nm_nome",
                    "dataType": "string"
                },
                {
                    "id": "ds_razaoSocial",
                    "dataType": "string"
                },
                {
                    "id": "nr_cnpj",
                    "dataType": "string"
                },
                {
                    "id": "ds_contato",
                    "dataType": "string"
                }
            ]
        };

        schemaCallback([tb_schema_cliente]);
    };

    // Função que será executada ao clicar no botão de buscar os dados. 
    // Aqui será carregado as informações da url da API
    myConnector.getData = function (table, doneCallback) {

        //Tabela de saida
        var tableData = [];

        console.log('Inicia a carga de Clientes....')
       
        //CLIENTES 
        $.getJSON("https://apitecnun.azurewebsites.net/v2/comercial/clientes?ClientID=app_pbi_pedro&ClientSecret=123456", function (resp) {

            //Os dados da lista no objeto de retorno Result.Data
            var dados = resp.data;
            console.log('Clientes - ' + resp.message)

            // Iterate over the JSON object
            for (var i = 0, len = dados.length; i < len; i++) {

                tableData.push({
                    "id_cliente": dados[i].id_cliente,
                    "nm_nome": dados[i].nm_nome,
                    "ds_razaoSocial": dados[i].ds_razaoSocial,
                    "nr_cnpj": dados[i].nr_cnpj,
                    "ds_contato": dados[i].ds_contato
                });
            }

            console.log('Terminou de carrega a tabela de Clientes. Adiciona na tabela (appendRows)')
            //Adiciona os dados recuperados para o tableau
            table.appendRows(tableData);

            doneCallback();
        });


    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {

        $("#submitButton").click(function () {
            tableau.connectionName = "Tecnun Api DataSource - Clientes"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
