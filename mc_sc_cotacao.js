function resolve(process, colleague) {
	log.info('$$$entrou no mecanismo solicitacao de compras')
	var userList = new java.util.ArrayList();
	var nivel = Number(hAPI.getCardValue("nivelAprov"));
	nivel = nivel ? "0" + nivel : '01';
	var matAprovador = ''
	var consFilial = hAPI.getCardValue("codFilial");
	var codCc = hAPI.getCardValue("codCc");
	var endpoint = "/rest_prd/AFCOMW09"

	var consNivel = DatasetFactory.createConstraint("nivel", nivel, nivel, ConstraintType.MUST);
	var consCc = DatasetFactory.createConstraint("centroCusto", codCc, codCc, ConstraintType.MUST);
	var consFilial = DatasetFactory.createConstraint("filial", consFilial, consFilial, ConstraintType.MUST);
	var consEndpoint = DatasetFactory.createConstraint("endpointAprov", endpoint, endpoint, ConstraintType.MUST);

	var dsAlcada = DatasetFactory.getDataset("ds_consulta_protheus_aprovadores", null, [consNivel, consCc, consFilial, consEndpoint], null);

	log.info('mc_sc_cotacao - dsAlcadas')
	log.dir(dsAlcada)

	for (var i = 0; i < dsAlcada.rowsCount; i++) {
		var nivelAprov = dsAlcada.getValue(i, 'AL_NIVEL')

		log.info('$$$$mc_sc_cotacao - nivel atual:' + nivel)
		log.info('$$$$mc_sc_cotacao - nivel aprovador:' + nivelAprov)


		if (nivelAprov == nivel) {
			log.info('$$$$mc_sc_cotacao - entrou  no if de nivelaprov igual a nivel')

			matAprovador = dsAlcada.getValue(i, 'RA_CIC')
			log.info('$$$$mc_sc_cotacao - aprovador:' + matAprovador)
			userList.add(matAprovador)
		}
	}
	return userList;
}