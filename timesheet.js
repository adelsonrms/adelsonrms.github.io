(function () {
    // Inicializa o objeto do Conector do Tableau
    var myConnector = tableau.makeConnector();

    // Define o esquema da tabelas que serão carregadas pela api
    myConnector.getSchema = function (schemaCallback) {

        //Schema do objeto de usuarios
        /*
        
        {
                    "id_usuario": 1,
                    "nm_nome": "VITOR LUIZ RUBIO",
                    "ds_email": "vitor@tecnun.com.br",
                    "ds_cargo": "ANALISTA PROGRAMADOR SÊNIOR",
                    "tp_tipo": 1,
                    "fl_ativo": false
                }
        
        */
        var cols = [
            {
                "id": "id_usuario",
                "alias": "id",
                "dataType": "float", "descrption": "ID unico do usuario"
            },
            {
                "id": "nm_nome",
                "alias": "Nome",
                "dataType": "string"
            },
            {
                "id": "ds_email",
                "alias": "Email",
                "dataType": "string"
            },
            {
                "id": "ds_cargo",
                "alias": "Cargo",
                "dataType": "string"
            },
            {
                "id": "tp_tipo",
                "alias": "Tipo",
                "dataType": "float"
            },
            {
                "id": "fl_ativo",
                "dataType": "bool"
            }
        ];

        var tableSchema = {
            id: "usuarios",
            alias: "Tabela de usuarios cadastrados",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Função que será executada ao clicar no botão de buscar os dados. 
    // Aqui será carregado as informações da url da API
    myConnector.getData = function (table, doneCallback) {

        //Se conecta a API e recupera os dados desejados
        $.getJSON("https://apitecnun.azurewebsites.net/v2/rh/usuarios?ClientID=app_pbi_pedro&ClientSecret=123456&cliente=3886&X-API-Key=CD9190C7495A4D1F83CF95E198BF2515", function (resp) {

            //Os dados da lista no objeto de retorno Result.Data
            var dados = resp.data;

            //Tabela de saida
            var tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = dados.length; i < len; i++) {

                tableData.push({
                    "id_usuario": dados[i].id_usuario,
                    "nm_nome": dados[i].nm_nome,
                    "ds_email": dados[i].ds_email,
                    "ds_cargo": dados[i].ds_cargo,
                    "tp_tipo": dados[i].tp_tipo,
                    "fl_ativo": dados[i].fl_ativo,
                });
            }

            //Adiciona os dados recuperados para o tableau
            table.appendRows(tableData);
            
            //Função de callback. Será processada pelo Tableau
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Tecnun Api Rest - Clientes"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
