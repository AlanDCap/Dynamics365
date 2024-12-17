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
    //Xrm.Utility.getGlobalContext().userSettings.roles.getByFilter();
}
//#endregion