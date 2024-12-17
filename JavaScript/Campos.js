//#region :: Bloqueio e desbloqueio

/**
 * Função que bloqueia campos
 * @param {string} arrayCampos 
 */
function bloqueiaCampos(arrayCampos = []) {
    arrayCampos.forEach(campo => {

        let controleDoCampo = _contextoDoFormulario?.getControl(campo);
        if (!controleDoCampo) return;

        if (!controleDoCampo.getDisabled()) {
            controleDoCampo.setDisabled(true);
        }
    })
}

/**
 * Função que desbloqueia campos
 * @param {string} arrayCampos
 */
function desbloqueiaCampos(arrayCampos = []) {
    arrayCampos.forEach(campo => {

        let controleDoCampo = _contextoDoFormulario?.getControl(campo);
        if (!controleDoCampo) return;

        if (controleDoCampo.getDisabled()) {
            controleDoCampo.setDisabled(false);
        }
    })
}

//#endregion


//#region :: Exibir ou Ocultar uma lista de campos do formulário
/**
 * Função que exibe campos no formulário
 * @param {string} arrayCampos
 */
function exibeCampos(arrayCampos) {
    arrayCampos.forEach(campo => {

        let controleDoCampo = _contextoDoFormulario?.getControl(campo);
        if (!controleDoCampo) return;

        if (!controleDoCampo.getVisible()) {
            controleDoCampo.setVisible(true);
        }
    })
}

/**
 * Função que exibe campos no formulário
 * @param {any} arrayCampos
 */
function ocultaCampos(arrayCampos) {
    arrayCampos.forEach(campo => {

        let controleDoCampo = _contextoDoFormulario?.getControl(campo);
        if (!controleDoCampo) return;

        if (controleDoCampo.getVisible()) {
            controleDoCampo.setVisible(false);
        }
    })
}
//#endregion