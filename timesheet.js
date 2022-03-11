(function () {

    // Inicializa o objeto do Conector do Tableau
    var myConnector = tableau.makeConnector();

    // Define o esquema da tabelas que serão carregadas pela api
    myConnector.getSchema = function (schemaCallback) {

        var tb_schema_usuario =  {
            id: "tb_usuarios",
            alias: "Usuario",
            columns: [
                {"id": "id_usuario", "dataType": "int"},
                {"id": "nm_nome","dataType": "string"},
                {
                    "id": "ds_email",
                    "dataType": "string"
                },
                {
                    "id": "ds_cargo",
                    "dataType": "string"
                },
                {
                    "id": "tp_tipo",
                    "dataType": "int"
                },
                {
                    "id": "fl_ativo",
                    "dataType": "bool"
                }
            ]
        };

        schemaCallback([tb_schema_usuario]);
    };

    // Função que será executada ao clicar no botão de buscar os dados. 
    // Aqui será carregado as informações da url da API
    myConnector.getData = function (table, doneCallback) {

        //Tabela de saida
        var tableData = [];

        console.log('Inicia a carga de Usuarios....')
        //USUARIOS - Se conecta a API e recupera os dados desejados
        $.getJSON("https://apitecnun.azurewebsites.net/v2/rh/usuarios?ClientID=app_pbi_pedro&ClientSecret=123456", function (resp) {

            //Os dados da lista no objeto de retorno Result.Data
            var dados = resp.data;

            console.log('Usuarios - ' + resp.message)

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

            console.log('Terminou de carrega a tabela de Usuarios. Adiciona na tabela (appendRows)')
            //Adiciona os dados recuperados para o tableau
            table.appendRows(tableData);

            //Função de callback. Será processada pelo Tableau
            doneCallback();

            // console.log('Inicia a carga de Clientes....')

            // //Prepara o objero para um novo schema
            // tableData = [];

            // //CLIENTES 
            // $.getJSON("https://apitecnun.azurewebsites.net/v2/comercial/clientes?ClientID=app_pbi_pedro&ClientSecret=123456", function (resp) {

            //     //Os dados da lista no objeto de retorno Result.Data
            //     var dados = resp.data;
            //     console.log('Clientes - ' + resp.message)

            //     // Iterate over the JSON object
            //     for (var i = 0, len = dados.length; i < len; i++) {

            //         tableData.push({
            //             "id_cliente": dados[i].id_cliente,
            //             "nm_nome": dados[i].nm_nome,
            //             "ds_razaoSocial": dados[i].ds_razaoSocial,
            //             "nr_cnpj": dados[i].nr_cnpj,
            //             "ds_contato": dados[i].ds_contato
            //         });
            //     }

            //     console.log('Terminou de carrega a tabela de Clientes. Adiciona na tabela (appendRows)')
            //     //Adiciona os dados recuperados para o tableau
            //     table.appendRows(tableData);

            // });
        });


    };

    tableau.registerConnector(myConnector);

    // Inicializa o objeto do Conector do Tableau
    var myConnectorCliente = tableau.makeConnector();

    // Define o esquema da tabelas que serão carregadas pela api
    myConnectorCliente.getSchema = function (schemaCallback) {
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
    myConnectorCliente.getData = function (table, doneCallback) {

        //Tabela de saida
        var tableData = [];

        console.log('Inicia a carga de Usuarios....')

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

    tableau.registerConnector(myConnectorCliente);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {

        $("#submitButton").click(function () {
            tableau.connectionName = "Tecnun Api DataSource - Usuarios"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });


        $("#btn-carregar-clientes").click(function () {
            tableau.connectionName = "Tecnun Api DataSource - Clientes"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
