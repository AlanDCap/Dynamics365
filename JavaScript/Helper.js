//#region :: Carregar Contexto de Formulário ::
/**
 * O objetivo é armazenar em uma constante o contexto do formulário para facilitar sua utilização 
 * em diferentes pontos da lógica implementada. O executionContext é o contexto passado como primeiro 
 * parâmetro para as funções configuradas nos eventos de formulários, seja onLoad, onSave, ou onChange.
 */
const _contextoAccount = null;

/**Carrega o contexto do formulário em uma constante global*/
function carregarContextoDoFormulario(executionContext) {
    _contextoAccount = !_contextoAccount ? executionContext.getFormContext() : _contextoAccount;
}
//#endregion

//#region :: Bloquear Controles do Formulário ::
/**
 * Bloqueia todos os controles do formulário
 */
function bloquearFormulario(_contextoAccount) {

    if (!_contextoAccount) return;

    _contextoAccount.ui.controls.forEach(control => {
        if (control && control.getDisabled && !control.getDisabled()) {
            control.setDisabled(true);
        }
    });
}
//#endregion



//#region :: Requisições XHR (INCOMPLETO)::
/**
 * Esta região se destina à criação de requisições XMLHttp, muito útil quando precisa 
 * realizar chamadas síncronas. 
 */

/**
 * Retorna a url padrão do ambiente. Permite configurar a versão da WebApi que será utilizada
 * @returns URL para utilizar em requisições XHR
 */
function retornarWebApiPath() {
    const _versaoApi = "v9.2"
    return Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/" + _versaoApi + "/";
}

/**
 * Adiciona os headers à requisição XHR
 * @param req requisição XMLHttpRequest
 */
function adicionarHeadersOData(req) {
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Prefer", "odata.include-annotations=*");
}

//Exemplo

const metodo = "GET";
const url = retornarWebApiPath();
const tabela = "accounts";
const accountId = "038cfec1-5f66-4611-9e1f-9532f12362c5"

var req = new XMLHttpRequest();
req.open(metodo, url + "(" + accountId + ")", false)
adicionarHeadersOData(req);

//Função alternativa que trata a requisição como um todo. 
function requestXhr(path, method = "GET") {
    const req = new XMLHttpRequest();
    let response = null;
    const clientUrl = Xrm.Utility.getGlobalContext().getClientUrl();
    const endpointVersion = "/api/data/v9.2/";

    req.open(method, clientUrl + endpointVersion + path, false);

    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Prefer", "odata.include-annotations=*");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                response = JSON.parse(this.response);
            } else {
                console.log(this.responseText);
            }
        }
    };
    req.send();

    return response;
}
//#endregion