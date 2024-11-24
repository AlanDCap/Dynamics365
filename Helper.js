//#region :: Carregar Contexto de Formul�rio ::
/**
 * O objetivo � armazenar em uma constante o contexto do formul�rio para facilitar sua utiliza��o 
 * em diferentes pontos da l�gica implementada. O executionContext � o contexto passado como primeiro 
 * par�metro para as fun��es configuradas nos eventos de formul�rios, seja onLoad, onSave, ou onChange.
 */
const _contextoDoFormulario = null;

/**Carrega o contexto do formul�rio em uma constante global*/
function carregarContextoDoFormulario() {
    _contextoDoFormulario = !_contextoDoFormulario ? executionContext.getFormContext() : _contextoDoFormulario;
}
//#endregion

//#region :: Carregar Permiss�es ::
/**
 * O objetivo � armazenar em uma propriedade do script as permiss�es do usu�rio,
 * facilitando o acesso quando necess�rio. A fun��o poderia ser chamada no carregamento 
 * do formul�rio, ou apenas nos momentos em que se faz necess�rio validar os perfis de acesso
 * de um usu�rio
 */

//Constante que armazena as permiss�es do usu�rio
const _perfisDoUsuario = [];

//chamada da fun��o
carregarPerfisDeSeguranca();

//faz a valida��o
if (_perfisDoUsuario.includes("Acesso basico")) {
    //executa a l�gica 
}

function carregarPerfisDeSeguranca() {
    Xrm.Utility.getGlobalContext().userSettings.roles
        ?.forEach(role => {
            _perfisDoUsuario.push(role.name);
        });
}
//#endregion

//#region :: Bloquear Controles do Formul�rio ::
/**
 * Bloqueia todos os controles do formul�rio
 */
function bloquearFormulario() {
    formContext.ui.controls.forEach(function (control, i) {
        if (control && control.getDisabled && !control.getDisabled()) {
            control.setDisabled(true);
        }
    });
}
//#endregion

//#region :: Bloquear ou Desbloquear uma lista de campos do formul�rio
/**
 * Lista de campos para bloquear ou desbloquear
 * @param {any} arrayCampos 
 * Par�metro que define se bloqueia ou desbloqueia
 * true => bloqueia || false => desbloqueia
 * @param {any} bool
 */
function bloqueiaDesbloqueiaCampos(arrayCampos = [], bool) {
    arrayCampos.forEach(campo => {
        if (_contextoDoFormulario.getControl(campo).getDisabled())
            _contextoDoFormulario.getControl(campo).setDisabled(bool);
    })
}
//#endregion

//#region :: Exibir ou Ocultar uma lista de campos do formul�rio
/**
 * Lista de campos para Exibir ou Ocultar
 * @param {any} arrayCampos
 * Par�metro que define se exibe ou oculta
 * true => exibe || false => oculta
 * @param {any} bool
 */
function exibeOcultaCampos(arrayCampos, bool) {
    arrayCampos.forEach(campo => {
        _contextoDoFormulario
            .getControl(campo)
            .setVisible(bool);
    })
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
//#endregion