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
    //Xrm.Utility.getGlobalContext().userSettings.roles.getByFilter();
}
//#endregion