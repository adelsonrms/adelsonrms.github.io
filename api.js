var opcoes = {};

(function () {

    localStorage.setItem('api_host', 'https://localhost:44357')
    
    // Inicializa o objeto do Conector do Tableau
    var myConnector = tableau.makeConnector();

    // Define o esquema da tabelas que serão carregadas pela api
    myConnector.getSchema = function (schemaCallback) {

        $.getJSON(localStorage.getItem('api_host') + "/integracao/tableau/tabelas?tabela=" +  localStorage.getItem('api_schema') + "&ClientID=app_pbi_pedro&ClientSecret=123456", function (resp) {
            //Os dados da lista no objeto de retorno Result.Data
            var tabelas = resp.data;
            schemaCallback(tabelas);
        });
    };

    // Função que será executada ao clicar no botão de buscar os dados. 
    // Aqui será carregado as informações da url da API
    myConnector.getData = function (table, doneCallback) {

        opcoes.url = localStorage.getItem('api_host') + '/' + localStorage.getItem('api_caminho')

        //Tabela de saida
        var tableData = [];

        console.log('Inicia a carga de....' + opcoes.url)

        //CLIENTES 
        $.getJSON(opcoes.url + "?ClientID=app_pbi_pedro&ClientSecret=123456", function (resp) {

            //Os dados da lista no objeto de retorno Result.Data
            var dados = resp.data;
            console.log('Retorno da API - ' + resp.message)
            //Adiciona os dados recuperados para o tableau
            table.appendRows(dados);

            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {

        $("#btn-carregar-url").click(function () {


            localStorage.setItem('api_host', $('#txtUrl').val())
            localStorage.setItem('api_caminho', $('#txtCaminho').val())
            localStorage.setItem('api_schema', $('#txtTabela').val())

            tableau.connectionName = "Tecnun Api DataSource - Clientes"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
