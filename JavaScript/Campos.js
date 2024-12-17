//#region :: Bloqueio e desbloqueio

/**
 * Fun��o que bloqueia campos
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
 * Fun��o que desbloqueia campos
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


//#region :: Exibir ou Ocultar uma lista de campos do formul�rio
/**
 * Fun��o que exibe campos no formul�rio
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
 * Fun��o que exibe campos no formul�rio
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