//#region :: Carregar Contexto de Formul�rio ::
/**
 * O objetivo � armazenar em uma constante o contexto do formul�rio para facilitar sua utiliza��o 
 * em diferentes pontos da l�gica implementada. O executionContext � o contexto passado como primeiro 
 * par�metro para as fun��es configuradas nos eventos de formul�rios, seja onLoad, onSave, ou onChange.
 */
const _contextoAccount = null;

/**Carrega o contexto do formul�rio em uma constante global*/
function carregarContextoDoFormulario(executionContext) {
    _contextoAccount = !_contextoAccount ? executionContext.getFormContext() : _contextoAccount;
}
//#endregion

//#region :: Bloquear Controles do Formul�rio ::
/**
 * Bloqueia todos os controles do formul�rio
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



//#region :: Requisi��es XHR (INCOMPLETO)::
/**
 * Esta regi�o se destina � cria��o de requisi��es XMLHttp, muito �til quando precisa 
 * realizar chamadas s�ncronas. 
 */

/**
 * Retorna a url padr�o do ambiente. Permite configurar a vers�o da WebApi que ser� utilizada
 * @returns URL para utilizar em requisi��es XHR
 */
function retornarWebApiPath() {
    const _versaoApi = "v9.2"
    return Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/" + _versaoApi + "/";
}

/**
 * Adiciona os headers � requisi��o XHR
 * @param req requisi��o XMLHttpRequest
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

//Fun��o alternativa que trata a requisi��o como um todo. 
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