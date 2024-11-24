//#region :: Carregar Contexto de Formulário ::
/**
 * O objetivo é armazenar em uma constante o contexto do formulário para facilitar sua utilização 
 * em diferentes pontos da lógica implementada. O executionContext é o contexto passado como primeiro 
 * parâmetro para as funções configuradas nos eventos de formulários, seja onLoad, onSave, ou onChange.
 */
const _contextoDoFormulario = null;

/**Carrega o contexto do formulário em uma constante global*/
function carregarContextoDoFormulario() {
    _contextoDoFormulario = !_contextoDoFormulario ? executionContext.getFormContext() : _contextoDoFormulario;
}
//#endregion

//#region :: Carregar Permissões ::
/**
 * O objetivo é armazenar em uma propriedade do script as permissões do usuário,
 * facilitando o acesso quando necessário. A função poderia ser chamada no carregamento 
 * do formulário, ou apenas nos momentos em que se faz necessário validar os perfis de acesso
 * de um usuário
 */

//Constante que armazena as permissões do usuário
const _perfisDoUsuario = [];

//chamada da função
carregarPerfisDeSeguranca();

//faz a validação
if (_perfisDoUsuario.includes("Acesso basico")) {
    //executa a lógica 
}

function carregarPerfisDeSeguranca() {
    Xrm.Utility.getGlobalContext().userSettings.roles
        ?.forEach(role => {
            _perfisDoUsuario.push(role.name);
        });
}
//#endregion

//#region :: Bloquear Controles do Formulário ::
/**
 * Bloqueia todos os controles do formulário
 */
function bloquearFormulario() {
    formContext.ui.controls.forEach(function (control, i) {
        if (control && control.getDisabled && !control.getDisabled()) {
            control.setDisabled(true);
        }
    });
}
//#endregion

//#region :: Bloquear ou Desbloquear uma lista de campos do formulário
/**
 * Lista de campos para bloquear ou desbloquear
 * @param {any} arrayCampos 
 * Parâmetro que define se bloqueia ou desbloqueia
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

//#region :: Exibir ou Ocultar uma lista de campos do formulário
/**
 * Lista de campos para Exibir ou Ocultar
 * @param {any} arrayCampos
 * Parâmetro que define se exibe ou oculta
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
//#endregion